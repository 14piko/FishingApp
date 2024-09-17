import { Container, Table } from "react-bootstrap";
import UserService from "../../services/UserServices";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function UsersView(){

    const[users,setUsers] = useState();

    const navigate = useNavigate();
    
    async function getUsers() {

        //zaustavi kod i onda se moze raditi debug u inspect
        //debugger;

        await UserService.get()
        .then((answer)=>{
            setUsers(answer);
        })
        .catch((e)=>{console.log(e)});

    }

    useEffect(()=>{
        getUsers();
    },[]);

    async function deleteAsync(id) {
        const response = await UserService.deleteUser(id);
        if(response.error){
            alert(response.message);
            return;
        }
        getUsers();
    }


    function handleDelete(id) {
        deleteAsync(id);
    };


    return(
        <Container>
           <Link to={RoutesNames.NEW_USER}>Add new user</Link>
           <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>OIB</th>
                        <th>License number</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user,index)=>(
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.oib}</td>
                            <td>{user.licenseNumber}</td>
                            <td>
                                <FaEdit 
                                    style={{ color: 'green', cursor: 'pointer', marginRight: '10px', fontSize: '1.5rem' }} 
                                    onClick={() => navigate(`/users/${user.id}`)} 
                                />
                                <FaTrash 
                                    style={{ color: 'red', cursor: 'pointer', fontSize: '1.5rem' }} 
                                    onClick={() => handleDelete(user.id)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}