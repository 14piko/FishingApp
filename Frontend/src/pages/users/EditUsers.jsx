import { Button, Col, Container, Form, Row, Alert, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constants";
import UserServices from "../../services/UserServices";
import { useCallback, useEffect, useState, useRef } from "react";
import useLoading from "../../hooks/useLoading";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import defaultUserImage from '../../assets/defaultUser.png'; 


export default function EditUsers() {

    const navigate = useNavigate();
    const routeParams = useParams();
    const [users, setUsers] = useState({});
    const [errorMessage, setErrorMessage] = useState(""); 
    const [successMessage, setSuccessMessage] = useState(""); 
    const { showLoading, hideLoading } = useLoading(); 
    const [currentImage, setCurrentImage] = useState('');
    const [imageForCrop, setImageForCrop] = useState('');
    const [imageForServer, setImageForServer] = useState('');
    const cropperRef = useRef(null);
    const [role, setRole] = useState('');

    const getUser = useCallback(async () => {
        showLoading();
    
        const response = await UserServices.getById(routeParams.id);
        if (response.error) {
            setErrorMessage(response.message); 
            return;
        }
        setUsers(response.message);

        if(response.message.image != null){
            setCurrentImage(APP_URL + response.message.image + `?${Date.now()}`);
        } else {
            setCurrentImage(defaultUserImage);
        }
          

        hideLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeParams.id]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    async function edit(user) {
        showLoading();
        try {
            const response = await UserServices.editUser(routeParams.id, user);
            if (response.error) {
                setErrorMessage(response.message); 
                return;
            }
            navigate(RoutesNames.USER_VIEW);
        } catch (error) {
            if(error.response.data.message === 'Invalid OIB.') {
                setErrorMessage("Invalid OIB.");
            } else if(error.response.status === 409) {
                setErrorMessage("Another user with this OIB already exists.");
            } else {
                setErrorMessage("An unexpected error occurred while updating the user.");
            }
        }
        hideLoading();
    }

    useEffect(() => {
      if (users.role) {
          setRole(users.role); 
      }
    }, [users]);

    const handleRoleChange = (e) => {
        setRole(e.target.value); 
    };

    function doSubmit(e) {
        e.preventDefault();
        setErrorMessage("");  
    
        const results = new FormData(e.target);
    
        const oib = results.get('oib');
        if (oib.length !== 11 || isNaN(oib)) {
            setErrorMessage('OIB must have 11 digits!');
            return;
        }
    
        const licenseNumber = results.get('licenseNumber');
        if (licenseNumber.length !== 6 || isNaN(licenseNumber)) {
            setErrorMessage('License number must have 6 digits!');
            return;
        }
    
        const password = results.get('password');
        const repeatPassword = results.get('repeatPassword');
    
        if (password && password !== repeatPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const email = users.email === 'admin@edunova.hr' ? 'admin@edunova.hr' : results.get('email');
        
        edit({
            firstName: results.get('firstName'),
            lastName: results.get('lastName'),
            email: email,
            password: password,
            role: results.get('role'),
            oib: results.get('oib'),
            licenseNumber: results.get('licenseNumber')
        });

    }

    function onCrop() {
        setImageForServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      }
      function onChangeImage(e) {
        e.preventDefault();
    
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImageForCrop(reader.result);
        };
        try {
          reader.readAsDataURL(files[0]);
        } catch (error) {
          console.error(error);
        }
      }
    
      async function saveImage() {
        showLoading();
        const base64 = imageForServer;
    
        const response = await UserServices.setImage(routeParams.id, {Base64: base64.replace('data:image/png;base64,', '')});
        
        if(!response.ok){
          hideLoading();
          setSuccessMessage('Successfully uploaded image!')
        }

        setCurrentImage(imageForServer);
        hideLoading();
      }    

    return (
        <Container>
            <br></br>
            <h2>Edit user</h2>
            <hr />

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        required
                        defaultValue={users.firstName}
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        required
                        defaultValue={users.lastName}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        required
                        defaultValue={users.email} 
                        disabled={users.email === 'admin@edunova.hr'} 
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        defaultValue=""
                    />
                </Form.Group>

                <Form.Group controlId="repeatPassword">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control
                        type="password"
                        name="repeatPassword"
                        defaultValue="" 
                    />
                </Form.Group>
              
                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control 
                      as="select" 
                      name='role' 
                      value={role} 
                      onChange={handleRoleChange} 
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control
                        type="number"
                        name="oib"
                        required
                        defaultValue={users.oib}
                    />
                </Form.Group>

                <Form.Group controlId="licenseNumber">
                    <Form.Label>License number</Form.Label>
                    <Form.Control
                        type="number"
                        name="licenseNumber"
                        required
                        defaultValue={users.licenseNumber}
                    />
                </Form.Group>

                <br></br>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <br></br>

                <Row className="mb-4">
                  <Col sm={6} md={6} lg={6}>
                    <p className="form-label">Current avatar</p>
                    <Image
                      src={currentImage}
                      className="avatar"
                    />
                  </Col>

                  <Col sm={6} md={6} lg={6}>
                    <p className="form-label">New avatar</p>
                    <Image
                      src={imageForServer || imageForCrop || defaultUserImage}
                      className="avatar"
                    />
                  </Col>
                </Row>

                {!imageForCrop && !imageForServer && (
                  <>
                  <Row className="mb-3">
                      <Col xs={6} sm={6} md={3} lg={6}>
                          <input className="mb-3" type="file" onChange={onChangeImage} />
                      </Col>
                      <Col xs={6} sm={6} md={3} lg={6}>
                          <Button variant="success" disabled={!imageForServer} onClick={saveImage} className="width center">
                          Set avatar
                          </Button>
                      </Col>
                  </Row>
                
                  <Row className="mb-3">
                    <Col xs={6} sm={6} md={3} lg={6}>
                      <Link to={RoutesNames.USER_VIEW} className="btn btn-danger width">
                        Cancel
                      </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6}>
                      <Button variant="primary" type="submit" className="width">
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                  </>
                )}

                {imageForCrop && (
                  <>
                    <Row className="mb-4">
                      <Col>
                        <Cropper
                          src={imageForCrop}
                          style={{ height: 300, width: '100%' }}
                          initialAspectRatio={1}
                          guides={true}
                          viewMode={1}
                          minCropBoxWidth={50}
                          minCropBoxHeight={50}
                          cropBoxResizable={false}
                          background={false}
                          responsive={true}
                          checkOrientation={false}
                          cropstart={onCrop}
                          cropend={onCrop}
                          ref={cropperRef}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={6} sm={6} md={3} lg={6}>
                        <input className="mb-3" type="file" onChange={onChangeImage} />
                        </Col>
                        <Col xs={6} sm={6} md={3} lg={6}>
                        <Button variant="success" disabled={!imageForServer} onClick={saveImage} className="width center">
                        Set avatar
                        </Button>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col xs={6} sm={6} md={3} lg={6}>
                        <Link to={RoutesNames.USER_VIEW} className="btn btn-danger width">
                          Cancel
                        </Link>
                      </Col>
                      <Col xs={6} sm={6} md={9} lg={6}>
                        <Button variant="primary" type="submit" className="width">
                          Save changes
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}

            </Form>
        </Container>
    );
}
