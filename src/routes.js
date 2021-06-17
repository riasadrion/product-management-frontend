import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Category from './pages/Category';
import Product from './pages/Product';
import NewProduct from './pages/NewProduct';
import EditProduct from './pages/EditProduct';
import SubCategory from './pages/SubCategory';


export default [{
        path: '/',
        component: Login
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/categories',
        component: Category
    },
    {
        path: '/sub-categories',
        component: SubCategory
    },
    {
        path: '/products',
        component: Product
    },
    {
        path: '/add-new-product',
        component: NewProduct
    },
    {
        path: '/edit-product/:id',
        component: EditProduct
    },
]