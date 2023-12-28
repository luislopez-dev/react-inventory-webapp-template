/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { Form, Button, Container, Row, Image, Col } from "react-bootstrap";
import { register } from '../services/authService';
import { useState } from "react";

function Register(){

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    await register(email, password, name);
    window.location.href = "/";
  }
  
  return (
  <Container>
   <Row className='mt-5 mb-5'>
    <h1 className='mt-5 mb-5'>Register</h1>

    <Col sm={6}>
     <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
       <Form.Label>Name</Form.Label>
       <Form.Control required type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />                 
      </Form.Group>

      <Form.Group className="mb-3">
       <Form.Label>Email address</Form.Label>
       <Form.Control required type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />                 
      </Form.Group>

      <Form.Group className="mb-3">
       <Form.Label>Password</Form.Label>
       <Form.Control required type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
       <Form.Label>Confirm password</Form.Label>
       <Form.Control required type="password" placeholder="password"/>
      </Form.Group>

      <Button variant="primary" type="submit">
       Submit
      </Button>

     </Form>
    </Col>

    <Col sm={6}>
     <Image fluid src="https://static.vecteezy.com/system/resources/previews/002/038/669/non_2x/data-analysis-concept-vector.jpg" />
    </Col>
        
   </Row>
  </Container>
  )
}
export default Register;