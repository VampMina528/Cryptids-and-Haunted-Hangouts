import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';
import Auth from '../context/AuthContext';
import type { User } from '../models/User';


const JoinUsForm = ({ handleModalClose }: { handleModalClose: () => void }) => {

  const [userFormData, setUserFormData] = useState<User>({ codename: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);

    if (
      !userFormData.codename ||
      !userFormData.email ||
      !userFormData.password ||
      confirmPassword !== userFormData.password
    )
      return;
    
    try {
      const { data } = await addUser({
        variables: {
          input: {
            codename: userFormData.codename,
            email: userFormData.email,
            password: userFormData.password
          }
        }
      });

      Auth.login(data.addUser.token);
      handleModalClose();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
      <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="codename">Codename</Form.Label>
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
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email || ""}
            required
            isInvalid={validated && !userFormData.email}
          />
          <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
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

        <Form.Group className="mb-3">
          <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            isInvalid={validated && confirmPassword !== userFormData.password}
          />
          <Form.Control.Feedback type="invalid">
            Confirm Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
            className="w-100"
        >
          Submit
        </Button>
      </Form>
      <Button className="w-100 mt-3" variant="danger" onClick={handleModalClose}>
        Close
      </Button>
    </>
  );
};

export default JoinUsForm;
