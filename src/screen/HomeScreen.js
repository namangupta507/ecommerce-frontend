import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
// import products from '../products'
import axios from 'axios';
import Product from '../components/Product'

const HomeScreen = () => {
  const [products,setProducts]=useState([]);
  
  useEffect(()=>{
    const fetchProducts=async () => {
      const {data}=await axios.get('https://ecommerce-backend1-ov67.onrender.com/api/products');
      console.log(data)
      setProducts(data);
    };
    fetchProducts();
  },[]);

  return (
    <>
    <h1>Latest Products</h1>
    <Row>
          {products.map((product)=>(
            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
               <Product product={product}/>
                </Col>
        ))}
    </Row>
    </>
  )
}

export default HomeScreen
