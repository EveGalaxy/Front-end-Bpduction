<template>
  <div class="home">
    <div class="Beacon">
      <h2>{{ title }}</h2>
      <div class="items">
        <ul>
          <label>จำนวนของอุปกรณ์ Beacon ที่ใช้ในการบันทึกค่า</label>
          <select>
            <option>--จำนวนของอุปกรณ์--</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </ul>
        <ul>
          <label for="beaconname">Beacon Name #1</label>
          <input type="text" id="beaconname" v-bind:style="{ fontSize: '20px', paddingRight: '150px' }">
        </ul>
        <p style="margin-left: 140px;">
          <label for="position" style="margin-right: 230px;">ตำแหน่งของพิกัด</label>
          X
          <input type="text" id="position" v-bind:style="{ fontSize: '16px', width: '30px' }">
           Y
          <input type="text" id="position" v-bind:style="{ fontSize: '16px', width: '30px' }">
           Z
          <input type="text" id="position" v-bind:style="{ fontSize: '16px', width: '30px' }">
        </p><br><br>
      </div>
      <div class="btn">
        <button class="save" @click="saveDetail()">SAVE</button> 
        <button class="cancel" @click="cancelDetail()">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'BeaconView',
  components: {
    HelloWorld
  },
  data(){
    return {
      title: 'อุปกรณ์ Beacon',
    }
  },
  methods: {
    saveDetail(){
      this.$router.replace('/main');
    },
    cancelDetail() {
      this.$router.replace('/main');
    }
  }
}

</script>

<style>
body{
  background-color: #f8ff7c;
}
.home{
  background-color: #ffe7aa;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid black;
  border-radius: 30px;
  padding-left: 500px;
  padding-bottom: 50px;
  position: fixed;
  margin-top: 110px;
  margin-bottom: 15px;
  margin-left: 40px;
  margin-right: 40px;
  width: 950px;
}
</style>