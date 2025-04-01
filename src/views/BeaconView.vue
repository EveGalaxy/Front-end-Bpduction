<template>
  <div class="home">
    <div class="Beacon">
      <h2>{{ title }}</h2>
      <div class="items">
        <form @submit.prevent="submitForm">
          <ul style="margin-left: 140px;">
            <label for="beacon" style="margin-right: 60px;">Beacon Name :</label>
            <select v-model="form.beaconName" id="beacon" required @change="handleChangeBeacon">
              <option value="" disabled selected>เลือก Beacon</option>
              <option v-for="beacon in beacons" :key="beacon.address" :value="beacon.name">
                {{ beacon.name }}
              </option>
            </select>
          </ul>
          <ul style="margin-left: 140px;">
            <label for="address" style="margin-right: 60px;">Address :</label>
            <input type="text" id="beacon-address" v-model="form.address" readonly>
          </ul>
          <ul style="margin-left: 140px;">
            <label for="major" style="margin-right: 78px;">Major :</label>
            <input type="text" id="beacon-major" v-model="form.major" readonly>
          </ul>
          <ul style="margin-left: 140px;">
            <label for="minor" style="margin-right: 78px;">Minor :</label>
            <input type="text" id="beacon-minor" v-model="form.minor" readonly>
          </ul>
          <br><br>
          <div class="btn">
            <button type="submit" class="save" >SAVE</button> 
            <button class="cancel" @click="clearForm()">CANCEL</button>
          </div>
        </form>
        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BeaconView",
  data() {
    return {
      beacons: [
        { address: "D8:6F:B8:83:E6:55", name: "IBKS 105 No 1" },
        { address: "F7:C4:0B:AE:40:95", name: "IBKS 105 No 2" },
        { address: "C2:AE:AB:86:5F:C2", name: "IBKS 105 No 3" },
        { address: "D5:99:FB:6D:1C:DA", name: "IBKS 105 No 4" },
        { address: "DA:42:A7:22:9F:6B", name: "IBKS 105 No 5" },
        { address: "F0:40:4A:49:3E:2D", name: "IBKS 105 No 6" },
      ],
      form: {
        beaconName: "",
        address: "",
        major: "",
        minor: "",
      },
      title: "อุปกรณ์ Beacon",
      message: "",
    };
  },
  methods: {
    async handleChangeBeacon() {
      const selectedBeacon = this.beacons.find(
        (beacon) => beacon.name === this.form.beaconName
      );
      console.log("📡 Beacon ที่พบ:", selectedBeacon);
      if (selectedBeacon) {
        this.form.address = selectedBeacon.address;
        await this.fetchBeaconDetails(); // เรียก API เพื่อดึง Major/Minor
      } else {
        this.form.address = "ไม่พบข้อมูล Beacon Address";
        this.form.major = "";
        this.form.minor = "";
      }
    },
    async fetchBeaconDetails() {
      if (this.form.beaconName) {
        try {
          const response = await fetch('http://localhost:3000/api/get-beacon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({address: this.form.address, beaconName: this.form.beaconName}),
          });
          const data = await response.json();

          console.log("📡 ข้อมูลจาก API:", data);

          if (data.major !== undefined && data.minor !== undefined) {
            this.form.major = data.major;
            this.form.minor = data.minor
          } else {
            this.form.major = "";
            this.form.minor = "";
            this.message = 'ไม่พบข้อมูล Major/Minor';
          }
        } catch (error) {
          console.error("❌ ดึงข้อมูล Beacon ไม่ได้:", error);
        }
      }
    },
    async submitForm() {
      if (!this.form.beaconName) {
        alert("⚠️ กรุณาเลือก Beacon");
        return;
      }

      const data = {
        name: this.form.beaconName,
        address: this.form.address,
        major: this.form.major,
        minor: this.form.minor,
      };

      try {
        const response = await axios.post("http://localhost:5000/api/beacons", data);
        console.log("✅ บันทึกข้อมูลสำเร็จ:", response.data);
        alert("✅ บันทึกข้อมูลสำเร็จ!");

        // ล้างฟอร์มหลังบันทึกสำเร็จ
        this.clearForm();
      } catch (error) {
        console.log(this.form);
        console.error("❌ บันทึกข้อมูลล้มเหลว", error);
        alert("❌ บันทึกข้อมูลล้มเหลว");
      }
    },
    clearForm() {
      this.form = {
        beaconName: '',
        address: '',
        major: '',
        minor: '',
      };
    },
  },
};
</script>

<style>
body {
  background-color: #f8ff7c;
}
.home {
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
