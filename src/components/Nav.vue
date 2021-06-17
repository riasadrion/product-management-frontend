<template>
    <div>         
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <ul class="navbar-nav ml-auto">

            <div class="topbar-divider d-none d-sm-block"></div>
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link" href="javascript:void(0)">
                    <button class="btn btn-warning btn-sm" @click="logout">Logout</button>
                </a>
            </li>
        </ul>
    </nav>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data(){
            return {
            }
        },
        mounted(){
        },
        methods: {
            logout(){
                this.$http.post('/api/logout')
                .then(
                this.$router.push('/')
                );
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>