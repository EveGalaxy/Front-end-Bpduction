<template>
  <div class="listprod">
    <h2 class="prodhead">รายการสินค้าทั้งหมด</h2>
    
    <div class="top-bar">
      <div class="dropdown-container" ref="dropdownRef">
        <span @click="toggleDropdown" class="dropdown-btn">
          {{ selectedCategory || "เลือกประเภทสินค้า" }}
        </span>
        <transition name="dropdown">
          <ul v-if="isOpen" class="dropdown-menu">
            <li v-for="category in categories" :key="category" @click="selectCategory(category)">
              {{ category }}
            </li>
          </ul>
        </transition>
      </div>
      
      <button class="backtosearch" @click="backtoprevious()">กลับหน้าค้นหาสินค้า</button>
    </div>
    
    <div class="product-grid">
      <div v-for="item in filteredProducts" :key="item.id" class="card-bg">
        <figure>
          <img :src="item.image" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ item.name }}</h2>
          <p><strong>ประเภทสินค้า:</strong> {{ item.category }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="showDetails(item)">Details</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for showing item details -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>รายละเอียดสินค้า</h3>
        <img :src="selectedItem.image" alt="Product Image" class="modal-image"/>
        <p><strong>ชื่อสินค้า:</strong> {{ selectedItem.name }}</p>
        <p><strong>รหัสสินค้า:</strong> {{ selectedItem.id }}</p>
        <p><strong>ประเภทสินค้า:</strong> {{ selectedItem.category }}</p>
        <p><strong>ประเภทอุปกรณ์ Beacon:</strong> {{ selectedItem.beaconType }}</p>
        <p><strong>ตำแหน่งที่จัดเก็บสินค้า:</strong> {{ selectedItem.storageLocation }}</p>
        <p><strong>จำนวนสินค้า:</strong> {{ selectedItem.quantity }}</p>
        <button class="close-btn" @click="closeModal">ปิด</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listprod {
  background-color: #ccfe58;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid black;
  border-radius: 30px;
  padding: 20px;
  color: black;
  max-width: 1200px;
  margin: 50px auto;
  text-align: center;
}

.prodhead {
  font-size: 24px;
  margin-bottom: 20px;
}

.top-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin-bottom: 20px;
}

.dropdown-container {
  position: relative;
  width: 250px;
}

.dropdown-btn {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: rgb(255, 120, 255);
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
}

.dropdown-menu {
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin-top: 5px;
  left: 0;
  margin-left: 10px;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

button.backtosearch {
  padding: 10px 20px;
  background-color: #ff5733;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}

button.backtosearch:hover {
  background-color: #c70039;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
  max-width: 1000px;
  margin: 20px auto;
}

.card-bg {
  background-color: #64f0ff;
  border: 2px solid black;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: auto; /* ปรับให้ขยายตามเนื้อหา */
  max-width: 100%; /* ป้องกันการขยายเกิน */
}

.card-bg figure {
  width: 100%;
  height: 250px; /* ความสูงของภาพ */
  overflow: hidden;
  margin: 0; /* ลบ margin ออก */
  padding: 0; /* ลบ padding ออก */
}

.card-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* ให้ภาพเติมเต็มพื้นที่ */
  display: block; /* ป้องกันช่องว่างรอบรูป */
}

/* จัดให้ card-title อยู่ตรงกลาง card-body */
.card-body {
  flex-grow: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* จัดให้อยู่ตรงกลางแนวตั้ง */
  align-items: center; /* จัดให้อยู่ตรงกลางแนวนอน */
  text-align: center;
}

/* ลบคำอธิบายสินค้าออก */
.card-body p {
  display: none;
}

.card-title {
  font-size: 20px; /* ขยายขนาดตัวอักษร */
  font-weight: bold;
  margin-top: 15px; /* เพิ่มระยะห่างจากปุ่ม */
  margin-left: 0px;
}

/* ปรับสไตล์ของปุ่ม Buy Now */
.card-actions .btn-primary {
  background-color: #28a745; /* สีเขียวเข้ม */
  color: #ffffff; /* ตัวอักษรสีขาว */
  border: none;
  padding: 14px 24px; /* ขยายขนาดปุ่ม */
  border-radius: 8px;
  font-size: 20px; /* ขยายขนาดตัวอักษร */
  font-weight: bold; /* ทำให้ตัวอักษรหนา */
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.card-actions .btn-primary:hover {
  background-color: #218838; /* สีเขียวอ่อนเมื่อโฮเวอร์ */
}

/* Existing styles... */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 600px; /* กำหนดให้เป็นสี่เหลี่ยมผืนผ้า */
  height: auto; /* ให้สูงเท่ากับเนื้อหา */
  text-align: left;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-content h3 {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  margin-left: 0px;
}

.modal-content p {
  font-size: 18px;
  margin: 5px 0;
  line-height: 1.5;
}

.modal-image {
  width: 300px; /* กำหนดขนาดรูปให้เท่ากัน */
  height: 300px;
  object-fit: cover; /* คงสัดส่วนของรูป */
  display: block;
  margin: 0 auto; /* จัดให้อยู่ตรงกลาง */
  border-radius: 10px; /* เพิ่มความโค้งมน */
}

.modal-content .close-btn {
  align-self: center; /* จัดปุ่มให้อยู่ตรงกลาง */
  margin-top: 20px;
}

.close-btn {
  background-color: #ff5733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.close-btn:hover {
  background-color: #c70039;
}
</style>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const selectedCategory = ref(null);
const dropdownRef = ref(null);
const isModalOpen = ref(false);
const selectedItem = ref({});
const router = useRouter();

const categories = ref(["All", "อาหาร", "อุปกรณ์อิเล็กทรอนิกส์", "ของใช้ทั่วไป"]);
const products = ref([
  { id: 1, name: "พะแนงทูน่ากระป๋อง", category: "อาหาร", image: new URL('@/assets/Food1.jpg', import.meta.url).href },
  { id: 2, name: "มาม่ารสหมูสับ", category: "อาหาร", image: new URL('@/assets/Food2.webp', import.meta.url).href },
  { id: 3, name: "อุด้งข้าวซอยไก่", category: "อาหาร", image: new URL('@/assets/Food3.webp', import.meta.url).href },
  { id: 4, name: "ลำโพง", category: "อุปกรณ์อิเล็กทรอนิกส์", image: new URL('@/assets/electronic1.avif', import.meta.url).href },
  { id: 5, name: "หูฟังแบบครอบหู", category: "อุปกรณ์อิเล็กทรอนิกส์", image: new URL('@/assets/electronic2.jpeg', import.meta.url).href },
  { id: 6, name: "กระเป๋าสตางค์", category: "ของใช้ทั่วไป", image: new URL('@/assets/itemgen1.jpg', import.meta.url).href },
  { id: 7, name: "ที่แต่งหน้า", category: "ของใช้ทั่วไป", image: new URL('@/assets/itemgen2.jpg', import.meta.url).href },
  { id: 8, name: "เครื่องคิดเลข", category: "ของใช้ทั่วไป", image: new URL('@/assets/itemgen3.png', import.meta.url).href }
]);

const filteredProducts = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === "All") {
    return products.value;
  }
  return products.value.filter(item => item.category === selectedCategory.value);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const showDetails = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const backtoprevious = () => {
  router.push('/search-product');
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
