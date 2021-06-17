<template>
    <div>
  <!-- Page Wrapper -->
    <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Nav />
                <div class="container-fluid">
                    <h1 class="h3 mb-4 text-gray-800">Products</h1>
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                            <div class="card-header bg-primary text-white">
                                <router-link class="btn btn-success text-white float-left" to="/add-new-product"><i class="fas fa-plus"></i> Add new</router-link>
                                <div class="input-group w-50 float-right">
                                    <input @keyup.enter="search" type="text" class="form-control" placeholder="Search" v-model="keyword">
                                    <div class="input-group-append">
                                        <button @click="search" class="btn btn-success text-white" type="button"><i class="fas fa-search"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Sub Category</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="product in products.data" :key="product.id">
                                        <td>
                                                {{ product.name }}
                                        </td>
                                        <td>
                                                {{ product.sub_category.name }}
                                        </td>
                                        <td>
                                                {{ product.sub_category.category.name }}
                                        </td>
                                        <td>
                                            <router-link :to="'/edit-product/'+product.id" class="btn"><i style="color: #47cad3cc" class="fas fa-edit"></i></router-link>
                                            <button @click="delete_product(product.id)" class="btn"><i style="color: #ff9d9d" class="fas fa-trash"></i></button>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <pagination class="float-right" :data="products" @pagination-change-page="get_products"></pagination>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    
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
    name: "Product",
    data () {
        return {
            errors:'',
            products: {},
            name: '',
            id: '',
            editing: false,
            keyword: ''
        }
    },
    mounted(){
        this.get_products();
    },
    methods: {
        search(){
            this.$token
            this.$http.post('/api/search',{
                keyword: this.keyword,
                type: 'product'
            })
            .then(res => {
                this.products = res.data;
            });
        },
         get_products(page = 1){
            this.$token
            this.$http.get('/api/products?page='+ page)
            .then(res => {
                this.products = res.data;
            });
        },
        store_or_update(){
            if(this.editing == true){
                this.$token
                this.$http.put('/api/categories/'+ this.id, {
                    name: this.name
                })
                .then(
                    this.name = null,
                    this.clear(),
                    this.get_categories()
                );
            }else{
                this.$token
                this.$http.post('/api/categories', {
                    name: this.name
                })
                .then(
                    this.clear(),
                    this.get_categories()
                );
            }
        },
        delete_product(id){
            if(confirm('Are you sure?')){
                this.$token
                this.$http.delete('/api/products/'+ id)
                .then(
                    this.clear(),
                    this.get_products()
                );
            }
        },
        edit(category){
            this.editing = true;
            this.id = category.id;
            this.name = category.name;
        },
        clear(){
            this.editing = false;
            this.id = null;
            this.name = null;
        }
    }

}
</script>

<style scoped>
table {
    background: #ffffff;
}
</style>