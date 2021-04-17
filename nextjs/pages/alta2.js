import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Alta = () => {
  const [formInfo, setFormInfo] = useState({
    fecha_ingreso: "",
    sintomas: "",
    temperatura: 0,
    diagnostico: "",
  });

  const siguiente = () => {
    window.location = "/alta3";
  };

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.id]: event.target.value });
  };
  return (
    <div>
      <h2>Dar de alta paciente</h2>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="fecha_ingreso">Fecha Ingreso</Form.Label>
          <Form.Control
            id="fecha_ingreso"
            placeholder="Fecha Ingreso"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="sintomas">Sintomas</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="sintomas"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="temperatura">Temperatura</Form.Label>
          <Form.Control
            id="temperatura"
            placeholder="Temperatura"
            onChange={handleChange}
            type="number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="diagnostico">Diagnostico</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="diagnostico"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={siguiente}>Siguiente</Button>
    </div>
  );
};

export default Alta;
