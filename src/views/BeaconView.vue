<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 animate-fade-in">
      <h2 class="text-2xl font-bold text-blue-700 mb-6 text-center">{{ title }}</h2>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Beacon Name -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label for="beacon" class="w-40 font-medium text-gray-700">🛰️ Beacon Name:</label>
          <select
            v-model="form.beaconName"
            id="beacon"
            @change="handleChangeBeacon"
            required
            class="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled selected>เลือก Beacon</option>
            <option v-for="beacon in beacons" :key="beacon.address" :value="beacon.name">
              {{ beacon.name }}
            </option>
          </select>
        </div>

        <!-- Address -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label for="address" class="w-40 font-medium text-gray-700">📍 Address:</label>
          <input
            type="text"
            id="beacon-address"
            v-model="form.address"
            readonly
            class="w-full md:w-2/3 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          />
        </div>

        <!-- Major -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label for="major" class="w-40 font-medium text-gray-700">🔢 Major:</label>
          <input
            type="text"
            id="beacon-major"
            v-model="form.major"
            readonly
            class="w-full md:w-2/3 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>

        <!-- Minor -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label for="minor" class="w-40 font-medium text-gray-700">🔢 Minor:</label>
          <input
            type="text"
            id="beacon-minor"
            v-model="form.minor"
            readonly
            class="w-full md:w-2/3 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all"
          >
            💾 SAVE
          </button>
          <button
            type="button"
            @click="clearForm()"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg transition-all"
          >
            ❌ CANCEL
          </button>
        </div>

        <p v-if="message" class="text-center text-green-600 font-semibold mt-4">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>



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

