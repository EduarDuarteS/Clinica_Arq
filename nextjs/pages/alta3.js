import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const Alta = () => {
  const [formInfo, setFormInfo] = useState({
    paz_y_salvo: "",
    fecha_salida: "",
  });

  const siguiente = () => {
    window.location = "/confirmacion";
  };

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.id]: event.target.value });
  };

  return (
    <div>
      <h2>Dar de alta paciente</h2>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="paz_y_salvo">Paz y Salvo</Form.Label>
          <Form.Control
            id="paz_y_salvo"
            placeholder="Paz y Salvo"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="fecha_salida">Fecha Salida</Form.Label>
          <Form.Control
            id="fecha_salida"
            placeholder="Fecha Salida"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <Button onClick={handleShow}>Dar de alta</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dar de alta paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro que desea dar de alta al paciente?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={siguiente}>
            Dar de alta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Alta;
