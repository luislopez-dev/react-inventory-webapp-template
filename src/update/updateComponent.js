/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { getProduct, updateProduct } from "../services/productsService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Update(){
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getData(){
     const request = await getProduct(id);
     setProduct(request.data)
    }
    getData();
  }, [id])

  async function handleSubmit (e){
    e.preventDefault();
    await updateProduct(product._id, product.name, product.brand, product.manufacturer, product.price, product.description, product.ammount, product.imgURL); 
    window.location.href = "/";
  }

  return (
  <Container>
   <Row className="g-5 mt-4 mb-4">

    <h2>{product.name}</h2>

    <Col sm={6}>
     <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-2">
       <Form.Label>Name</Form.Label>
       <Form.Control value={product.name || ""} onChange={(e)=>{setProduct({...product, name:e.target.value})}} required placeholder="Name"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-2">
       <Form.Label>Price</Form.Label>
       <Form.Control value={product.price || 0} onChange={(e)=>{setProduct({...product, price:e.target.value})}} required placeholder="Price" type="number"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-2">
       <Form.Label>Brand</Form.Label>
       <Form.Control value={product.brand || ""} onChange={(e)=>{setProduct({...product, brand:e.target.value})}} required placeholder="Brand" type="text"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-2">
       <Form.Label>Manufacturer</Form.Label>
       <Form.Control value={product.manufacturer || ""} onChange={(e)=>{setProduct({...product, manufacturer:e.target.value})}} required placeholder="Manufacturer" type="text"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-2">
       <Form.Label>Description</Form.Label>
       <Form.Control as="textarea" rows={3} value={product.description || ""} onChange={(e)=>{setProduct({...product, description:e.target.value})}}  placeholder="Description" required></Form.Control>
      </Form.Group>

      <Form.Group className="mb-2">
       <Form.Label>Ammount available</Form.Label>
       <Form.Control value={product.ammount || 0} onChange={(e)=>{setProduct({...product, ammount:e.target.value})}} placeholder="Available" required type="number"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-2">
       <Form.Label>Image link</Form.Label>
       <Form.Control value={product.imgURL || ""} onChange={(e)=>{setProduct({...product, imgURL:e.target.value})}} placeholder="IMG Link" required></Form.Control>
      </Form.Group>

      <Button className="mt-2" type="submit" variant="primary">Update</Button>

     </Form>
    </Col>

    <Col sm={6}>
     <Image fluid src={product.imgURL || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}></Image>
    </Col>

   </Row>
  </Container>
  );
}
export default Update;