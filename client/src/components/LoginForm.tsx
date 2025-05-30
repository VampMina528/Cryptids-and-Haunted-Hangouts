
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../graphql/mutations.js';
import Auth from '../context/AuthContext.js';

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState({
    codename: "",
    password: ""
  });

  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userFormData.codename || !userFormData.password) {
      setShowAlert(true);
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          codename: userFormData.codename,
          password: userFormData.password
        }
      });

      Auth.login(data.loginUser.token);
      handleModalClose();
      navigate("/forums");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      codename: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate onSubmit={handleFormSubmit} className="login-form">
        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            Something went wrong with your login credentials!
          </Alert>  
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter your Codename"
            name="codename"
            onChange={handleInputChange}
            value={userFormData.codename || ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password || ""}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          Login
        </Button>

        <Button variant="danger" className="w-100 mt-3" onClick={handleModalClose}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
