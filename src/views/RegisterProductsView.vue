<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 animate-fade-in">
      <h2 class="text-2xl font-bold text-center text-indigo-700 mb-8">📝 ลงทะเบียนสินค้า</h2>

      <!-- ฟอร์ม -->
      <form @submit.prevent="saveProdDetail" class="space-y-6">
        <!-- ชื่อสินค้า -->
        <div>
          <label for="productname" class="block text-gray-700 font-medium mb-1">ชื่อสินค้า</label>
          <input
            type="text"
            id="productname"
            v-model="name"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <!-- รายละเอียดสินค้า -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">รายละเอียดสินค้า</label>
          <textarea
            v-model="description"
            placeholder="กรอกรายละเอียดสินค้า..."
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 resize-none"
          ></textarea>
        </div>

        <!-- หมวดหมู่สินค้า -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">หมวดหมู่ของสินค้า</label>
          <select
            v-model="category"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option disabled selected value="">-- เลือกประเภทสินค้า --</option>
            <option value="อาหาร">อาหาร</option>
            <option value="อุปกรณ์อิเล็กทรอนิกส์">อุปกรณ์อิเล็กทรอนิกส์</option>
            <option value="ของใช้ทั่วไป">ของใช้ทั่วไป</option>
          </select>
        </div>

        <!-- Beacon -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Beacon ที่ต้องการติดตั้ง</label>
          <select
            v-model="beaconId"
            
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option disabled selected value="">-- เลือก Beacon --</option>
            <option value="1">IBKS 105 No 1</option>
            <option value="2">IBKS 105 No 2</option>
            <option value="3">IBKS 105 No 3</option>
            <option value="4">IBKS 105 No 4</option>
            <option value="5">IBKS 105 No 5</option>
            <option value="6">IBKS 105 No 6</option>
          </select>
        </div>

        <!-- ปุ่มต่าง ๆ -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <button
            type="button"
            @click="gotoBeaconView"
            class="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-lg font-medium transition-all"
          >
            📍 บันทึกค่า Beacon ที่นี่!
          </button>

          <button
            type="submit"
            class="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            ✅ SAVE
          </button>
        </div>
        <!-- Modal แจ้งบันทึกสำเร็จ -->
        <div
          v-if="showSuccessModal"
          class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-fade-in text-center">
            <h3 class="text-xl font-semibold text-green-600 mb-4">✅ บันทึกสินค้าเรียบร้อย!</h3>
            <p class="text-gray-600">ข้อมูลสินค้าถูกบันทึกสำเร็จแล้ว</p>
            <button
              @click="showSuccessModal = false"
              class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
            >
              ตกลง
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ตัวแปร reactive
const name = ref('')
const category = ref('--ประเภทของสินค้า--')  // ค่าเริ่มต้น (default)
const description = ref('')
const beaconId = ref('--ประเภทของบีคอน--')

// ใช้ Vue Router
const router = useRouter()

// ฟังก์ชัน
const gotoBeaconView = () => {
  router.replace('/register-beacon')
}

const showSuccessModal = ref(false)
const saveProdDetail = async () => {
  if (!name.value || category.value === '--ประเภทของสินค้า--') {
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
    showSuccessModal.value = true
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

