<template>
  <div class="SearchProduct">
      <h2 class="titleSearch">Search Product</h2>
      <div class="main-search-input">
        <div class="main-search-input-item input-item-text">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ต้องการค้นหาสินค้าอะไร" 
          />
        </div>
        <div class="main-search-input-item input-item-select">
          <select v-model="selectedBeacon" class="custom-select">
            <option value="">Beacon Type</option>
            <option value="IBKS 105 No 1">IBKS 105 No 1</option>
            <option value="IBKS 105 No 2">IBKS 105 No 2</option>
            <option value="IBKS 105 No 3">IBKS 105 No 3</option>
            <option value="IBKS 105 No 4">IBKS 105 No 4</option>
            <option value="IBKS 105 No 5">IBKS 105 No 5</option>
            <option value="IBKS 105 No 6">IBKS 105 No 6</option>
          </select>
        </div>
        <div class="main-search-input-item input-item-select">
          <select v-model="selectedCategory" class="chosen-select custom-select">
            <option value="">All Categories</option>
            <option value="อาหาร">อาหาร</option>
            <option value="อุปกรณ์อิเล็กทรอนิกส์">อุปกรณ์อิเล็กทรอนิกส์</option>
            <option value="ของใช้ทั่วไป">ของใช้ทั่วไป</option>
          </select>
        </div>
        <a href="#" class="btn main-search-btn" @click="filterProducts">Search</a>
      </div>
      
      <div class="shelf-container">
        <div v-for="(row, rowIndex) in shelfRows" :key="rowIndex" class="shelf-row">
          <div class="card-container">
            <div v-for="(shelf, index) in row" :key="index" class="card" @click="clickCard(shelf)">
              <h3 class="card-title">{{ shelf.title }}</h3>
              <p>{{ shelf.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="btnunder">
        <button class="productlist main-search-btn" @click="gotoProductList">แสดงรายการสินค้า</button> 
        <button class="logout main-search-btn" @click="logoutSystem">Log Out</button> 
      </div>
  </div>
</template>

<style>
.main-search-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: coral;
  border-radius: 40px;
  padding: 8px 15px; /* ลด padding เพื่อให้เล็กลง */
  width: 70%; /* ลดขนาดให้เล็กลง */
  max-width: 800px; /* ลดขนาดสูงสุด */
  margin: 35px auto;
  margin-left: auto; /* ขยับไปทางขวามือ */
  margin-right: 180px; /* เพิ่มระยะห่างจากด้านขวา */
  margin-top: -90px;
  gap: 1px;
}

.main-search-input-item {
  flex: 1; /* ทำให้ขยายเต็มที่ */
  margin-top: 3px;
  position: relative;
  padding: 5px 8px;
  padding-left: 30px;
  padding-right: 30px;
}

.input-item-text input {
  width: 100%;
  padding: 10px;
  padding-right: 140px;
  font-size: 14px;
  border-radius: 8px;
  border: 2px solid #ccc;
  outline: none;
  background-color: white;
  color: #555;
  /* เพิ่มขนาดขยายไปทางขวา */
  flex-grow: 2;
}

.input-item-select select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 2px solid #ccc;
  outline: none;
  background-color: white;
  color: #555;
  /* ขยายขนาด select เล็กน้อย */
  flex-grow: 2;
}

.main-search-input-item input::placeholder,
.main-search-input-item select {
  color: #555;
}

.main-search-btn {
  background-color: #ff5733;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-left: 40px;
}

.main-search-btn:hover {
  background-color: #c70039;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .main-search-input {
    flex-direction: column; /* เปลี่ยนเป็นแนวตั้งเมื่อจอเล็ก */
    align-items: stretch;
    width: 90%;
    margin-right: auto;
    border-radius: 20px;
  }

  .main-search-input-item {
    width: 100%;
    padding: 5px 0;
  }

  .main-search-btn {
    width: 100%;
    text-align: center;
  }
}

.chosen-select{
  margin-left: 50px;
}

.SearchProduct {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 50px;
  margin-top: 50px;
  padding: 2px;
  position: flex;
}

.shelf-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background: #8B5A2B; /* สีน้ำตาลเข้มของไม้แข็ง */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shelf-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0;
  background: gray;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  gap: 20px;
  margin-bottom: 20px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
  width: 150px;
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 0px;
}

.titleSearch {
  color: navy;
  font-size: 2rem;
}

.btnunder {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: 500px;
  gap: 20px;
}

button.productlist {
  background-color: #4bf9ff;
  border: 2px solid #000000;
  border-radius: 25px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  margin: 0 .5em;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
}

button.logout {
  background-color: #ff4848;
  border: 2px solid #000000;
  border-radius: 25px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  margin: 0 .5em;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
}
</style>

<script>
export default {
  data() {
    return {
      searchQuery: '',  // Store the search query
      selectedBeacon: '', // Store selected Beacon type
      selectedCategory: '', // Store selected category
      shelves: [
        { title: 'Shelf 1', description: 'Electronics', category: 'อุปกรณ์อิเล็กทรอนิกส์', beacon: 'IBKS 105 No 1' },
        { title: 'Shelf 2', description: 'Groceries', category: 'อาหาร', beacon: 'IBKS 105 No 2' },
        { title: 'Shelf 3', description: 'Household Items', category: 'ของใช้ทั่วไป', beacon: 'IBKS 105 No 3' },
        { title: 'Shelf 4', description: 'Clothing', category: 'ของใช้ทั่วไป', beacon: 'IBKS 105 No 4' },
        { title: 'Shelf 5', description: 'Accessories', category: 'ของใช้ทั่วไป', beacon: 'IBKS 105 No 5' },
        { title: 'Shelf 6', description: 'Sports', category: 'อุปกรณ์อิเล็กทรอนิกส์', beacon: 'IBKS 105 No 6' },
      ]
    };
  },
  computed: {
    // Filter shelves based on the searchQuery, selectedBeacon, and selectedCategory
    filteredShelves() {
      return this.shelves.filter(shelf => {
        const matchesSearch = shelf.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                              shelf.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesBeacon = this.selectedBeacon ? shelf.beacon === this.selectedBeacon : true;
        const matchesCategory = this.selectedCategory ? shelf.category === this.selectedCategory : true;
        return matchesSearch && matchesBeacon && matchesCategory;
      });
    },
    // Split the filtered shelves into rows for display
    shelfRows() {
      return [
        this.filteredShelves.slice(0, 3),
        this.filteredShelves.slice(3, 6)
      ];
    }
  },
  methods: {
    gotoProductList() {
      this.$router.replace('/product-list');
    },
    logoutSystem() {
      this.$router.replace('/login');
    },
    clickCard(shelf) {
      alert(`คุณเลือก ${shelf.title}: ${shelf.description}`);
    },
    filterProducts() {
      // This method can be used to manually trigger the filtering (if you want)
      // The filters are already automatically applied in the computed property
    }
  }
}
</script>
