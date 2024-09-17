import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import UserServices from "../../services/UserServices";

export default function AddUsers(){

    const navigate = useNavigate();

    async function add(user){
        //console.log(user);
        const response = await UserServices.addUser(user);

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

    
        add({
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
            Adding new user

           <hr />
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="firstName" required />
                </Form.Group>
              
                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="lastName" required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="text" name="email" required />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required />
                </Form.Group>

                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" name="role" required />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="number" name="oib" required />
                </Form.Group>

                <Form.Group controlId="licenseNumber">
                    <Form.Label>License number</Form.Label>
                    <Form.Control type="number" name="licenseNumber" required />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.USER_VIEW}
                    className="btn btn-danger width">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Add new user
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}