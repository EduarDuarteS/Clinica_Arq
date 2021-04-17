import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Alta = () => {
  const [formInfo, setFormInfo] = useState({
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
  });

  const siguiente = () => {
    window.location = "/alta2";
  };

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.id]: event.target.value });
  };
  return (
    <div>
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
        <Form.Group>
          <Form.Label htmlFor="nombres">Nombres</Form.Label>
          <Form.Control
            id="nombres"
            placeholder="Nombres"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="apellidos">Apellidos</Form.Label>
          <Form.Control
            id="apellidos"
            placeholder="Apellidos"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="fecha_nacimiento">Fecha Nacimiento</Form.Label>
          <Form.Control
            id="fecha_nacimiento"
            placeholder="Fecha Nacimiento"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={siguiente}>Siguiente</Button>
    </div>
  );
};

export default Alta;
