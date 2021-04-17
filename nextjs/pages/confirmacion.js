import { Button } from "react-bootstrap";

const confirmacion = () => {
  return (
    <>
      <h2>El paciente fue dado de alta</h2>
      <Button href="/alta1">Dar de alta otro paciente</Button>
    </>
  );
};

export default confirmacion;
