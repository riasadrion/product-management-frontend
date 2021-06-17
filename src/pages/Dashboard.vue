<template>
    <div>
  <!-- Page Wrapper -->
    <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Nav />
                <div class="container-fluid">

                    <h1 class="h3 mb-4 text-gray-800">Dashboard</h1>

                </div>
            </div>
            <Footer />
        </div>
    </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Nav from '../components/Nav.vue';
import Footer from '../components/Footer.vue';
export default {
  components: { Sidebar, Nav, Footer },
    name: "Dashboard",
    data () {
        return {
            errors:'',
            user:''
        }
    },
    mounted(){
    },
    methods: {

    }

}
</script>

<style scoped>
</style>