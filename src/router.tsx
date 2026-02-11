import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import Products from './views/Products';
import {loader as productsLoader} from './views/Products';
import NewProduct, {action as newProductAction} from './views/NewProduct';

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <Layout />, 
        children: [
            {element: <Products />, index: true, loader: productsLoader}, //pagina principal
            {path: "productos/nuevo", element: <NewProduct />, action: newProductAction}//agregar nuevo producto
        ] 
    }
])
