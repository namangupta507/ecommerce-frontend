import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';


const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/ecommerce-frontend' element={<App/>}>
    <Route path='/' index='true' element={<HomeScreen/>}></Route>
    <Route path='/product/:_id' element={<ProductScreen/>}></Route>
  </Route>
));
root.render(
  <React.StrictMode>
   
    <RouterProvider router={router}>
    </RouterProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
