import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const AuthForm = (props) => {
  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setAuthInfo({ ...authInfo, [event.target.id]: event.target.value });
  };

  const action = () => {
    console.log(process.env.API_URL);
    props.action(authInfo);
  };

  const renderSignupExtraFields = () => {
    if (props.title === "Signup") {
      return (
        <div>
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
        </div>
      );
    }
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Contrasena</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="contrasena"
            onChange={handleChange}
          />
        </Form.Group>
        {renderSignupExtraFields()}
      </Form>
      <Button onClick={action}>{props.title}</Button>
    </div>
  );
};

export default AuthForm;
