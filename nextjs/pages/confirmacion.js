import { Button } from "react-bootstrap";

const confirmacion = () => {
  const makeIdSalida = () => {
    let result = [];
    const characters = "1234567890";
    for (let i = 0; i < 5; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * 10)));
    }
    return result.join("");
  };
  return (
    <>
      <h2>El paciente fue dado de alta</h2>
      <h3>Id confirmacion: {makeIdSalida()}</h3>
      <Button href="/alta1">Dar de alta otro paciente</Button>
    </>
  );
};

export default confirmacion;
