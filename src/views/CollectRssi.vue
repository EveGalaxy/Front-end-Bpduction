<template>
  <div class="home">
    <div class="Beacon">
      <div class="items">
        <form @submit.prevent="submitRSSI">
          <ul style="margin-left: 140px;">
            <label style="margin-right: 60px;">Beacon Name :</label>
            <select v-model="selectedBeacon">
              <option value="" disabled selected>เลือก Beacon</option>
              <option v-for="b in beaconList" :key="b.address" :value="b">
                {{ b.name }} ({{ b.address }})
              </option>
            </select>
          </ul>
          <ul style="margin-left: 140px;">
            <label style="margin-right: 60px;">Slot (ตำแหน่ง A-D)</label>
            <select v-model="form.slot">
              <option value="" disabled >เลือก Slot</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
              <option value="4">D</option>
            </select>
          </ul>
          <ul style="margin-left: 140px;">
            <label style="margin-right: 60px;">ครั้งที่ (Collect)</label>
            <input type="number" id="beacon-address" v-model.number="form.collect" min="1" max="10">
          </ul>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="i in 4" :key="i">
              <label class="block font-semibold">RSSI {{ i }}</label>
              <input type="number" v-model.number="form[`rssi_${i}`]" class="border p-2 rounded w-full" />
            </div>
          </div>
          <br><br>
          <div class="btn">
            <button type="submit" class="save" >SAVE</button>
          </div>
        </form>
        <button class="scan" @click="scanRSSI">🔍SCAN</button> 
        <p v-if="success" class="text-green-600 mt-4">✅ บันทึกสำเร็จ</p>
        <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  slot: '',
  collect: 1,
  rssi_1: null,
  rssi_2: null,
  rssi_3: null,
  rssi_4: null
})

const beaconList = ref([
  { name: 'IBKS 105 No 1', address: 'D8:6F:B8:83:E6:55' },
  { name: 'IBKS 105 No 2', address: 'F7:C4:0B:AE:40:95' },
  { name: 'IBKS 105 No 3', address: 'C2:AE:AB:86:5F:C2' },
  { name: 'IBKS 105 No 4', address: 'D5:99:FB:6D:1C:DA' },
  { name: 'IBKS 105 No 5', address: 'DA:42:A7:22:9F:6B' },
  { name: 'IBKS 105 No 6', address: 'F0:40:4A:49:3E:2D' }
])

const selectedBeacon = ref(null)
const success = ref(false)
const error = ref('')

const scanRSSI = async () => {
  if (!selectedBeacon.value) return

  try {
    const res = await fetch(`http://localhost:5000/scan-rssi?name=${selectedBeacon.value.name}&address=${selectedBeacon.value.address}`)
    const result = await res.json()

    form.value.rssi_1 = result.rssi_1
    form.value.rssi_2 = result.rssi_2
    form.value.rssi_3 = result.rssi_3
    form.value.rssi_4 = result.rssi_4

  } catch (err) {
    console.error("❌ Error while scanning RSSI:", err)
  }
} 


const submitRSSI = async () => {
  success.value = false
  error.value = ''

  const payload = {
    slot: form.value.slot,
    collect: form.value.collect,
    rssi_1: form.value.rssi_1,
    rssi_2: form.value.rssi_2
  }

  try {
    const res = await fetch('http://localhost:5000/collect-rssi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const result = await res.json()

    if (res.ok) {
      success.value = true
    } else {
      error.value = result.error || 'เกิดข้อผิดพลาดในการบันทึก'
    }
  } catch (err) {
    console.error('❌ Network Error:', err)
    error.value = 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้'
  }
}



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
