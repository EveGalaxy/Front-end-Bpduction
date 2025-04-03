<template>
    <div class="SignupLeftView">
        <img src="@/assets/SignUpImage.jpg" alt="Sign Up Image" class="signup-image">
        <div class="SignUptemplate">
            <h2 class="titleSignup">Sign Up</h2>
        </div>
    </div>
    <div class="card-body px-lg-5 py-lg-5">
        <form role="form" class="signup-form">
            <div class="form-group mb-3">
                <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fa fa-user">
                            </i>
                        </span>
                    </div>
                    <input v-model="formData.username" placeholder="Username" type="text" class="form-control" fdprocessedid="kdzzh">
                </div>
            </div>
            <div class="form-group mb-3">
                <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fa fa-user">
                            </i>
                        </span>
                    </div>
                    <input v-model="formData.firstname" placeholder="Firstname" type="text" class="form-control" fdprocessedid="kdzzh">
                </div>
            </div>
            <div class="form-group mb-3">
                <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fa fa-user">
                            </i>
                        </span>
                    </div>
                    <input v-model="formData.lastname" placeholder="Lastname" type="text" class="form-control" fdprocessedid="kdzzh">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fa fa-unlock-alt">
                            </i>
                        </span>
                    </div>
                    <input v-model="formData.password" placeholder="Password" type="password" class="form-control" fdprocessedid="abdeln">
                </div>
            </div>
            <div class="custom-control custom-control-alternative custom-checkbox">
                <input id=" customCheckLogin2" type="checkbox" class="custom-control-input">
                <label for=" customCheckLogin2" class="custom-control-label">
                    <span>Remember me</span>
                </label>
            </div>
            <div class="role-signup">
                <label for=" customCheckRole" class="custom-role">
                    <span>Role User</span>
                </label>
                <label v-for="option in options" 
                :key="option.value" 
                :class="{'selected-user': selectedOption === 'user' && option.value === 'user',
                         'selected-admin': selectedOption === 'admin' && option.value === 'admin',
                         'default': selectedOption !== option.value}"
                class="radio-label">
                    <input type="radio" v-model="selectedOption" :value="option.value">
                    {{ option.label }}
                </label>
            </div>
            <div class="text-center">
                <button type="button" class="btn-primary mt-4" fdprocessedid="9jl2er" @click="handleSignUp()">Sign Up</button>
                <button type="button" class="goBack" @click="gotoLogin()">Back</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    data() {
        return {
            selectedOption: "",
            options: [
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" }
            ],
            formData: {
                username: "",
                firstname: "",
                lastname: "",
                password: ""
            }
        };
    },
    methods: {
        async handleSignUp(){
            try {
                const res = await axios.post('http://localhost:5000/api/auth/register', this.formData);
                alert(res.data.message);
                this.$router.push('/');
            } catch (err) {
                this.errorMessage = err.response.data.error;
            }
        },
        async gotoLogin() {
            this.$router.replace('/');
        }
    }
}
</script>

<style scoped>
.border-0 {
    border: 0 !important;
}
.bg-secondary {
    background-color: #6c757d !important;
}
.btn-primary{
    color: #fff;
    background-color: #5e72e4;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* เพิ่มเงาให้ปุ่มดูเด่นขึ้น */
    cursor: pointer;
    padding: 12px 15px;
    position: relative;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
    will-change: transform;
    letter-spacing: .025em;
    font-size: 1.5rem;
    font-weight: bold;
    width: 20%;
}
.btn-primary:hover {
    background-color: #3d56d6;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3); /* เพิ่มเงาเมื่อ hover */
    transform: scale(1.05); /* ทำให้ปุ่มขยายเล็กน้อยเมื่อ hover */
}
.goBack {
    color: #fff;
    background-color: #f34141;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* เพิ่มเงาให้ปุ่มดูเด่นขึ้น */
    cursor: pointer;
    padding: 12px 15px;
    position: relative;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
    will-change: transform;
    letter-spacing: .025em;
    font-size: 1.5rem;
    font-weight: bold;
    width: 20%;
}


