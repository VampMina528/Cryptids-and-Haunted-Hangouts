import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';
import Auth from '../context/AuthContext';
import type { User } from '../models/User';


const JoinUsForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    codename: "",
    email: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [addUser] = useMutation(ADD_USER)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !userFormData.codename || !userFormData.email || !userFormData.password || confirmPassword !== userFormData.password
    ) {
      setAlertMessage("All fields must be filled correctly.")
      setShowAlert(true);
      return;
    }

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
      setSuccessMessage("Success, you have Joined Us!");
      setTimeout(() => {
        handleModalClose();
      }, 1500);
    } catch (err:unknown) {
      console.error(err);
      let errorMessage = "Something went wrong. Please try again.";

      if (err instanceof Error && err.message.includes("E11000")) {
        errorMessage = "This email address is already registered.";
      }
      
      setAlertMessage(errorMessage);
      setShowAlert(true);
    }
  };

  return (
      <>
      <Form noValidate onSubmit={handleFormSubmit}>
        {showAlert && (
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
            {alertMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success">
            {successMessage}
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Your codename"
            name="codename"
            onChange={handleInputChange}
            value={userFormData.codename || ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email || ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password || ""}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          Submit
        </Button>

        <Button className="w-100 mt-3" variant="danger" onClick={handleModalClose}>
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default JoinUsForm;
