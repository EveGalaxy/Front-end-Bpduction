<template>
  <div class="Main">
    <img :src="imageUrl" alt="Description" class="Brand"/>
    <div class="Register">
      <h2 class="ordertitle">ลงทะเบียนสินค้า</h2>
      <label style="margin-left: -1250px;">ชื่อสินค้า</label><br>
      <input type="text" id="productname" v-bind:style="{ fontSize: '20px', paddingRight: '450px' }"><br><br>

      <label style="margin-left: -1205px;">Beacon Name</label><br>
      <input type="text" id="bname" v-bind:style="{ fontSize: '20px', paddingRight: '450px' }"><br><br><br>

      <label style="margin-left: -600px;">ประเภทของสินค้า</label>
      <input type="radio" id="option1" value="option1" v-model="selectedOption">
      <label for="option1" style="margin-left: 10px;">แตกง่าย</label>
      <input type="radio" id="option2" value="option2" v-model="selectedOption">
      <label for="option2" style="margin-left: 10px;">ไม่แตกง่าย</label><br><br><br>

      <label style="margin-left: -600px; margin-right: 250px;">น้ำหนักของสินค้า</label>
      <input type="text" id="weight" v-bind:style="{ fontSize: '16px', width: '30px' }">
      <label style="margin-left: 20px;">KG</label><br><br><br>

      <label style="margin-left: -800px; margin-right: 250px;">เพิ่มรูปภาพ</label>
      <img :src="importImage" alt="Selected Image" class="Imgprod" @click="triggerFileInput"/>
      <input type="file" ref="fileInput" @change="onImageSelected" style="display: none" accept="image/*" /><br><br>

      <button class="saveProd" @click="saveProdDetail()">SAVE</button> 
    </div>
  </div>
  <div class="btnmain">
    <button class="beacon" @click="gotoBeaconView()">บันทึกค่า Beacon ที่นี่!!!</button> 
    <button class="logout" @click="logoutSystem()">Log Out</button>
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
  padding-left: 700px;
  padding-bottom: 150px;
  color: black;
  position: fixed;
  margin-top: -200px;
  margin-bottom: 10px;
  margin-left: 600px;
  margin-right: 40px;
  height: 400px;
  width: 150px;
}

.Brand{
  width: 150px;
  height: 150px;
  margin-right: 900px;
  border-radius: 50%;
  border: 4px solid black;
}

.btnmain{
  width: 200px;
  display: flex;
  justify-content: left;
  padding: 0 1rem 1.5rem 1rem;
  flex-direction: column;
  margin-left: 190px;
}

.Imgprod{
  width: 50px;
  height: 50px;
  margin-left: -150px;
  border: 1px solid black;
}

.ordertitle{
  margin-left: -660px;
}

#bname{
  margin-left: -700px;
}

#productname{
  margin-left: -700px;
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
}
button.logout {
    background-color: #ff4848;
    border: 2px solid  #000000;
    color: rgb(0, 0, 0);
    padding: 0.75em 1.5em;
    margin: 0 .5em;
    cursor: pointer;
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
    margin-left: -300px;
    margin-top: 20px;
}

</style>
<script>
export default {
  data() {
    return {
      imageUrl: require('@/assets/duck-logo.webp'),
      selectedOption: null,
      importImage: require('@/assets/import image.png')
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
    }
  }
}
</script>