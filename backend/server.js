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
app.post("/products", (req, res) => {
    const { name, category, description } = req.body;
    db.query(
        "INSERT INTO Product (Name, Category, Description, CreatedAt) VALUES (?, ?, ?, NOW())",
        [name, category, description],
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({ message: "✅ สินค้าถูกเพิ่มเรียบร้อย", productID: result.insertId });
            }
        }
    );
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




app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

