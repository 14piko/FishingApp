import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Service from '../../services/FishingServices';
import UserService from '../../services/UserServices';
import FishService from '../../services/FishServices';
import RiverService from '../../services/RiverServices';
import { RoutesNames } from '../../constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FaCalendarAlt } from 'react-icons/fa';
import useLoading from "../../hooks/useLoading";
import { AuthContext } from '../../components/AuthContext'; 

export default function AddFishings() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { userRole, userId: loggedInUserId } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(loggedInUserId);
  const [fishes, setFishes] = useState([]);
  const [fishId, setFishId] = useState(0);
  const [rivers, setRivers] = useState([]);
  const [riverId, setRiverId] = useState(0);
  const [dateHunt, setDateHunt] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function getUsers() {
      showLoading();
      const response = await UserService.get();
      setUsers(response);
      if (response.length > 0 && !userId) {
        setUserId(response[0].id);
      }
      hideLoading();
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getFishes() {
    showLoading();
    const response = await FishService.get();
    setFishes(response);
    setFishId(response[0]?.id); 
    hideLoading();
  }

  useEffect(() => {
    getFishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getRivers() {
    showLoading();
    const response = await RiverService.get();
    setRivers(response);
    setRiverId(response[0]?.id); 
    hideLoading();
  }

  useEffect(() => {
    getRivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function add(e) {
    showLoading();
    const response = await Service.addFishing(e);
    hideLoading();
    if (response.error) {
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

    const quantity = results.get('quantity');
    if (!Number.isInteger(Number(quantity)) || quantity <= 0) {
        setErrorMessage("Quantity must be a positive whole number!");
        return;
    }

    const weight = results.get('weight');
    if (isNaN(weight) || weight <= 0) {
        setErrorMessage("Weight must be a positive number!");
        return;
    }

    setErrorMessage("");
    
    add({
      date: moment(dateHunt).format('YYYY-MM-DD'),
      userId: parseInt(userId), 
      fishId: parseInt(fishId),
      riverId: parseInt(riverId),
      quantity: parseInt(quantity), 
      weight: parseFloat(weight)
    });
  }
 
  return (
    <Container>
      <br></br>
      <h2>Add new fishing</h2>
      <hr />
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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

        {userRole === 'Admin' && (
          <Form.Group className='mb-3' controlId='user'>
            <Form.Label>User</Form.Label>
            <Form.Select onChange={(e) => setUserId(parseInt(e.target.value))}>
              {users.length > 0 ? (
                users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.firstName} {u.lastName}
                  </option>
                ))
              ) : (
                <option>Loading users...</option>
              )}
            </Form.Select>
          </Form.Group>
        )}

        <Form.Group className='mb-3' controlId='fish'>
          <Form.Label>Fish</Form.Label>
          <Form.Select onChange={(e) => setFishId(parseInt(e.target.value))} value={fishId}>
            {fishes && fishes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='river'>
          <Form.Label>River</Form.Label>
          <Form.Select onChange={(e) => setRiverId(parseInt(e.target.value))} value={riverId}>
            {rivers && rivers.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" name="quantity" placeholder="Enter fish quantity"required />
        </Form.Group>

        <Form.Group controlId="weight">
          <Form.Label>Weight</Form.Label>
          <Form.Control type="text" name="weight" placeholder="Enter the total weight of all fish" required />
        </Form.Group>
        <hr />
        <Row>
          <Col xs={6}>
            <Link to={RoutesNames.FISHING_VIEW} className="btn btn-danger width">
              Cancel
            </Link>
          </Col>
          <Col xs={6}>
            <Button variant="primary" type="submit" className="width">
              Add new fishing
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}