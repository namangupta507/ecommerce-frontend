import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import products from '../products';
import axios from 'axios';
import Rating from '../components/Rating';
import { Alert } from 'react-bootstrap';


import { Button, Card, Col, ListGroup,Row,Image } from 'react-bootstrap';

const ProductScreen = () => {
    const [message, setMessage] = useState('');

    const [showAlert, setShowAlert] = useState(false);

    const [quantity, setQuantity] = useState(1); 
 
    const [product,setProduct]=useState({})
      // const product=products.find((p)=>p._id===id);
    const {_id} =useParams();
  
    useEffect(()=>{
        const fetchProduct=async ()=>{
            const {data}=await axios.get(`/api/product/${_id}`)
            setProduct(data);
        };
        fetchProduct()
    },[_id])
    const addToCart = async () => {
        try {
          const response = await axios.post('/api/addProduct', { product,quantity });
          console.log('Product added to cart:', response.data);
          setMessage(response.data.message);
          setShowAlert(true);
        } catch (error) {
          console.error('Error adding product to cart:', error.message);
        }
        
      };
      const handleIncrement = () => {
        setQuantity(quantity + 1);
      };
    
      const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };
  return (
    <>
    
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
        
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price:${product.price}
                </ListGroup.Item>
               <ListGroup.Item>
                Description:{product.description}
               </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <Row>
                        <Col>
                        Price
                        </Col>
                        <Col>
                        <strong>${product.price}</strong> 
                        </Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Status
                            </Col>
                            <Col>
                            <strong>{product.countInStock > 0 ? 'In Stock':'Out Of Stock'}</strong> 
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    {showAlert && (
                            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            {message}
                            </Alert>
                        )}
                        {/* Your product screen JSX */}
                        <div className="d-flex align-items-center mb-3">
                            <Button variant="outline-primary" onClick={handleDecrement}>-</Button>
                            <span className="mx-2">{quantity}</span>
                            <Button variant="outline-primary" onClick={handleIncrement}>+</Button>
                        </div>
                        <Button onClick={() => addToCart({product,quantity})} disabled={showAlert}>Add to Cart</Button>
                        
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default ProductScreen