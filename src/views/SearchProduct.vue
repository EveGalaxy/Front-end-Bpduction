<template>
    <div class="SearchProduct">
        <h2 class="titleSearch">Search Product</h2>
        <div class="main-search-input">
          <div class="main-search-input-item">
            <input type="text" placeholder="What are you looking for?" value="" fdprocessedid="ea6hnv" style="padding-right: 0px;">
          </div>
          <div class="main-search-input-item-location">
            <div id="autocomplete-container">
              <input id="autocomplete-input" type="text" placeholder="Beacon Type" fdprocessedid="xffmj">
            </div>
          </div>
          <div class="main-search-input-item">
            <select data-placeholder="All Categories" class="chosen-select custom-select" fdprocessedid="d8kc">
              <option>All Categories</option>
              <option>อาหาร</option>
              <option>อุปกรณ์อิเล็กทรอนิกส์</option>
              <option>ของใช้ทั่วไป</option>
            </select>
          </div>
          <a href="#" class="btn main-search-btn btn-radius btn-lg btn-white">
            <span class="btn-inner--text no-underline">Search</span>
          </a>
          </div>
        </div><br>
    <img :src="imageUrl" alt="product in shelves" class="shelves"><br>
    <div class="btnunder">
        <button class="productlist" @click="gotoProductList()">แสดงรายการสินค้า</button> 
        <button class="logout" @click="logoutSystem()">Log Out</button> 
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
  gap: 10px;
}
.main-search-input-item{
  flex: 1; /* ทำให้ขยายเต็มที่ */
  margin-top: 3px;
  position: relative;
  padding: 5px 8px;
  padding-left: 30px;
  padding-right: 30px;
  -webkit-box-flex: 1;
}

.main-search-input-item input,
.main-search-input-item-location input,
.main-search-input-item select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 8px;
    border: 2px solid #ccc;
    outline: none;
    background-color: white;
}

.main-search-input-item input::placeholder,
.main-search-input-item select {
    color: #555;
}

.main-search-input-item-location{
  margin-top: 3px;
  margin-right: -100px;
  flex: 1;
  padding: 5px 10px;
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
  margin-left: 100px;
}
.main-search-btn:hover {
    background-color: #c70039;
    transform: translateY(-2px);
}
.main-search-btn .btn-inner--text {
    text-decoration: none;
}

@media (max-width: 768px) {
    .main-search-input {
        flex-direction: column; /* เปลี่ยนเป็นแนวตั้งเมื่อจอเล็ก */
        align-items: stretch;
        width: 90%;
        margin-right: auto;
        border-radius: 20px;
    }

    .main-search-input-item,
    .main-search-input-item-location {
        width: 100%;
        padding: 5px 0;
    }

    .main-search-btn {
        width: 100%;
        text-align: center;
    }
}

.SearchProduct{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 50px;
    margin-top: 50px;
    padding: 2px;
    position: flex;
}
.shelves{
  width: 1300px;
  height: 400px;
  margin-top: 0px;
  margin-left: 0px;
  border-radius: 10%;
  border: 4px solid black;
}
.titleSearch{
    color: navy;
    font-size: 2rem;
}
.btn-lg {
    font-size: .875rem;
    line-height: 1.5;
    padding: .875rem 1rem;
}
.btn-radius {
    border-radius: 25px;
    padding-left: 2rem;
    padding-right: 2rem;
}
.btn {
    position: relative;
    text-transform: uppercase;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
    will-change: transform;
    letter-spacing: .025em;
    font-size: .875rem;
}
.btn:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
}

.btn-white, .btn-white:hover {
    color: #212529;
    background-color: #fff;
    border-color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
}
button.productlist {
    background-color: #4bf9ff;
    border: 2px solid  #000000;
    color: rgb(0, 0, 0);
    padding: 0.75em 1.5em;
    margin: 0 .5em;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 50px;
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 50px;
}
button.logout {
    background-color: #ff4848;
    border: 2px solid  #000000;
    color: rgb(0, 0, 0);
    padding: 0.75em 1.5em;
    margin: 0 .5em;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 50px;
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 50px;
}
</style>

<script>
export default {
  data() {
    return {
        imageUrl: require('@/assets/shelves1.jpg'),
    }
  },
  methods: {
    gotoProductList(){
      this.$router.replace('/product-list');
    },
    logoutSystem() {
      this.$router.replace('/login');
    },
  }
}
</script>
