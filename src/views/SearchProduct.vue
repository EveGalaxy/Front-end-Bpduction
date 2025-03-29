<template>
    <div class="SearchProduct">
        <h2 class="titleSearch">Search Product</h2>
        <div class="main-search-input">
        <div class="main-search-input-item">
          <input type="text" placeholder="What are you looking for?" value="" fdprocessedid="ea6hnv">
        </div>
        <div class="main-search-input-item location">
          <div id="autocomplete-container">
            <input id="autocomplete-input" type="text" placeholder="Location" fdprocessedid="xffmj">
          </div>
          <a href="#">
            <i class="fa fa-map-marker">
            </i>
          </a>
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
.main-search-input{
    display: inline-flex;
    background-color: coral;
    max-height: inherit;
    border-radius: 50px;
    margin-left: 100px;
    margin-top: 35px;
    margin-bottom: 35px;
    padding-top: 10px;
}
.main-search-input-item{
    margin-top: 3px;
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    -webkit-box-flex: 1;
}
@media (max-width: 992px) {
    .main-search-input .main-search-input-item {
        border-radius: 5px;
        margin-bottom: 1rem;
    }
}
@media (max-width: 992px) {
    .main-search-input>* {
        display: inline-block;
        width: 100%;
        border: 0;
        background: hsla(0, 0%, 100%, .1);
    }
}
.main-search-btn {
    margin-right: .5rem;
}
.SearchProduct{
    display: inline-flex;
    margin-left: -200px;
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
