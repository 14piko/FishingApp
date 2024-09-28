import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/FishingServices';
import UserService from '../../services/UserServices';
import FishService from '../../services/FishServices';
import RiverService from '../../services/RiverServices';
import { RoutesNames } from '../../constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FaCalendarAlt } from 'react-icons/fa';

export default function AddFishings() {

  const navigate = useNavigate();

  const [users, setUsers,] = useState([]);

  const [userId, setUserId] = useState(0);

  const [fishes, setFishes] = useState([]);

  const [fishId, setFishId] = useState(0);

  const [rivers, setRivers] = useState([]);

  const [riverId, setRiverId] = useState(0);

  const [dateHunt, setDateHunt] = useState(null);


  async function getUsers(){
    const response = await UserService.get();
    setUsers(response);
    setUserId(response[0].id);
  }
  useEffect(()=>{
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function getFishes(){
    const response = await FishService.get();
    setFishes(response);
    setFishId(response[0].id);
  }
  useEffect(()=>{
    getFishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function getRivers(){
    const response = await RiverService.get();
    setRivers(response);
    setRiverId(response[0].id);
  }
  useEffect(()=>{
    getRivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  
  async function add(e) {
    const response = await Service.addFishing(e);
    if(response.error){
      alert(response.message);
      return;
    }
    navigate(RoutesNames.FISHING_VIEW);
  }


  function doSubmit(e) {
    e.preventDefault();
    const results = new FormData(e.target);

    add({
      date: moment(dateHunt).format('YYYY-MM-DD'),
      userId: parseInt(userId),
      fishId: parseInt(fishId),
      riverId: parseInt(riverId),
      quantity: results.get('quantity'),
      weight: results.get('weight')
    });
  }


  return (
      <Container>
     <h2>Add fishing</h2>
     <hr />
      
      <Form onSubmit={doSubmit}>
          <Form.Group controlId="huntStart">
            <Form.Label>Date of catch</Form.Label>
            <div className="input-container">
                <DatePicker
                    selected={dateHunt}
                    onChange={date => setDateHunt(date)}
                    dateFormat="dd.MM.yyyy"
                    className="form-control date-input"
                    placeholderText="Select date"
                />
                <FaCalendarAlt className="calendar-icon" />
            </div>
          </Form.Group>

          <Form.Group className='mb-3' controlId='user'>
            <Form.Label>User</Form.Label>
            <Form.Select 
            onChange={(e)=>{setUserId(e.target.value)}}
            >
            {users && users.map((u,index)=>(
              <option key={index} value={u.id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='fish'>
            <Form.Label>Fish</Form.Label>
            <Form.Select 
            onChange={(e)=>{setFishId(e.target.value)}}
            >
            {fishes && fishes.map((f,index)=>(
              <option key={index} value={f.id}>
                {f.name}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='river'>
            <Form.Label>River</Form.Label>
            <Form.Select 
            onChange={(e)=>{setRiverId(e.target.value)}}
            >
            {rivers && rivers.map((r,index)=>(
              <option key={index} value={r.id}>
                {r.name}
              </option>
            ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="text" name="quantity" required />
          </Form.Group>

          <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="text" name="weight" required />
          </Form.Group>
          <hr />
          <Row>
              <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
              <Link to={RoutesNames.FISHING_VIEW}
              className="btn btn-danger width">
              Cancel
              </Link>
              </Col>
              <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
              <Button variant="primary" type="submit" className="width">
                  Add new fishing
              </Button>
              </Col>
          </Row>
      </Form>
  </Container>
  );
}