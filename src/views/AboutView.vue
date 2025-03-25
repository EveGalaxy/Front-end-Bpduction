<template>
  <div class="Main">
    <div class="Register">
      <img :src="imageUrl" alt="Description" class="Brand"/>
      <h2 class="ordertitle">ลงทะเบียนสินค้า</h2>
      <div class="nameprod">
        <label style="margin-left: -1060px;">ชื่อสินค้า</label><br>
        <input type="text" id="productname" v-bind:style="{ fontSize: '20px', paddingRight: '250px' }"><br><br>
      </div>

      <div class="prodid">
        <label style="margin-left: -1045px;">รหัสสินค้า</label><br>
        <input type="text" id="bname" v-bind:style="{ fontSize: '20px', paddingRight: '250px' }"><br><br><br>
      </div>

      <div class="typeprod">
        <label style="margin-left: -1850px;">หมวดหมู่ของสินค้า</label>
        <select style="margin-left: 150px;">
          <option>--ประเภทของสินค้า--</option>
          <option>อาหาร</option>
          <option>อุปกรณ์อิเล็กทรอนิกส์</option>
          <option>ของใช้ทั่วไป</option>
        </select>
      </div><br><br>

      <div class="beaconlaunch">
        <label style="margin-left: -1890px;">Beacon ที่ต้องการติดตั้ง</label>
        <select style="margin-left: 110px;">
          <option>--ประเภทของบีคอน--</option>
          <option>IBKS 105 No 1</option>
          <option>IBKS 105 No 2</option>
          <option>IBKS 105 No 3</option>
          <option>IBKS 105 No 4</option>
          <option>IBKS 105 No 5</option>
          <option>IBKS 105 No 6</option>
        </select>
      </div><br><br>

      <div class="locationprod">
        <label style="margin-left: -750px;">ตำแหน่งจัดเก็บ</label>
        <input type="text" id="productlocation" v-bind:style="{ fontSize: '20px', width: '100px' }"><br><br>
      </div>

      <div class="prodpieces">
        <label style="margin-left: -800px;">จำนวน</label>
        <button @click="decrease">-</button>
        <span> {{ quantity }} </span>
        <button @click="increase">+</button><br><br>
      </div>

      <div class="pictureprod">
        <label style="margin-left: -800px; margin-right: 250px;">เพิ่มรูปภาพ</label>
        <img :src="importImage" alt="Selected Image" class="Imgprod" @click="triggerFileInput"/>
        <input type="file" ref="fileInput" @change="onImageSelected" style="display: none" accept="image/*" /><br><br>
      </div>

      <input type="checkbox" id="productcheck">
      <div class="notificationprod">
        <label style="margin-left: -750px;">แจ้งเตือนเมื่อสินค้าถูกย้าย</label><br><br>
      </div>

      <div class="roleuser">
        <label style="margin-left: -650px;">สิทธิการเข้าถึง</label>
        <select style="margin-left: 50px;">
          <option>--กำหนดสิทธิ--</option>
          <option>All</option>
          <option>Admin</option>
        </select>
      </div><br><br>

      <div class="btnmain">
        <button class="beacon" @click="gotoBeaconView()">บันทึกค่า Beacon ที่นี่!!!</button> 
        <button class="saveProd" @click="saveProdDetail()">SAVE</button>
        <button class="logout" @click="logoutSystem()">Log Out</button> 
      </div>
    </div>
  </div>
</template>
<style>
.Main{
  margin-top: 170px;
  margin-bottom: 70px;
}

.Register{
  background-color: #ffe7aa;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid black;
  border-radius: 30px;
  display: flexbox;
  padding-left: 1250px;
  padding-bottom: 180px;
  color: black;
  position: fixed;
  margin-top: -50px;
  margin-bottom: 10px;
  margin-left: 60px;
  margin-right: 40px;
  height: 400px;
  width: 150px;
}

.Brand{
  width: 150px;
  height: 150px;
  margin-top: 50px;
  margin-left: -2000px;
  border-radius: 50%;
  border: 4px solid black;
}

.beaconlaunch{
  margin-left: -65px;
}

.btnmain{
  width: 800px;
  display: flex;
  justify-content: left;
  padding: 0 1rem 1.5rem 1rem;
  flex-direction: row;
  margin-top: 180px;
  margin-left: -850px;
  position: fixed;
}

.Imgprod{
  width: 50px;
  height: 50px;
  margin-left: -150px;
  border: 1px solid black;
}

.locationprod{
  margin-left: -1210px;
}

.nameprod{
  margin-left: 100px;
}

.notificationprod{
  margin-top: -22px;
  margin-left: 200px;
  margin-bottom: -60px;
}

.ordertitle{
  margin-left: -600px;
  margin-top: -200px;
}

.roleuser{
  margin-top: 100px;
  margin-bottom: -160px;
}

.pictureprod{
  margin-top: -170px;
  margin-left: 180px;
}

.prodid{
  margin-left: 90px;
}

.prodpieces{
  margin-top: 30px;
  margin-left: -1200px;
  margin-bottom: -240px;
}

.typeprod{
  margin-left: -100px;
}

#bname{
  margin-left: -700px;
}

#productcheck{
  margin-top: 30px;
  margin-left: -800px;
}

#productname{
  margin-left: -710px;
}

#productlocation{
  margin-left: 150px;
}

body{
  background-color: #f8ff7c;
}

button.beacon {
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
button.saveProd{
    background-color: #4bff5d;
    border: 2px solid  #000000;
    color: rgb(0, 0, 0);
    padding: 0.75em 1.5em;
    margin: 0 .5em;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 50px;
    margin-right: 50px;
}

</style>
<script>
export default {
  data() {
    return {
      imageUrl: require('@/assets/duck-logo.webp'),
      selectedOption: null,
      importImage: require('@/assets/import image.png'),
      quantity: 1
    }
  },
  methods: {
    gotoBeaconView(){
      this.$router.replace('/');
    },
    logoutSystem() {
      this.$router.replace('/login');
    },
    saveProdDetail(){
      this.$router.replace('/');
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onImageSelected(event) {
      const file = event.target.files[0]; // รับไฟล์ที่ถูกเลือก
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result; // ตั้งค่า URL ของภาพที่เลือก
        };
        reader.readAsDataURL(file); // อ่านไฟล์เป็น Base64
      }
    },
    increase() {
      this.quantity++;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }
}
</script>
