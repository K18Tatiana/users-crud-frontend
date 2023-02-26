import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ( { setIsLoading, getUsers, successNotification, errorNotification, userSelected, deselectUser } ) => {
    
    const initialUser = { first_name: "", last_name: "", email: "", password: "", birthday: null };
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ titleUser, setTitleUser ] = useState( "Create User" );

    useEffect( () => {
        if(userSelected) {
            reset(userSelected);
            setTitleUser("Update User");
        }
        else {
            reset(initialUser)
            setTitleUser("Create User");
        }
    }, [userSelected] )

    const getUserForm = (data) => {
        setIsLoading(true);
        if(userSelected) updateUser(data);
        else createUser(data);
    }

    // Crear un usuario
    const createUser = (data) => {
        axios
        .post( "https://users-crud-ashp.onrender.com/users", data )
        .then( () => {
            getUsers();
            successNotification( "User created successfully" );
            reset( initialUser );
        } )
        .catch( () => errorNotification() )
        .finally( () => setIsLoading(false) )
    }

    // Actualizar un usuario
    const updateUser = (data) => {
        axios
        .put( `https://users-crud-ashp.onrender.com/users/${data.id}`, data )
        .then( () => {
            getUsers();
            successNotification( "User updated successfully" );
            deselectUser()
            setTitleUser("Create User");
        } )
        .catch( () => errorNotification() )
        .finally( () => setIsLoading(false) )
    }

    return (
        <Form style={{ maxWidth: 900, padding: 10 }} className="mx-auto mb-5" onSubmit={ handleSubmit(getUserForm) }>
            <h2 style={{ padding: '15px 0' }}>{ titleUser }</h2>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        { ...register("first_name", { required: true }) }
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        { ...register("last_name", { required: true }) }
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        { ...register("email", { required: true }) }
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        { ...register("password", { required: true }) }
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group className="mb-3" controlId="formBasicBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                    type="date"
                    { ...register("birthday", { equired: true }) }
                    />
                </Form.Group>
            </Row>
            <Button type="submit" className="mt-3">
                { titleUser }
            </Button>
            {
                userSelected 
                && 
                <Button 
                onClick={deselectUser} 
                variant="secondary" 
                className="mt-3"
                style={{ marginLeft: 10 }}
                >
                    Clear
                </Button>
            }
        </Form>
    )
}

export default UserForm