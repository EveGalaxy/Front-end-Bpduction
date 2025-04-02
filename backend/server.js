require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use(express.json());

// เชื่อมต่อ MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("❌ Database Connection Failed!", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// GET: ดึงข้อมูลสินค้า
app.get("/products", (req, res) => {
    db.query("SELECT * FROM Product", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// POST: เพิ่มสินค้าใหม่
app.post('/products', (req, res) => {
    const { Name, Category, Description, BeaconId } = req.body;
  
    if (!Name || !Category || !BeaconId) {
      return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
    }
  
    const insertProduct = 'INSERT INTO Product (Name, Category, Description) VALUES (?, ?, ?)';
    db.query(insertProduct, [Name, Category, Description], (err, result) => {
      if (err) return res.status(500).json({ error: 'บันทึกสินค้าไม่สำเร็จ' });
  
      const productId = result.insertId;
  
      const insertRelation = 'INSERT INTO product_beacon (productId, beaconId) VALUES (?, ?)';
      db.query(insertRelation, [productId, BeaconId], (err2, result2) => {
        if (err2) return res.status(500).json({ error: 'บันทึกข้อมูล beacon ไม่สำเร็จ' });
  
        res.json({ success: true, productId, beaconRelationId: result2.insertId });
      });
    });
});

// PUT: แก้ไขสินค้า
app.put("/products/:id", (req, res) => {
    const { name, category, description } = req.body;
    const productID = req.params.id;
    db.query(
        "UPDATE Product SET Name = ?, Category = ?, Description = ? WHERE ProductID = ?",
        [name, category, description, productID],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({ message: "✅ อัปเดตสินค้าสำเร็จ" });
            }
        }
    );
});

// DELETE: ลบสินค้า
app.delete("/products/:id", (req, res) => {
    const productID = req.params.id;
    db.query("DELETE FROM Product WHERE ProductID = ?", [productID], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: "✅ ลบสินค้าสำเร็จ" });
        }
    });
});


// API สำหรับเพิ่มข้อมูล PositionRecord
app.post("/position", (req, res) => {
    const {Slot, Collect, RSSI_1, RSSI_2, RSSI_3, RSSI_4 } = req.body;

    if (!Slot || !Collect) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = "INSERT INTO PositionRecord (Slot, Collect, RSSI_1, RSSI_2, RSSI_3, RSSI_4, RecordedAt) VALUES (?, ?, ?, ?, ?, ?, NOW())";
    const values = [Slot, Collect, RSSI_1, RSSI_2, RSSI_3, RSSI_4];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Record added successfully", RecordID: result.insertId });
    });
});

// API สำหรับบันทึก beacons
app.post("/api/beacons", (req, res) => {
    const { name, address, major, minor } = req.body;

    if (!name || !address) {
        return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน" });
    }

    const sql = `
        INSERT INTO beacon (name, address, major, minor) 
        VALUES (?, ?, ?, ?)
    `;
    const values = [name, address, major, minor];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ Error inserting data:", err);
            return res.status(500).json({ error: "เกิดข้อผิดพลาด", details: err });
        }
        console.log("✅ บันทึก Beacon สำเร็จ:", result);
        res.json({ success: true, message: "บันทึกข้อมูลสำเร็จ" });
    });
});

// update-rssi-product-beacon
app.post('/update-rssi-one', (req, res) => {
    const { productId, beaconId, rssi, laptopIndex } = req.body;
  
    // ป้องกัน index ผิดพลาด
    if (![1, 2, 3, 4].includes(laptopIndex)) {
      return res.status(400).json({ error: 'laptopIndex ต้องเป็น 1-4 เท่านั้น' })
    }
  
    // สร้างชื่อ field แบบ dynamic เช่น rssi_1
    const field = `rssi_${laptopIndex}`
    const sql = `UPDATE product_beacon SET ${field} = ? WHERE productId = ? AND beaconId = ?`
  
    db.query(sql, [rssi, productId, beaconId], (err, result) => {
      if (err) {
        console.error('❌ UPDATE ERROR:', err)
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดต RSSI' })
      }
      res.json({ success: true, affectedRows: result.affectedRows })
    })
});

function calcEuclidean(a, b) {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
      sum += Math.pow((a[i] - b[i]), 2)
    }
    return Math.sqrt(sum)
  }
  
  app.get('/predict-slot/:productId', (req, res) => {
    const productId = req.params.productId
  
    const getRSSI = `SELECT * FROM product_beacon WHERE productId = ?`
    db.query(getRSSI, [productId], (err, rows) => {
      if (err || rows.length === 0) return res.status(404).json({ error: 'ไม่พบสินค้า' })
  
      const beacon = rows[0]
      const currentRSSI = [beacon.rssi_1, beacon.rssi_2, beacon.rssi_3, beacon.rssi_4]
  
      if (currentRSSI.some(val => val === null)) {
        return res.status(400).json({ error: 'ค่า RSSI ของสินค้ายังไม่ครบ' })
      }
  
      const query = `
        SELECT slot, 
          AVG(rssi_1) as avg_rssi_1,
          AVG(rssi_2) as avg_rssi_2,
          AVG(rssi_3) as avg_rssi_3,
          AVG(rssi_4) as avg_rssi_4
        FROM positionrecord
        GROUP BY slot
      `
  
      db.query(query, (err2, results) => {
        if (err2) return res.status(500).json({ error: 'ดึงตำแหน่งล้มเหลว' })
  
        let closestSlot = null
        let minDistance = Infinity
  
        results.forEach(slotRow => {
          const slotRSSI = [
            slotRow.avg_rssi_1,
            slotRow.avg_rssi_2,
            slotRow.avg_rssi_3,
            slotRow.avg_rssi_4
          ]
  
          if (slotRSSI.some(val => val === null)) return
  
          const distance = calcEuclidean(currentRSSI, slotRSSI)
          if (distance < minDistance) {
            minDistance = distance
            closestSlot = slotRow.slot
          }
        })
  
        if (closestSlot === null) {
          return res.json({
            predictedSlot: null,
            distance: null,
            error: "ไม่สามารถเปรียบเทียบได้ (ไม่มี slot ที่ใช้ได้)"
          })
        }
  
        res.json({
          predictedSlot: closestSlot,
          distance: minDistance
        })
      })
    })
  });
  
  app.get('/product-list-full', (req, res) => {
    const sql = `
      SELECT 
        p.ProductID,
        p.Name,
        p.Category,
        p.Description,
        b.BeaconName,
        sl.LocationCode
      FROM Product p
      LEFT JOIN product_beacon pb ON p.ProductID = pb.productId
      LEFT JOIN beacon b ON pb.beaconId = b.beaconId
      LEFT JOIN product_location pl ON p.ProductID = pl.ProductID
      LEFT JOIN SlotLocation sl ON pl.Slot = sl.Slot;
    `
    db.query(sql, (err, results) => {
      if (err) {
        console.error('❌ SQL ERROR:', err)
        return res.status(500).json({ error: err.sqlMessage || 'ดึงข้อมูลไม่สำเร็จ' })
      }
      res.json(results)
    })
  })
  
  

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

