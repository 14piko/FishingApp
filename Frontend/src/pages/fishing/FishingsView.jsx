import { useEffect, useState } from "react";
import { Button, Container, Table, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FishingService from "../../services/FishingServices"; 
import { RoutesNames } from "../../constants";
import moment from "moment";
import useLoading from "../../hooks/useLoading";

export default function FishingsView(){

    const [fishings, setFishings] = useState();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [fishingToDelete, setFishingToDelete] = useState(null);

    let navigate = useNavigate(); 

    const { showLoading, hideLoading } = useLoading();

    async function getFishings(){
        showLoading();
        await FishingService.get()
        .then((response)=>{
            setFishings(response);
        })
        .catch((e)=>{console.log(e)});
        hideLoading();
    }
    
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
    useEffect(()=>{
        getFishings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    
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

    return (
        <Container className="mt-5">
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
                        <th>Akcija</th>
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
        </Container>
    );
}