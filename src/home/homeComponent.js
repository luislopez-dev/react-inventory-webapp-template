/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import { useEffect, useState } from "react";
import { queryItem, getProducts, deleteProduct } from "../services/productsService";
import { Button, Row, Table, Container, Modal, Image, Pagination, Form, FormControl, InputGroup} from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Home(){
  
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0)
  const [itemToDelete, setItemToDelete] = useState({});

  const query = new URLSearchParams(useLocation().search);
  const active_page = Number(query.get("page")) || 1;
  const products_quantity = 10;
  const offset = (active_page  - 1) * products_quantity;
  const limit = products_quantity;
  const search = query.get("search") || "";

  const handleClose = (id) => { setShow(false); if(id){ deleteProduct(id); setProducts(products.filter(item => item._id !== id)); }};
  const handleShow = (obj) => {setShow(true); setItemToDelete(obj);}

  useEffect( () => {
    if(!search && !active_page){ return;}
    if(search){
      async function getData(){
        const request = await queryItem(search, offset, limit);
        setProducts(request.products);
        setProductsTotal(request.total);
      }
      getData();
    }
     else{
      async function getData(){
       const request = await getProducts(offset, limit);
       setProducts(request.products);
       setProductsTotal(request.total);
      }
      getData();
    }
  }, [search, active_page, offset, limit]);

  let items = [];
  for (let number = 1; number <= Math.ceil(productsTotal / products_quantity); number++) {
    items.push(
      <Pagination.Item href={search?`/home?page=${number}&search=${search}`:`/home?page=${number}`} 
                       key={number} active={number === active_page}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
  <Container>
    <Row className="g-5 mt-5">

     <Form action="/home">
      <InputGroup className="mb-3" style={{width:"300px"}}>
       <InputGroup.Text id="btnGroupAddon">
        <i className='fas fa-search'></i>
       </InputGroup.Text>
       <FormControl
         type="search"
         placeholder="search"
         aria-label="search"
         aria-describedby="btnGroupAddon"
         name="search"
         autoComplete="false"
       />
      </InputGroup>
     </Form>

     <Table striped bordered hover style={{textAlign: "center"}}>
      <thead>
       <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Available</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
       </tr>
      </thead>

      <tbody>
       {products.map( (item, i) => { return (
        <tr key={i} className="overflow-hidden">
         <td><Image src={item.imgURL} rounded style={{width:'100px'}}/></td>
         <td >{item.name}</td>
         <td>${item.price}</td>
         <td>{item.ammount}</td>
         <td className="overflow-hidden">
          <div style={{"height":"100px", "overflow":"hidden", textAlign: "justify" }}>{item.description}</div>
         </td>
         <td>
          <Button variant="warning" href={"/update/"+item._id}>
           <i className='fas fa-edit'></i>
          </Button>
         </td>
         <td>
          <Button variant="danger" onClick={() => handleShow(item)}>
           <i className='fas fa-trash-alt'></i>
          </Button>
         </td>
        </tr>
        )})
       }
      </tbody>
     </Table>

     <Pagination className="justify-content-center">{items}</Pagination>

     <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
         <Modal.Title>Delete</Modal.Title>
       </Modal.Header>
       <Modal.Body style={{textAlign: "center"}}>
        
        <Image src={itemToDelete.imgURL} rounded style={{width:'100px'}}/> 
        <br/>
        {itemToDelete.name}                           
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Cancel
         </Button>
         <Button variant="danger" onClick={()=> handleClose(itemToDelete._id)} >
           Delete
         </Button>
       </Modal.Footer>
     </Modal>

    </Row>
  </Container>
  )   
}
export default Home;