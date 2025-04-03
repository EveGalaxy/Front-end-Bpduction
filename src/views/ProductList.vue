<template>
  <div class="p-6 bg-gradient-to-br from-blue-100 to-blue-300" >
    <h2 class="text-3xl font-bold text-center mb-4 text-violet-700"> 📦 รายการสินค้า 📋</h2>
    <table class="min-w-full bg-gradient-to-br from-blue-100 to-green-200 rounded-xl shadow-md overflow-hidden animate-fade-in">
      <thead class="bg-gradient-to-br from-green-500 to-blue-500 font-semibold text-white-100 text-left">
        <tr>
          <th class="px-6 py-3 text-xl font-semibold">ชื่อสินค้า</th>
          <th class="px-6 py-3 text-xl font-semibold">หมวดหมู่</th>
          <th class="px-6 py-3 text-xl font-semibold">Beacon</th>
          <th class="px-6 py-3 text-xl font-semibold">ตำแหน่ง</th>
          <th class="px-6 py-3 text-xl font-semibold">จัดการ</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-grey-200">
        <tr v-for="product in products" :key="product.ProductID">
          <td class="px-6 py-4 font-semibold text-pink-700">{{ product.Name }}</td>
          <td class="px-6 py-4 font-semibold text-rose-700">{{ product.Category }}</td>
          <td class="px-6 py-4 font-semibold text-indigo-600">{{ product.BeaconName || '-' }} </td>
          <td class="px-6 py-4 text-xl font-semibold text-fuchsia-500">{{ product.LocationCode || '-' }}</td>
          <td class="px-6 py-4">
            <div class="flex flex-wrap gap-2">
              <button @click="openModal(product)" class="btn btn-info hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                ดูรายละเอียด
              </button>
              <button @click="updateSlot(product.ProductID)" class="btn btn-success hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                อัปเดตตำแหน่ง
              </button>
              <button @click="confirmDelete(product.ProductID)" class="btn btn-warning hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">
                ลบ
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="selectedProduct" class="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
        <h3 class="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">📦 รายละเอียดสินค้า</h3>
        
        <div class="space-y-2 text-base text-gray-700">
          <p><span class="font-semibold text-xl text-green-600">ชื่อสินค้า:</span> {{ selectedProduct.Name }}</p>
          <p><span class="font-semibold text-yellow-600">หมวดหมู่:</span> {{ selectedProduct.Category }}</p>
          <p><span class="font-semibold text-yellow-600">รายละเอียด:</span> {{ selectedProduct.Description }}</p>
          <p><span class="font-semibold text-red-600">Beacon ที่ใช้:</span> {{ selectedProduct.BeaconName || 'ไม่มีข้อมูล Beacon' }}</p>
          <p><span class="font-semibold text-purple-600">ตำแหน่งบนชั้นวาง:</span> 
            {{ selectedProduct.LocationCode || 'ไม่สามารถระบุตำแหน่ง' }}
          </p>
        </div>

        <div class="mt-6 text-right">
          <button 
            @click="selectedProduct = null" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl shadow-sm transition-all duration-200"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>

    <!--Show Update Success Modal -->
    <div
          v-if="showUpdateModal"
          class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-fade-in text-center">
            <h3 class="text-xl font-semibold text-green-600 mb-4">✅ อัปเดตตำแหน่งสินค้าสำเร็จ !</h3>
            <button
              @click="showUpdateModal = false"
              class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
            >
              ตกลง
            </button>
          </div>
        </div>
        
    <!-- Confirm Delete Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-fade-in text-center">
        <h3 class="text-xl font-semibold text-red-600 mb-4">⚠️ ยืนยันการลบ</h3>
        <p class="text-gray-700 mb-6">คุณต้องการลบสินค้านี้หรือไม่? ข้อมูลจะไม่สามารถกู้คืนได้</p>

        <div class="flex justify-center gap-4">
          <button
            @click="cancelDelete"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg"
          >
            ยกเลิก
          </button>
          <button
            @click="deleteConfirmed"
            class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            ลบเลย!
          </button>
        </div>
      </div>
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
  animation: fade-in 0.4s ease-out;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const usedCodes = ref([])
const selectedProduct = ref(null)
const showUpdateModal = ref(false)
const showConfirmModal = ref(false)
const selectedProductId = ref(null)

const openModal = (product) => {
  selectedProduct.value = product
}

const fetchData = async () => {
  const res = await fetch('http://localhost:5000/product-list-full')
  const data = await res.json()
  products.value = data
  usedCodes.value = data.map(p => p.LocationCode).filter(Boolean)
}

const updateSlot = async (productId) => {
  const res = await fetch(`http://localhost:5000/predict-slot/${productId}`, { method: 'POST' })
  const result = await res.json()
  if (result.predictedSlot) {
    showUpdateModal.value = true
    await fetchData()
  } else {
    alert('ไม่สามารถอัปเดตตำแหน่งได้')
  }
}

const deleteProduct = async (productId) => {

  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'DELETE'
    });

    const result = await res.json();

    if (res.ok) {
      // ลบออกจากรายการในหน้า
      products.value = products.value.filter(p => p.ProductID !== productId);
    } else {
      alert(result.error || 'ลบสินค้าไม่สำเร็จ');
    }
  } catch (err) {
    console.error('❌ Network Error:', err);
    alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
  }
};

function confirmDelete(productId) {
  selectedProductId.value = productId
  showConfirmModal.value = true
}

function cancelDelete() {
  selectedProductId.value = null
  showConfirmModal.value = false
}

function deleteConfirmed() {
  // เรียกฟังก์ชันลบจริง ๆ ที่คุณมีอยู่ เช่น:
  deleteProduct(selectedProductId.value)

  // ปิด modal
  showConfirmModal.value = false
}

onMounted(fetchData)


</script>
