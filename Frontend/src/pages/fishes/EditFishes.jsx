import { Button, Col, Container, Form, Row, Image, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constants";
import FishServices from "../../services/FishServices";
import { useCallback, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import moment from "moment";
import { FaCalendarAlt } from 'react-icons/fa';
import useLoading from "../../hooks/useLoading";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import defaultFishImage from '../../assets/defaultFish.png'; 

export default function EditFishes() {

    const navigate = useNavigate();
    const routeParams = useParams();
    const [fish, setFishes] = useState({});
    const [huntStart, setHuntStart] = useState(null);
    const [huntEnd, setHuntEnd] = useState(null);
    const { showLoading, hideLoading } = useLoading();
    const [errorMessage, setErrorMessage] = useState("");
    const [currentImage, setCurrentImage] = useState('');
    const [imageForCrop, setImageForCrop] = useState('');
    const [imageForServer, setImageForServer] = useState('');
    const cropperRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState(""); 

    const getFish = useCallback(async () => {
        showLoading();

        const response = await FishServices.getById(routeParams.id);
        if (response.error) {
            setErrorMessage(response.message);
            return;
        }
        setHuntStart(moment.utc(response.message.huntStart).toDate());
        setHuntEnd(moment.utc(response.message.huntEnd).toDate());
        setFishes(response.message);

        if(response.message.image != null){
            setCurrentImage(APP_URL + response.message.image + `?${Date.now()}`);
        } else {
            setCurrentImage(defaultFishImage);
        }

        hideLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeParams.id]);

    useEffect(() => {
        getFish();
    }, [getFish]);


    async function edit(fish) {
        showLoading();
        const response = await FishServices.editFish(routeParams.id, fish);
        hideLoading();
        if (response.error) {
            setErrorMessage(response.message);
            return;
        }
        navigate(RoutesNames.FISH_VIEW);
    }

    function doSubmit(e) {
        e.preventDefault();
        const results = new FormData(e.target);

        if (!huntStart) {
            setErrorMessage("Please select hunt start date!");
            return;
        }

        if (!huntEnd) {
            setErrorMessage("Please select hunt end date!");
            return;
        }
        
        if (moment(huntStart).isAfter(moment(huntEnd))) {
            setErrorMessage("Hunt start date cannot be greater than hunt end date!");
            return;
        }

        edit({
            name: results.get('name'),
            huntStart: moment(huntStart).format('YYYY-MM-DD'),
            huntEnd: moment(huntEnd).format('YYYY-MM-DD'),
            description: results.get('description')
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
    
        const response = await FishServices.setImage(routeParams.id, {Base64: base64.replace('data:image/png;base64,', '')});
        
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
            <h2>Edit fish</h2>
            <hr />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Fish name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        required
                        defaultValue={fish.name}
                    />
                </Form.Group>

                <Form.Group controlId="huntStart">
                    <Form.Label>Hunt start</Form.Label>
                    <div className="input-container">
                        <DatePicker
                            selected={huntStart}
                            onChange={date => setHuntStart(date)}
                            dateFormat="dd.MM.yyyy"
                            className="form-control date-input"
                            placeholderText="Select date"
                        />
                        <FaCalendarAlt className="calendar-icon" />
                    </div>
                </Form.Group>

                <Form.Group controlId="huntEnd">
                    <Form.Label>Hunt end</Form.Label>
                    <div className="input-container">
                        <DatePicker
                            selected={huntEnd}
                            onChange={date => setHuntEnd(date)}
                            dateFormat="dd.MM.yyyy"
                            className="form-control date-input" 
                            placeholderText="Select date"
                        />
                        <FaCalendarAlt className="calendar-icon" />
                    </div>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        required
                        defaultValue={fish.description}
                    />
                </Form.Group>

                <br></br>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <br></br>

                <Row className="mb-4">
                  <Col sm={6} md={6} lg={6}>
                    <p className="form-label">Current fish image</p>
                    <Image
                      src={currentImage}
                      className="avatar"
                    />
                  </Col>

                  <Col sm={6} md={6} lg={6}>
                    <p className="form-label">New fish image</p>
                    <Image
                      src={imageForServer || imageForCrop || defaultFishImage}
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
                        Set fish image
                        </Button>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col xs={6} sm={6} md={3} lg={6}>
                      <Link to={RoutesNames.FISH_VIEW} className="btn btn-danger width">
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
                        Set fish image
                        </Button>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col xs={6} sm={6} md={3} lg={6}>
                        <Link to={RoutesNames.FISH_VIEW} className="btn btn-danger width">
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