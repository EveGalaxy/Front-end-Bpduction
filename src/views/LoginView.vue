<template>
    <div class="Login">
        <img :src="imageUrl" alt="Description" class="pBrand"/>
        <h2 class="logintitle">BPDuction</h2>
        <div class="Userlogin">
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" v-model="username" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit" class="login">Login</button>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <RouterLink to="/sign-up">
              <button type="submit" class="signup">Sign Up</button>
            </RouterLink>
          </form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
        imageUrl: require('@/assets/duck-logo.webp'),
        username: "",
        password: "",
        errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      console.log("🔍 Sending Data:", this.username, this.password); // Debug Frontend
  
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.username,
          password: this.password
        });
  
        console.log("✅ Response from server:", res); // Debug API Response
        localStorage.setItem('token', res.data.token);
        alert("Login Successful!");

        this.$router.push('/main');
      } catch (err) {
        console.error("❌ Error response:", err.response); // Debug Error Response
        this.errorMessage = err.response?.data?.error || "An unexpected error occurred";
      }
    }
  }
};
</script>

<style>
.pBrand{
  width: 150px;
  height: 150px;
  margin-top: -35px;
  margin-left: 0px;
  border-radius: 50%;
  border: 4px solid black;
}
.Login{
    margin-top: 140px;
    margin-bottom: 70px;
}
.logintitle{
  margin-left: 0px;
  margin-top: 10px;
  color: rgb(208, 255, 0);
}
.Userlogin{
  background-color: #ffe7aa;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid black;
  border-radius: 30px;
  display: flexbox;
  padding-top: 50px;
  padding-left: 1100px;
  padding-bottom: 180px;
  color: black;
  position: fixed;
  margin-top: 0px;
  margin-bottom: 150px;
  margin-left: 88px;
  margin-right: 40px;
  height: 100px;
  width: 250px;
}

.form-group {
  margin-left: -500px;
  margin-bottom: 15px;
}

body{
    background-color: #6fd78f;
}


#username {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#password {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button.login {
  width: 50%;
  padding: 10px;
  background-color: #006eb3;
  color: rgb(85, 255, 43);
  border:2px solid blue;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  -webkit-text-stroke: 0.5px rgb(0, 228, 0);
  margin-left: -1050px;
  margin-top: 110px;
}

button.login:hover {
  background-color: #64f0ff;
}

button.signup {
  width: 50%;
  padding: 10px;
  background-color: #ff8000;
  color: rgb(255, 241, 43);
  border:2px solid rgb(255, 0, 0);
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  -webkit-text-stroke: 0.5px rgb(255, 247, 5);
  margin-left: 50px;
  margin-top: 110px;
}

button.signup:hover {
  background-color: #ff6464;
}
</style>
