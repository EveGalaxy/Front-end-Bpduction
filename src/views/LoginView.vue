<template>
    <div class="Login">
        <img :src="imageUrl" alt="Description" class="pBrand"/>
        <h2 class="logintitle">BPDuction</h2>
        <div class="Userlogin">
          <label class="usernametitle">Username</label>
          <label class="passwordtitle">Password</label><br>
          <input type="text" id="username" v-bind:style="{ fontSize: '20px', paddingRight: '250px' }">
          <input type="text" id="password" v-bind:style="{ fontSize: '20px', paddingRight: '250px' }">


        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        imageUrl: require('@/assets/duck-logo.webp')
    }
  }
}
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
.passwordtitle{
  margin-left: -1080px;
  padding-bottom: -100px;
}
.usernametitle{
  margin-left: -2080px;
  padding-bottom: -100px;
}
#password{
  margin-top: 0px;
  margin-left: 200px;
}
#username{
  margin-top: 0px;
  margin-left: -1150px;
}
body{
    background-color: #6fd78f;
}
</style>