import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

function App() {
  const [formInfo, setFormInfo] = useState({
    cedula: "",
  });

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.id]: event.target.value });
  };

  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    try{
      const response = await axios.post("http://localhost:3002/salida", {
        cedula: formInfo.cedula,
      });
      setLoading(false);
      alert(
        `Paciente dado de alta con el id de confirmacion ${response.data.exitId}`
      );

    }catch(err){
      setLoading(false)
      alert('no se pudo invocar el RPA, porfavor intentelo de nuevo')
    }
  };

  const renderButton = () => {
    if (loading) {
      return (
        <Button variant="primary" disabled>
        <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        />
        Cargando...
        </Button>
      );
    } else {
      return (
        <Button variant="primary" type="submit" onClick={send}>
        Enviar
        </Button>
      );
    }
  };

  return (
    <Container className="App">
    <h2>Dar de alta paciente</h2>
    <Form>
    <Form.Group>
    <Form.Label htmlFor="cedula">Cedula Paciente</Form.Label>
    <Form.Control
    id="cedula"
    placeholder="Cedula"
    onChange={handleChange}
    />
    </Form.Group>
    </Form>
    {renderButton()}
    </Container>
  );
}

export default App;
