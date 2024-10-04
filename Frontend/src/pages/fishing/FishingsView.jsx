import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FishingService from "../../services/FishingServices"; 
import { RoutesNames } from "../../constants";
import moment from "moment";
import useLoading from "../../hooks/useLoading";

export default function FishingsView(){

    const [fishings, setFishings] = useState();

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
    }
    useEffect(()=>{
        getFishings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function formatDate(date) {
        if (date == null) {
            return "Undefined";
        }
        return moment.utc(date).format("DD.MM.YYYY.");
    }

    return (
        <Container>
            <Link to={RoutesNames.NEW_FISHING} className="btn btn-success width">
                <IoIosAdd
                size={25}
                /> Add new fishing
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
                                        onClick={() => deleteFishing(entity.id)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}