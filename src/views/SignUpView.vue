<template>
    <div class="SignUptemplate">
        <h2 class="titleSignup">Sign Up</h2>
    </div><br>
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
                    <input placeholder="Username" type="text" class="form-control" fdprocessedid="kdzzh">
                </div>
            </div>
            <div class="form-group mb-3">
                <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fa fa-envelope">
                            </i>
                        </span>
                    </div>
                    <input placeholder="Email" type="email" class="form-control" fdprocessedid="j5d95">
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
                    <input placeholder="Password" type="password" class="form-control" fdprocessedid="abdeln">
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
                <button type="button" class="btn-primary mt-4" fdprocessedid="9jl2er" @click="gotoLogin()">Sign Up</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.border-0 {
    border: 0 !important;
}
.bg-secondary {
    background-color: #6c757d !important;
}
.btn-primary, .btn-primary:hover {
    color: #fff;
    background-color: #5e72e4;
    border-color: #5e72e4;
    position: relative;
    text-transform: uppercase;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
    will-change: transform;
    letter-spacing: .025em;
    font-size: 1.5rem;
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
}
.custom-control{
    margin-top: 150px;
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
    height: calc(2.75rem + 2px);
    padding: .625rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #8898aa;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #cad1d7;
    border-radius: .25rem;
    box-shadow: none;
    -webkit-transition: all .2s cubic-bezier(.68,-.55,.265,1.55);
    transition: all .2s cubic-bezier(.68,-.55,.265,1.55);
}
.input-group {
    position: relative;
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    align-items: stretch;
    width: 40%;
    margin-left: 600px;
}
.input-group-alternative {
    box-shadow: 0 1px 3px rgba(50, 50, 93, .15), 0 1px 0 rgba(0, 0, 0, .02);
    border: 0;
    -webkit-transition: box-shadow .15s ease;
    transition: box-shadow .15s ease;
}
.input-group-append, .input-group-prepend {
    display: -webkit-box;
    display: flex;
    margin-right: -1px;
}
.input-group-text {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: .625rem .75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #adb5bd;
    text-align: center;
    white-space: nowrap;
    background-color: #fff;
    border: 1px solid #cad1d7;
    border-radius: .25rem;
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

.SignUptemplate{
    display: inline-flex;
    margin-left: -1200px;
    margin-top: 50px;
    padding: 2px;
    position: flex;
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
    color: rgb(0, 128, 28);
    font-size: 1.5rem;
}
</style>

<script>
export default{
    data() {
        return {
            selectedOption: "",
            options: [
                { value: "user", label: "User" },
                { value: "admin", label: "Admin" }
            ]
        };
    },
    methods: {
        gotoLogin(){
            this.$router.replace('/login');
        }
    }
}
</script>
