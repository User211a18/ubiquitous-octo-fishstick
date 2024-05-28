import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
// import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Layout } from './layout/Menu/Layout';
import { Product } from './pages/Product/Product';
import { AuthLayout } from './layout/Auth/AuthLayout';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { PREFIX } from './helpers/API';
import axios from 'axios';
import { RequireAuth } from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { New } from './pages/new/new';

const Menu=lazy(() => import ('./pages/Menu/Menu'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>,
    children:[
      {
        path: '/',
        element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>,
      },
      // {
      //   path: '/cart',
      //   element: <Cart />
      // },
      {
        path: '/new',
        element: <New />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async({params}) => {
          return defer({
            data: new Promise((resolve, reject) => {
                    axios.get(`${PREFIX}/product/${params.id}`).then(data=>resolve(data)).catch(e => reject(e));
              })
          });

          // return defer({
          //   data: axios.get(`${PREFIX}/products/${params.id}`).then(data=>data)
          // });

        //   await new Promise<void>((resolve) => {
        //     setTimeout(() => {
        //         resolve();
        //     }, 2000);
        // });
        //   const {data} = await axios.get(`${PREFIX}/products/${params.id}`);
        //   return data;
        }
      },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      }, 
      {
        path: '/auth/profile',
        element: <Layout />
      }, 
      {
        path: '/auth/register',
        element: < Register />
      }
    ]
  },
  {
    path: '*',
    element: <Error/>
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
