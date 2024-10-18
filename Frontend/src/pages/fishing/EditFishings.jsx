import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Service from '../../services/FishingServices';
import UserService from '../../services/UserServices';
import FishService from '../../services/FishServices';
import RiverService from '../../services/RiverServices';
import { RoutesNames } from '../../constants';
import moment from "moment";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { FaCalendarAlt } from 'react-icons/fa';
import useLoading from "../../hooks/useLoading";
import { AuthContext } from '../../components/AuthContext'; 

export default function EditFishings() {

  const navigate = useNavigate();
  const routeParams = useParams();
  const { showLoading, hideLoading } = useLoading();
  const { userRole, userId: loggedInUserId } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(loggedInUserId);
  const [fishes, setFishes] = useState([]);
  const [fishId, setFishId] = useState(0);
  const [rivers, setRivers] = useState([]);
  const [riverId, setRiverId] = useState(0);
  const [fishing, setFishing] = useState({});
  const [dateHunt, setDateHunt] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function getUsers(){
    const response = await UserService.get();
    setUsers(response);
  }

  async function getFishes(){
    const response = await FishService.get();
    setFishes(response);
  }

  async function getRivers(){
    const response = await RiverService.get();
    setRivers(response);
  }

  async function getFishing() {
    const response = await Service.getById(routeParams.id);
    if(response.error){
      alert(response.error);
      return;
  }
    let fishing = response.message;
    response.message.date = moment.utc(response.message.date).format('yyyy-MM-DD');
    setFishing(fishing);
    setDateHunt(moment.utc(fishing.date).toDate());
    setUserId(fishing.userId); 
    setFishId(fishing.fishId); 
    setRiverId(fishing.riverId); 

  }


  async function getInitialResults() {
    showLoading();
    await getUsers();
    await getFishes();
    await getRivers();
    await getFishing();
    hideLoading();
  }
  
  useEffect(()=>{
    getInitialResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function edit(e) {
    const response = await Service.editFishing(routeParams.id, e);
    if(response.error){
      alert(response.message);
      return;
    }
    navigate(RoutesNames.FISHING_VIEW);
  }


  function doSubmit(e) {
    e.preventDefault();

    const results = new FormData(e.target);

    if (!dateHunt) {
      setErrorMessage("Please select hunt date!");
      return;
    }

    const today = moment().startOf('day'); 
    
    if (moment(dateHunt).isAfter(today)) {
        setErrorMessage("Hunt date cannot be in the future!");
        return;
    }

    setErrorMessage("");

    edit({
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
        <br></br>
        <h2>Editing fishing</h2>
        <hr />
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Form onSubmit={doSubmit}>
        <Form.Group controlId="date">
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

        {userRole === 'Admin' && (
            <Form.Group className='mb-3' controlId='user'>
            <Form.Label>User</Form.Label>
            <Form.Select 
            value={userId}
            onChange={(e)=>{setUserId(e.target.value)}}
            >
            {users && users.map((u,index)=>(
              <option key={index} value={u.id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
            </Form.Select>
          </Form.Group>
          )}

          <Form.Group className='mb-3' controlId='fish'>
            <Form.Label>Fish</Form.Label>
            <Form.Select 
            value={fishId}
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
            value={riverId}
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
              <Form.Control 
                type="text" 
                name="quantity"   
                defaultValue={fishing.quantity} required />
          </Form.Group>

          <Form.Group controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control 
                type="text" 
                name="weight" 
                defaultValue={fishing.weight} required />
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
                  Edit fishing
              </Button>
              </Col>
          </Row>
      </Form>
    </Container>
  );
}