import { useEffect, useState } from "react";
import { Button, Table, Modal, Row , Col, Form, Pagination } from "react-bootstrap";
import { FaEdit, FaTrash, FaTrophy } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FishingService from "../../services/FishingServices"; 
import { RoutesNames } from "../../constants";
import moment from "moment";
import useLoading from "../../hooks/useLoading";

export default function FishingsView(){

    const [fishings, setFishings] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [fishingToDelete, setFishingToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [condition, setCondition] = useState('');
    const navigate = useNavigate();

    const { showLoading, hideLoading } = useLoading();

    async function getFishings(){
        showLoading();
        const response = await FishingService.getPaginator(page, condition);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        if (response.message.length === 0) {
            setPage(page -1);
            return;
        }
        setFishings(response.message);
        hideLoading();
    }

    useEffect(() => {
        getFishings();
    }, [page, condition]);
    
    async function deleteFishing(id) {
        showLoading();
        const response = await FishingService.deleteFishing(id);
        hideLoading();
        if(response.error){
            alert(response.message);
            return;
        }
        getFishings();
        setShowDeleteModal(false);
    }

    function handleDelete(id) {
        setFishingToDelete(id);
        setShowDeleteModal(true);
    }

    function confirmDelete() {
        deleteFishing(fishingToDelete);
    }

    function formatDate(date) {
        if (date == null) {
            return "Undefined";
        }
        return moment.utc(date).format("DD.MM.YYYY.");
    }

    function changeCondition(e) {
        if (e.nativeEvent.key === "Enter") {
            setPage(1);
            setCondition(e.nativeEvent.srcElement.value);
            setFishings([]);
        }
    }

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        if (page === 1) {
            return;
        }
        setPage(page - 1);
    }

    return (
        <>
        <br></br>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">
                    <FaTrophy className="me-2" /> Fishing (catches) list
                </h1>
            </div>
            <Link to={RoutesNames.NEW_FISHING}>
                <Button variant="success" size="lg" className="mb-4">
                    Add new fishing
                </Button>
            </Link>
            <Row>
                <Col sm={12} lg={7} md={7}>
                    <Form.Control
                        type="text"
                        name="search"
                        placeholder="Search fishings by fish, river, user first name or last name [Enter]"
                        maxLength={255}
                        defaultValue=""
                        onKeyUp={changeCondition}
                    />
                </Col>
            </Row>
            <br></br>
            <br></br>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date of catch</th>
                        <th>User</th>
                        <th>Fish</th>
                        <th>River</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fishings && fishings.map((entity,index)=>(
                        <tr key={index}>
                            <td>{formatDate(entity.date)}</td>
                            <td>{entity.userFirstName} {entity.userLastName}</td>
                            <td>{entity.fishName}</td>
                            <td>{entity.riverName}</td>
                            <td>{entity.quantity}</td>
                            <td>{entity.weight}</td>
                            <td className="center">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/fishings/${entity.id}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                                    <span>  </span>
                                    <Button
                                        variant='danger'
                                        onClick={() => handleDelete(entity.id)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <hr />

            {fishings && fishings.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="lg">
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item disabled>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </div>
            )}

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this fishing?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}