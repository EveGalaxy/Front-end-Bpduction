<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-fade-in">
        <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">📝 Sign Up</h2>
  
        <form @submit.prevent="handleSignUp" class="space-y-5">
          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">👤 Username</label>
            <input
              v-model="formData.username"
              type="text"
              placeholder="Username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Firstname -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">👤 Firstname</label>
            <input
              v-model="formData.firstname"
              type="text"
              placeholder="Firstname"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Lastname -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">👤 Lastname</label>
            <input
              v-model="formData.lastname"
              type="text"
              placeholder="Lastname"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">🔒 Password</label>
            <input
              v-model="formData.password"
              type="password"
              placeholder="Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <!-- Role -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">🛡 เลือกบทบาท</label>
            <div class="flex gap-4">
              <label
                v-for="option in options"
                :key="option.value"
                class="flex items-center gap-2 cursor-pointer text-sm"
                :class="{
                  'text-blue-600 font-semibold': selectedOption === option.value,
                  'text-gray-500': selectedOption !== option.value
                }"
              >
                <input type="radio" v-model="selectedOption" :value="option.value" />
                {{ option.label }}
              </label>
            </div>
          </div>
  
          <!-- Buttons -->
          <div class="flex justify-between pt-4">
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
            >
              ✅ Sign Up
            </button>
            <button
              type="button"
              @click="gotoLogin"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-all"
            >
              🔙 Back
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  
  const formData = ref({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
  })
  const selectedOption = ref('user')
  const options = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ]
  
  function handleSignUp() {
    const payload = {
      ...formData.value,
      role: selectedOption.value,
    }
  
    axios.post('http://localhost:5000/api/auth/register', payload)
      .then(() => {
        alert('สมัครสมาชิกสำเร็จ! 🎉')
        router.push('/login')
      })
      .catch((err) => {
        alert(err.response?.data?.error || 'เกิดข้อผิดพลาดในการสมัคร')
      })
  }
  
  function gotoLogin() {
    router.push('/login')
  }
  </script>  
