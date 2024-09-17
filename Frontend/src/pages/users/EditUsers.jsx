import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserServices from "../../services/UserServices";
import { useEffect, useState } from "react";

export default function EditUsers(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [users,setUsers] = useState({});

    async function getUser(){
        const response = await UserServices.getById(routeParams.id);
        if(response.error){
            alert(response.message);
            return;
        }
        setUsers(response.message);
    }

    useEffect(()=>{
        getUser();
    },[]);

    async function edit(user){
        const response = await UserServices.editUser(routeParams.id, user);
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RoutesNames.USER_VIEW);
    }

    function doSubmit(e){
        e.preventDefault();

        const results = new FormData(e.target);

        const oib = results.get('oib');
        if (oib.length !== 11 || isNaN(oib)) {
            alert('OIB must have 11 digits!');
            return;
        }
    
    
        const licenseNumber = results.get('licenseNumber');
        if (licenseNumber.length !== 6 || isNaN(licenseNumber)) {
            alert('License number must have 6 digits!');
            return;
        }

        //ako je number ide parseInt(obicni broj) cijena je parseFloat(decimalni)

        //ako je date moment.utc(results.get('date'))

        //ako je boolean onda ide results.get('boolean')=='on' ? true : false

    
        edit({
            firstName: results.get('firstName'),
            lastName: results.get('lastName'),
            email: results.get('email'),
            password: results.get('password'),
            role: results.get('role'),
            oib: results.get('oib'),
            licenseNumber: results.get('licenseNumber')
        });

    }

    return(
        <Container>
            Edit user
           <hr />
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="firstName" required  
                    defaultValue={users.firstName}/>
                </Form.Group>
              
                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="lastName" required 
                    defaultValue={users.lastName}/>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="text" name="email" required 
                    defaultValue={users.email}/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required 
                    defaultValue={users.password}/>
                </Form.Group>

                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" name="role" required 
                    defaultValue={users.role}/>
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="number" name="oib" required 
                    defaultValue={users.oib}/>
                </Form.Group>

                <Form.Group controlId="licenseNumber">
                    <Form.Label>License number</Form.Label>
                    <Form.Control type="number" name="licenseNumber" required 
                    defaultValue={users.licenseNumber}/>
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.USER_VIEW}
                    className="btn btn-danger width">
                        Cancel
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                       Save changes
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}