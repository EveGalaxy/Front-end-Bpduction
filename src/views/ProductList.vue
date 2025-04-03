<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">รายการสินค้า</h2>
    <table class="table-auto w-full border">
      <thead>
        <tr>
          <th class="px-4 py-2 border">ชื่อสินค้า</th>
          <th class="px-4 py-2 border">หมวดหมู่</th>
          <th class="px-4 py-2 border">Beacon</th>
          <th class="px-4 py-2 border">ตำแหน่ง</th>
          <th class="px-4 py-2 border">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.ProductID">
          <td class="border px-4 py-2">{{ product.Name }}</td>
          <td class="border px-4 py-2">{{ product.Category }}</td>
          <td class="border px-4 py-2">{{ product.BeaconName }}</td>
          <td class="border px-4 py-2">{{ product.LocationCode || 'ยังไม่ระบุตำแหน่ง' }}</td>
          <td class="border px-4 py-2 space-x-2">
            <button @click="openModal(product)" class="bg-blue-500 text-white px-3 py-1 rounded">ดูรายละเอียด</button>
            <button @click="updateSlot(product.ProductID)" class="bg-green-500 text-white px-3 py-1 rounded">อัปเดตตำแหน่ง</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- แผนผัง LocationCode -->
    <!-- <h3 class="text-xl font-semibold mt-10 mb-2">แผนผังชั้นวาง (Location Map)</h3>
    <div class="grid grid-cols-6 gap-4 mb-10">
      <div
        v-for="slot in shelfMap"
        :key="slot.LocationCode"
        class="p-4 border rounded text-center"
        :class="{
          'bg-green-200': usedCodes.includes(slot.LocationCode),
          'bg-gray-100': !usedCodes.includes(slot.LocationCode)
        }"
      >
        {{ slot.LocationCode }}
      </div>
    </div> -->

    <!-- Modal -->
    <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-xl w-96">
        <h3 class="text-xl font-bold mb-4">รายละเอียดสินค้า</h3>
        <p><strong>ชื่อสินค้า:</strong> {{ selectedProduct.Name }}</p>
        <p><strong>หมวดหมู่:</strong> {{ selectedProduct.Category }}</p>
        <p><strong>รายละเอียด:</strong> {{ selectedProduct.Description }}</p>
        <p><strong>Beacon ที่ใช้:</strong> {{ selectedProduct.BeaconName }}</p>
        <p><strong>ตำแหน่งบนชั้นวาง (LocationCode):</strong> {{ selectedProduct.LocationCode || 'ยังไม่ระบุตำแหน่ง' }}</p>
        <div class="mt-4 text-right">
          <button @click="selectedProduct = null" class="px-4 py-2 bg-gray-300 rounded">ปิด</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const shelfMap = ref([])
const usedCodes = ref([])
const selectedProduct = ref(null)

const openModal = (product) => {
  selectedProduct.value = product
}

const fetchData = async () => {
  const res = await fetch('http://localhost:5000/product-list-full')
  const data = await res.json()
  products.value = data
  usedCodes.value = data.map(p => p.LocationCode).filter(Boolean)

  const slotRes = await fetch('http://localhost:5000/slot-location-list')
  shelfMap.value = await slotRes.json()
}

const updateSlot = async (productId) => {
  const res = await fetch(`http://localhost:5000/predict-slot/${productId}`, { method: 'POST' })
  const result = await res.json()
  if (result.predictedSlot) {
    alert(`อัปเดตตำแหน่งสินค้าสำเร็จ: Slot ${result.predictedSlot}`)
    await fetchData()
  } else {
    alert('ไม่สามารถอัปเดตตำแหน่งได้')
  }
}

onMounted(fetchData)
</script>

<style scoped>
</style>
