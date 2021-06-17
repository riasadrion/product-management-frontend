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
                        <div class="col-6">
                            <div class="card">
                            <div class="card-header bg-primary text-white">
                                Add Product
                            </div>
                            <div class="card-body">
                                <form v-on:submit.prevent="store">
                                    <Label>Select Category</Label>
                                    <select @change="get_sub_categories(category_id)" class="form-control mb-2" v-model="category_id">
                                        <option value="">Select Category</option>
                                        <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                                    </select>
                                    <Label>Select Sub Category</Label>
                                    <select class="form-control mb-2" v-model="sub_category_id">
                                        <option :value="subCategory.id" v-for="subCategory in subCategories" :key="subCategory.id">{{ subCategory.name }}</option>
                                    </select>
                                    <Label>Product Name</Label>
                                    <input type="text" v-model="name" required class="form-control mb-2">
                                    <div class="row mb-4">
                                        <div class="col-3">
                                            <a class="attach-file-button" @click="$refs.fileInput.click()"><i style="color: #ffffff;" class="fa fa-camera" aria-hidden="true"></i> <span style="font-weight: bold;
                                            color: gray; margin: 5px; position: relative">Add Images</span></a>
                                            <input hidden type="file" ref="fileInput" multiple="multiple" @change="onFileChange">
                                        </div>
                                    </div>
                                    <div class="row mb-4">
                                        <div v-show="images.length > 0" class="col-12 mt-2 row pt-2">
                                            <div class="col-2" v-for="(image, index) in images" :key="index">
                                                <img class="" :src="image" height="60" width="60" />
                                                <a class="preview-image-close" href="javascript:void(0);" @click="remove_image(index)" title="Remove">
                                                        <i class="fa fa-times" aria-hidden="true"></i>
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                    <button class="btn btn-success" type="submit">Publish</button>
                                </form>
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
            categories: {},
            subCategories: {},
            category_id: '',
            sub_category_id: '',
            name: '',
            images: [],
            imageNames: [],
        }
    },
    mounted(){
        this.get_categories();
    },
    methods: {
        onFileChange(event){
            for (let i = 0; i < event.target.files.length; i++) {
                let image =  event.target.files[i];
                let imageName = image.name;
                let reader = new FileReader();
                reader.onload = image => {
                this.images.push(image.target.result);
                this.imageNames.push(imageName);
                };
                reader.readAsDataURL(image);
            }
        },
        remove_image(index) {
            this.images.splice(index, 1);
        },
        get_categories(){
            this.$token
            this.$http.get('/api/get-categories')
            .then(res => {
                this.categories = res.data;
            });
        },
        get_sub_categories(category_id){
            this.$token
            this.$http.get('/api/get-sub-categories/'+ category_id)
            .then(res => {
                this.sub_category_id = res.data[0].id
                this.subCategories = res.data;
            });
        },
        store(){
            this.$token
            this.$http.post('/api/products', {
                name: this.name,
                images: this.images,
                sub_category_id: this.sub_category_id
            })
            .then(
               this.$router.push('/products')
            );
        },
    }

}
</script>

<style scoped>
table {
    background: #ffffff;
}
.attach-file-button>i{
    font-size: 18px;
    color: rgb(255 255 255);
    background: #a2a2a2;
    padding: 10px;
    border-radius: 50%;
}

.preview-image-close{
    position: relative;
    top: -29px;
    color: #ffffff;
    background: red;
    padding: 2px 7px;
    left: -9px;
    border-radius: 50%;
    opacity: 0.6;
}
</style>