<template>
  <div class="Main">
    <div class="Register">
      <img :src="imageUrl" alt="Description" class="Brand"/>
      <h2 class="ordertitle">ลงทะเบียนสินค้า</h2>
      <div class="nameprod">
        <label style="margin-left: -1060px;">ชื่อสินค้า</label><br>
        <input type="text" id="productname" v-model="name" v-bind:style="{ fontSize: '20px', paddingRight: '250px' }">
        <br><br>
        <textarea style="margin-left: -910px;" v-model="description" placeholder="รายละเอียดสินค้า" required></textarea>
      </div>
      
      <div class="typeprod">
        <label style="margin-left: -1850px;">หมวดหมู่ของสินค้า</label>
        <select v-model="category" style="margin-left: 150px;">
          <option disabled selected>--ประเภทของสินค้า--</option>
          <option value="อาหาร">อาหาร</option>
          <option value="อุปกรณ์อิเล็กทรอนิกส์">อุปกรณ์อิเล็กทรอนิกส์</option>
          <option value="ของใช้ทั่วไป">ของใช้ทั่วไป</option>
        </select>
      </div><br><br>

      <div class="beaconlaunch">
        <label style="margin-left: -1890px;">Beacon ที่ต้องการติดตั้ง</label>
        <select v-model="beaconId" style="margin-left: 110px;">
          <option disabled selected>--ประเภทของบีคอน--</option>
          <option value=1>IBKS 105 No 1</option>
          <option value=2>IBKS 105 No 2</option>
          <option value=3>IBKS 105 No 3</option>
          <option value=4>IBKS 105 No 4</option>
          <option value=5>IBKS 105 No 5</option>
          <option value=6>IBKS 105 No 6</option>
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
  margin-top: auto;
  margin-left: -850px;
  position: fixed;
}

.nameprod{
  margin-left: 100px;
}

.ordertitle{
  margin-left: -600px;
  margin-top: -200px;
}

.typeprod{
  margin-left: -100px;
}

#productname{
  margin-left: -710px;
}

textarea {
  width: 300px;
  height: 150px;
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
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ตัวแปร reactive
const imageUrl = ref(require('@/assets/duck-logo.webp'))
const name = ref('')
const category = ref('--ประเภทของสินค้า--')  // ค่าเริ่มต้น (default)
const description = ref('')
const beaconId = ref('--ประเภทของบีคอน--')

// ใช้ Vue Router
const router = useRouter()

// ฟังก์ชัน
const gotoBeaconView = () => {
  router.replace('/')
}

const logoutSystem = () => {
  router.replace('/login')
}

const saveProdDetail = async () => {
  if (!name.value || category.value === '--ประเภทของสินค้า--' || beaconId.value === '--ประเภทของบีคอน--') {
    alert('กรุณากรอกข้อมูลให้ครบ')
    return
  }

  const response = await fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Name: name.value,
      Category: category.value,
      Description: description.value,
      BeaconId: beaconId.value,
    })
  })
  
  if (response.ok) {
    alert('บันทึกสินค้าเรียบร้อย')
    // เคลียร์ข้อมูล
    name.value = ''
    category.value = '--ประเภทของสินค้า--'
    description.value = ''
    beaconId.value = '--ประเภทของบีคอน--'
    router.replace('/product-list')
  } else {
    alert('เกิดข้อผิดพลาดในการบันทึก')
  }
}

</script>

