import { Table, Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios";

const UsersList = ( { users, getUsers, setIsLoading, successNotification, errorNotification, selectedUser } ) => {

    const [ isShowPassword, setIsShowPassword ] = useState( false );

    // Eliminar usuario
    const deleteUser = (id) => {
        setIsLoading(true);
        axios
        .delete( `https://users-crud-ashp.onrender.com/users/${id}` )
        .then( () => {
            getUsers();
            successNotification("User deleted successfully");
        } )
        .catch( () => errorNotification() )
        .finally( () => setIsLoading(false) )
    }

    return (
        <Table style={{ maxWidth: 1000, margin: '0 10px' }} className="mx-auto mb-5">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>
                        { 
                            isShowPassword
                            ?
                            <div>
                                Password
                                <button className="btn-notshow" onClick={ () => setIsShowPassword(false) }>
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                            :
                            <div>
                                Password
                                <button className="btn-notshow" onClick={ () => setIsShowPassword(true) }>
                                    <i className="fa-solid fa-eye-slash"></i>
                                </button>
                            </div>
                        }
                    </th>
                    <th>Birthday</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map( user => {
                        const birthday = new Date(user.birthday)
                        .toLocaleDateString('en-us', {day: 'numeric', month: 'long', year: 'numeric'})
                        return (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    { 
                                        isShowPassword
                                        ?
                                        <div>{ user.password }</div>
                                        :
                                        <div>{ "x".repeat(user.password.length) }</div>
                                    }
                                </td>
                                <td>{birthday}</td>
                                <td>
                                    <Button
                                    onClick={ () => deleteUser(user.id) }
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </Button>
                                    <Button 
                                    variant="info" 
                                    style={{marginLeft: 5}}
                                    onClick={ () => selectedUser(user) }
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Button>
                                </td>
                            </tr>
                        )
                    } )
                }
            </tbody>
        </Table>
    )
}

export default UsersList