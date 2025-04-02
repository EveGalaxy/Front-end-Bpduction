<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">รายการสินค้า</h2>
    <table class="table-auto w-full border">
      <thead>
        <tr>
          <th class="px-4 py-2 border">ชื่อสินค้า</th>
          <th class="px-4 py-2 border">หมวดหมู่</th>
          <th class="px-4 py-2 border">Beacon</th>
          <th class="px-4 py-2 border">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.ProductID">
          <td class="border px-4 py-2">{{ product.Name }}</td>
          <td class="border px-4 py-2">{{ product.Category }}</td>
          <td class="border px-4 py-2">{{ product.BeaconName }}</td>
          <td class="border px-4 py-2">
            <button @click="openModal(product)" class="bg-blue-500 text-white px-3 py-1 rounded">ดูรายละเอียด</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="selectedProduct" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-xl w-96">
        <h3 class="text-xl font-bold md-4">รายละเอียดสินค้า</h3>
        <p><strong>ชื่อสินค้า:</strong> {{ selectedProduct.Name }}</p>
        <p><strong>หมวดหมู่:</strong> {{ selectedProduct.Category }}</p>
        <p><strong>รายละเอียด:</strong> {{ selectedProduct.Description }}</p>
        <p><strong>Beacon ที่ใช้:</strong> {{ selectedProduct.BeaconName }}</p>
        <p><strong>ตำแหน่งบนชั้นวาง (LocationCode):</strong> {{ selectedProduct.LocationCode }}</p>
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
const productsWithBeacon = ref([])
const selectedProduct = ref(null)

const openModal = (product) => {
  selectedProduct.value = product
}

onMounted(async () => {
  const res = await fetch('http://localhost:5000/product-list-full')
  products.value = await res.json()
})
</script>

