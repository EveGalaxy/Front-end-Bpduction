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
                    <input placeholder="Name" type="text" class="form-control" fdprocessedid="kdzzh">
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
            <div class="text-center">
                <button type="button" class="btn btn-primary mt-4" fdprocessedid="9jl2er" @click="gotoLogin()">Sign Up</button>
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
    font-size: 2rem;
    width: 40%;
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
    justify-self: center;
    padding-top: 150px;
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
.signup-form{
    width: 95%; /* ให้ form กว้างเกือบสุด */
    margin: 0 auto; /* จัดให้อยู่ตรงกลาง */
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: -120px;
    padding-bottom: 220px;
}
.form-group {
    margin-bottom: 1rem;
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
    margin-left: 270px;
    text-align: center;
}
.titleSignup{
    color: rgb(0, 128, 28);
    font-size: 2rem;
}
</style>

<script>
export default{
    methods: {
        gotoLogin(){
            this.$router.replace('/login');
        }
    }
}
</script>
