import UserForm from './components/UserForm';
import './App.css';
import { Navbar, Container, Toast } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import axios from 'axios';
import UsersList from './components/UsersList';

function App() {
  const [ users, setUsers ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState(false);
  const [notification, setNotification] = useState({ message: "", variant: "success", show: false })
  const [ userSelected, setUserSelected ] = useState(null)

  useEffect( () => {
    getUsers();
  }, [] )

  // Obtener todos los usuarios
  const getUsers = () => {
    setIsLoading(true);
    axios
    .get( "https://users-crud-ashp.onrender.com/users" )
    .then( resp => setUsers(resp.data) )
    .catch( error => console.error(error) )
    .finally( () => setIsLoading(false) )
  }
  // Mensaje del toast de éxito
  const successNotification = (message) => {
    setNotification( { message, variant: "success", show: true } );
  }
  // Mensaje del toast de error
  const errorNotification = () => {
    setNotification( {message: 'There was an error', variant: "danger", show: true } );
  }

  // Usuario seleccionado para modificar
  const selectedUser = user => {
    setUserSelected(user);
  }

  // Quitar usuario seleccionado
  const deselectUser = () => {
    setUserSelected(null);
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container style={{ maxWidth: 900 }}>
          <Navbar.Brand>
            Users crud
          </Navbar.Brand>
        </Container>
      </Navbar>
      { isLoading && <Loader /> }
      <UserForm 
      setIsLoading={ setIsLoading }
      getUsers={ getUsers }
      successNotification={ successNotification }
      errorNotification={ errorNotification }
      userSelected={ userSelected }
      deselectUser={ deselectUser }
      />
      <UsersList 
      users={ users }
      getUsers={ getUsers }
      setIsLoading={ setIsLoading }
      successNotification={ successNotification }
      errorNotification={ errorNotification }
      selectedUser={selectedUser}
      />
      <Container style={{ position: 'fixed', bottom: '40px', left: 0, right: 0 }}>
        <Toast
        onClose={() => setNotification({ ...notification, show: false })}
        position="bottom-start"
        show={notification.show}
        bg={notification.variant}
        delay={3000}
        className="text-light"
        autohide
        >
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      </Container>
    </div>
  )
}

export default App
