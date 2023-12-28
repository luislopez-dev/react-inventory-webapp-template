/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { useState } from "react";
import { createProduct } from "../services/productsService";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Create(){
  const [product, setProduct] = useState({});

  async function handleSubmit (e){
    e.preventDefault();
    await createProduct(product.name, product.brand, product.manufacturer, 
                        product.price, product.description, product.ammount, 
                        product.imgURL);                    
    window.location.href = "/";
  }

  return (
  <Container>
  <Row className="g-5 mt-5">

  <h2>New Product</h2>

  <Form onSubmit={handleSubmit}>

   <Row>
    <Form.Group as={Col} className="mb-2">
     <Form.Label>Name</Form.Label>
     <Form.Control onChange={(e)=>{setProduct({...product, name:e.target.value})}} required placeholder="Name"></Form.Control>
    </Form.Group>

    <Form.Group as={Col} className="mb-2">
     <Form.Label>Price</Form.Label>
     <Form.Control onChange={(e)=>{setProduct({...product, price:e.target.value})}} required placeholder="Price" type="number" step=".01" min="0.1" max="1000"></Form.Control>
    </Form.Group>
   </Row>
 
   <Row>
    <Form.Group as={Col} className="mb-2">
     <Form.Label>Brand</Form.Label>
     <Form.Control onChange={(e)=>{setProduct({...product, brand:e.target.value})}} required placeholder="Brand"></Form.Control>
    </Form.Group>

    <Form.Group as={Col} className="mb-2">
     <Form.Label>Manufacturer</Form.Label>
     <Form.Control onChange={(e)=>{setProduct({...product, manufacturer:e.target.value})}} required placeholder="Manufacturer"></Form.Control>
    </Form.Group>
   </Row>  

   <Row>
    <Form.Group as={Col} className="mb-2">
     <Form.Label>Ammount available</Form.Label>
     <Form.Control onChange={(e)=>{setProduct({...product, ammount:e.target.value})}} placeholder="Available" required type="number"></Form.Control>
    </Form.Group>

    <Form.Group as={Col} className="mb-2">
     <Form.Label>Image link</Form.Label>
     <Form.Control onChange={(e)=>{setProduct({...product, imgURL:e.target.value})}} placeholder="IMG Link" required></Form.Control>
    </Form.Group>
   </Row>

   <Form.Group className="mb-2">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={4} onChange={(e)=>{setProduct({...product, description:e.target.value})}}  placeholder="Description" required></Form.Control>
   </Form.Group>

  
   <Button className="mt-2" type="submit" variant="primary">Create</Button>
  </Form>

  </Row>
  </Container> 
  )}
export default Create;