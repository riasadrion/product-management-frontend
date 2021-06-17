<template>
    <div>
  <!-- Page Wrapper -->
    <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Nav />
                <div class="container-fluid">
                    <h1 class="h3 mb-4 text-gray-800">Sub Categories</h1>
                    <div class="row">
                        <div class="col-8">
                            <div class="card">
                            <div class="card-header bg-primary text-white">
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
                                            <th scope="col">Category</th>
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="subCategory in subCategories.data" :key="subCategory.id">
                                        <td>
                                                {{ subCategory.name }}
                                        </td>
                                        <td>
                                                {{ subCategory.category.name }}
                                        </td>
                                        <td>
                                            <button @click="edit(subCategory)" class="btn"><i style="color: #47cad3cc" class="fas fa-edit"></i></button>
                                            <button @click="delete_category(subCategory.id)" class="btn"><i style="color: #ff9d9d" class="fas fa-trash"></i></button>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <pagination class="float-right" :data="subCategories" @pagination-change-page="get_sub_categories"></pagination>
                            </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card">
                                <div class="card-header bg-primary text-white">
                                   <span v-if="editing == true"> Update</span>
                                   <span v-else> Add New</span>
                                </div>
                                <div class="card-body">
                                    <input class="form-control mb-2" type="text" v-model="name" required>
                                    <select class="form-control mb-2" v-model="category_id" id="" required>
                                        <option value="">Select Category</option>
                                        <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                                    </select>
                                    <button @click="store_or_update" class="btn btn-sm btn-success mr-2">Save</button>
                                    <button v-show="editing == true" @click="clear" class="btn btn-sm btn-warning">Cancel</button>
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
    name: "Category",
    data () {
        return {
            errors:'',
            categories:{},
            subCategories:{},
            category_id: '',
            name: '',
            id: '',
            editing: false,
            keyword: ''
        }
    },
    mounted(){
        this.get_sub_categories();
    },
    methods: {
         search(){
            this.$token
            this.$http.post('/api/search',{
                keyword: this.keyword,
                type: 'subCategory'
            })
            .then(res => {
                this.subCategories = res.data.subCategories;
            });
        },
        get_sub_categories(page = 1){
            this.$token
            this.$http.get('/api/sub-categories?page='+ page)
            .then(res => {
                this.subCategories = res.data.subCategories;
                this.categories = res.data.categories;
            });
        },
        store_or_update(){
            if(this.editing == true){
                this.$token
                this.$http.put('/api/sub-categories/'+ this.id, {
                    name: this.name,
                    category_id: this.category_id
                })
                .then(
                    this.name = null,
                    this.clear(),
                    this.get_sub_categories()
                );
            }else{
                this.$token
                this.$http.post('/api/sub-categories', {
                    name: this.name,
                    category_id: this.category_id
                })
                .then(
                    this.clear(),
                    this.get_sub_categories()
                );
            }
        },
        delete_category(id){
            if(confirm('Are you sure?')){
                this.$token
                this.$http.delete('/api/sub-categories/'+ id)
                .then(
                    this.clear(),
                    this.get_sub_categories()
                );
            }
        },
        edit(subCategory){
            this.editing = true;
            this.id = subCategory.id;
            this.category_id = subCategory.category_id;
            this.name = subCategory.name;
        },
        clear(){
            this.editing = false;
            this.id = null;
            this.name = null;
             this.category_id = '';
        }
    }

}
</script>

<style scoped>
table {
    background: #ffffff;
}
</style>