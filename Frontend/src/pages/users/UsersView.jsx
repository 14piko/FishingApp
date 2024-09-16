import { Container, Table } from "react-bootstrap";
import UserService from "../../services/UserServices";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";


export default function UsersView(){
    const[users,setUsers] = useState();
    
    async function getUsers() {


        await UserService.get()
        .then((answer)=>{
            setUsers(answer);
        })
        .catch((e)=>{console.log(e)});

    }

    useEffect(()=>{
        getUsers();
    },[]);

    const handleEdit = (userId) => {
        console.log(`Edit user with id: ${userId}`);
    };

    const handleDelete = (userId) => {
        console.log(`Delete user with id: ${userId}`);
    };


    return(
        <Container>
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
                                    onClick={() => handleEdit(user.id)} 
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