.card {
    position: relative;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
}
.card-body {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    padding: 1.5rem;
    background-color: coral;
    border-radius: 5%;
    width: 50%;
    justify-self: end;
    margin-right: 100px;
    padding-top: 150px;
    margin-top: 130px;
}
.custom-control{
    margin-top: 0px;
    margin-bottom: -150px;
    margin-left: 100px;
}
.custom-control-input {
    margin-left: -250px;
}
.custom-control-label {
    position: relative;
    margin-left: 0px;
    margin-bottom: 0;
    vertical-align: top;
}
.custom-role{
    position: relative;
    margin-left: 0px;
    margin-bottom: 0;
    vertical-align: top;
    font-size: 2em;
    color: rgb(255, 0, 157);
}
.form-control {
    display: block;
    width: 100%;
    height: 20px;
    padding: 10px 10px 10px 40px;
    font-size: 1rem;
    line-height: 1.5;
    color: #8898aa;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #cad1d7;
    border-radius: 0 .25rem .25rem 0;
    box-shadow: none;
    -webkit-transition: all .2s cubic-bezier(.68,-.55,.265,1.55);
    transition: all .2s cubic-bezier(.68,-.55,.265,1.55);
    padding-left: 50px;
    outline: none;
}
.input-group {
    position: relative;
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    align-items: center;
    width: 40%;
    margin-left: 620px;
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 20px;
}
.input-group-alternative {
    box-shadow: 0 1px 3px rgba(50, 50, 93, .15), 0 1px 0 rgba(0, 0, 0, .02);
    border: 0;
    -webkit-transition: box-shadow .15s ease;
    transition: box-shadow .15s ease;
}
.input-group-prepend {
    display: -webkit-box;
    display: flex;
    position: absolute;
    left: 0;
    height: 100%;
    margin-right: -1px;
    align-items: center;
}
.input-group-text {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #adb5bd;
    text-align: center;
    white-space: nowrap;
    background-color: #fff;
    border: 1px solid #cad1d7;
    border-right: none; /* ลบเส้นขอบขวาเพื่อให้แนบสนิทกับ input */
    border-radius: .25rem 0 0 .25rem; /* ทำให้ขอบโค้งด้านซ้าย */
    position: absolute;
    height: 96.2%;
    left: 0px;
}
.signup-form{
    width: 95%; /* ให้ form กว้างเกือบสุด */
    margin: 0 auto; /* จัดให้อยู่ตรงกลาง */
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: -120px;
    padding-bottom: 220px;
    display: flex;
    flex-direction: column;
}
.form-group {
    margin-bottom: 1rem;
}
.role-signup{
    margin-top: 180px;
    margin-bottom: 200px;
}
.radio-label {
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid gray;
  border-radius: 8px;
  margin: 5px;
  margin-top: -10px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 2em;
}

.radio-label input {
  display: none; /* ซ่อน input radio */
}

.radio-label.selected {
  background-color: blue;
  color: white;
  border-color: blue;
}

/* สีพื้นฐาน */
.default {
  background-color: white;
  color: black;
  border-color: gray;
}

/* สไตล์เมื่อเลือก "User" */
.selected-user {
  background-color: green;
  color: white;
  border-color: green;
}

/* สไตล์เมื่อเลือก "Admin" */
.selected-admin {
  background-color: red;
  color: white;
  border-color: red;
}

.signup-image {
    width: 100%; /* ทำให้ภาพอยู่ในพื้นที่ SignupLeftView */
    height: 100%;
    margin-right: 30px; /* เพิ่มช่องว่างระหว่างภาพและฟอร์ม */
    margin-top: -20px; /* ชิดขอบด้านบนของ Navbar */
    margin-left: 0; /* ทำให้ภาพชิดซ้ายสุด */
    object-fit: cover;
}

.SignupLeftView {
    display: flex;
    align-items: flex-start; /* จัดให้อยู่ด้านบนสุดของ container */
    justify-content: flex-start; /* ชิดซ้าย */
    top: 130px;
    left: 0; /* ติดขอบซ้าย */
    margin-top: -29px; /* ปรับให้ชิดกับ Navigation Bar */
    position: fixed;
    width: 30%; /* กำหนดขนาดให้ไม่เกิน card-body */
    height: 100vh;
    z-index: 1; /* อยู่ด้านล่าง Sign Up Title */
}

.SignUptemplate{
    border-radius: 5px;
    display: inline-flex;
    margin-left: -1200px;
    margin-top: 50px;
    padding: 10px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%; /* ปรับตำแหน่งตามต้องการ */
    background: rgba(255, 255, 255, 0.7); /* ใส่พื้นหลังโปร่งใสให้ตัวหนังสืออ่านง่าย */
    z-index: 2; /* ให้ตัวหนังสืออยู่หน้ารูป */
}
.shadow {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;
}
.text-center {
    margin-left: 0px;
    margin-top: -180px;
    margin-bottom: -200px;
    text-align: center;
}
.titleSignup{
    font-size: 3rem; /* ขนาดใหญ่ขึ้น */
    font-weight: bold;
    color: #ffc874; /* สีสันสดใส */
    position: absolute;
    text-transform: uppercase;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}
</style>

