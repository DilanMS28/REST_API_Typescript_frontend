import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import Products from './views/Products';
import {loader as productsLoader} from './views/Products';
import {action as deleteProductAction} from './components/ProductDetails';
import NewProduct, {action as newProductAction} from './views/NewProduct';
import EditProduct, {loader as EditProductLoader, action as editProductAction} from './views/EditProduct';

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <Layout />, 
        children: [
            {element: <Products />, index: true, loader: productsLoader}, //pagina principal
            {path: "productos/nuevo", element: <NewProduct />, action: newProductAction},//agregar nuevo producto
            {path: "productos/:id/editar", element: <EditProduct />, loader: EditProductLoader, action: editProductAction},//editar producto (ROA)
            {path: "productos/:id/eliminar", action: deleteProductAction},//eliminar producto
        ] 
    }
])
