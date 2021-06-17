<template>
    <div>
        <div class="main container">
            <div class="row justify-content-md-center center-align">
                <div class="col-6 shadow">
                    <div class="row">
                        <div class="col-4 login-left d-flex align-items-center">
                            <img class="" src="../assets/rocket-launch.png">
                        </div>
                        <div class="col-6 p-4">
                            <h4><i class="bi bi-box-arrow-in-right"></i> Login</h4>
                                <form @submit.prevent="login" class="mt-4">
                                    <div class="form-group mb-3">
                                        <input type="text" class="form-control" v-model="email" placeholder="Email">
                                    </div>
                                    <div class="form-group mb-2">
                                        <input type="password" class="form-control" v-model="password" placeholder="Password">
                                    </div>
                                    <input type="submit" class="btn btn-primary btn-sm mt-2" value="Login">
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data () {
        return {
            email: 'admin@gmail.com',
            password: 'admin123',
            errors:''
        }
    },
    methods: {
        login(){
            this.$http.post('/api/login',{
                email: this.email,
                password: this.password
            })
            .then(res => {
                localStorage.setItem('user', res.data.user);
                localStorage.setItem('accessToken', res.data.token);
                this.$router.push('/dashboard');
            });

        }
    }

}
</script>

<style scoped>
.main{
    height: 100vh;
}
.login-left{
    background: #0d6efd
}
.login-left>img{
   margin-left: 12%;
}
.center-align{
    margin-top: 30vh;
}
</style>