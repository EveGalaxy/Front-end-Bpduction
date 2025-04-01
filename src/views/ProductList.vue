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
      <div v-for="item in products" :key="item.id" class="card-bg">
        <figure>
          <img :src="item.image" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
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
  background-color: #006eb3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button.backtosearch:hover {
  background-color: #64f0ff;
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
  padding: 0;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 250px; /* ปรับขนาดตามต้องการ */
}

.card-bg figure {
  width: 100%;
  height: 40%; /* ปรับให้สูงขึ้นเพื่อให้เห็นภาพได้ชัดขึ้น */
  margin: 0; /* ลบ margin ออกเพื่อให้ติดขอบ */
  padding: 0; /* ลบ padding ออกเพื่อให้ติดขอบ */
  overflow: hidden;
}

.card-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* ป้องกันการยืดภาพ */
  display: block; /* ป้องกันช่องว่างรอบรูป */
}

.card-body {
  flex-grow: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.card-actions .btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const selectedCategory = ref(null);
const dropdownRef = ref(null);
const router = useRouter();

const categories = ref(["All", "อาหาร", "อุปกรณ์อิเล็กทรอนิกส์", "ของใช้ทั่วไป"]);
const products = ref([
  { id: 1, name: "ข้าวมันไก่", description: "ข้าวมันไก่สูตรพิเศษ", image: new URL('@/assets/Food1.jpg', import.meta.url).href },
  { id: 2, name: "แล็ปท็อป", description: "แล็ปท็อปสำหรับทำงาน", image: new URL('@/assets/Food2.webp', import.meta.url).href },
  { id: 3, name: "รองเท้า", description: "รองเท้ากีฬาสำหรับออกกำลัง", image: new URL('@/assets/Food3.webp', import.meta.url).href },
  { id: 4, name: "สมาร์ทโฟน", description: "โทรศัพท์มือถือรุ่นใหม่ล่าสุด", image: "/src/assets/phone.jpg" },
  { id: 5, name: "แก้วน้ำ", description: "แก้วน้ำสแตนเลส", image: "/src/assets/cup.jpg" },
  { id: 6, name: "หูฟังไร้สาย", description: "หูฟังคุณภาพเสียงดี", image: "/src/assets/headphones.jpg" },
  { id: 7, name: "กระเป๋าเป้", description: "กระเป๋าเป้กันน้ำ", image: "/src/assets/bag.jpg" },
  { id: 8, name: "เมาส์ไร้สาย", description: "เมาส์ไวเลสคุณภาพสูง", image: "/src/assets/mouse.jpg" }
]);

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
