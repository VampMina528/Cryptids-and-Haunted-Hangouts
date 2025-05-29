
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'

import { LOGIN_USER } from '../graphql/mutations.js';
import Auth from '../context/AuthContext.js';
import type { User } from '../models/User.js';

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({ codename: "", email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          input: {
          email: userFormData.codename,
          password: userFormData.password
          }
        }
      });

      Auth.login(data.loginUser.token);
      handleModalClose();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      codename: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Codename</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your codename"
            name="codename"
            onChange={handleInputChange}
            value={userFormData.codename || ""}
            required
            isInvalid={validated && !userFormData.codename}
          />
          <Form.Control.Feedback type="invalid">Codename is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password || ""}
            required
            isInvalid={validated && !userFormData.password}
          />
          <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.codename && userFormData.password)}
          type="submit"
          variant="success"
          className="w-100"
        >
          Login
        </Button>
        <Button variant="danger" className="w-100 mt-3" onClick={handleModalClose}>
          Close
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
