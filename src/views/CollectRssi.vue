<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 animate-fade-in">
      <h2 class="text-2xl font-bold text-blue-700 mb-6 text-center">📶 เก็บค่า RSSI สำหรับ Beacon</h2>

      <form @submit.prevent="submitRSSI" class="space-y-6">
        <!-- Beacon Name -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label class="w-44 font-medium text-gray-700">🛰️ Beacon Name:</label>
          <select
            v-model="selectedBeacon"
            required
            class="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled selected>เลือก Beacon</option>
            <option v-for="b in beaconList" :key="b.address" :value="b">
              {{ b.name }} ({{ b.address }})
            </option>
          </select>
        </div>

        <!-- Slot -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label class="w-44 font-medium text-gray-700">🗂️ Slot (A-D):</label>
          <select
            v-model="form.slot"
            required
            class="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>เลือก Slot</option>
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
            <option value="4">D</option>
          </select>
        </div>

        <!-- Collect Number -->
        <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label class="w-44 font-medium text-gray-700">🔁 ครั้งที่ (Collect):</label>
          <input
            type="number"
            v-model.number="form.collect"
            min="1"
            max="10"
            required
            class="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- RSSI Inputs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i">
            <label class="block font-medium text-gray-700">📶 RSSI {{ i }}</label>
            <input
              type="number"
              v-model.number="form[`rssi_${i}`]"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between items-center pt-4">
          <button
            type="button"
            @click="scanRSSI"
            class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2 rounded-lg transition-all"
          >
            🔍 SCAN
          </button>
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all"
          >
            💾 SAVE
          </button>
        </div>

        <!-- Modal -->
        <div
          v-if="showSuccessModal"
          class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-fade-in-modal text-center">
            <h3 class="text-xl font-semibold text-green-600 mb-4">✅ บันทึกเรียบร้อย!</h3>
            <p class="text-gray-600">ข้อมูล RSSI ถูกบันทึกสำเร็จแล้ว</p>
            <button
              @click="showSuccessModal = false"
              class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              ตกลง
            </button>
          </div>
        </div>
        <!-- Success/Error Messages -->
        <p v-if="error" class="text-red-600 text-center mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
@keyframes fade-in-modal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in-modal {
  animation: fade-in 0.3s ease-out;
}

</style>

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

const showSuccessModal = ref(false)

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
      form.value = {
        slot: '',
        collect: 1,
        rssi_1: null,
        rssi_2: null,
        rssi_3: null,
        rssi_4: null
      }
    } else {
      error.value = result.error || 'เกิดข้อผิดพลาดในการบันทึก'
    }
  } catch (err) {
    console.error('❌ Network Error:', err)
    error.value = 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้'
  }
  
  setTimeout(() => {
    showSuccessModal.value = true
  }, 500)


}

</script>
