import React, { useRef, useState, FC } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  validEmail,
  validatePhoneNumber,
  validatePassword,
} from "../validations";
import "./styles.css";

const SignUp: FC = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const state = useAuth(); //auth state fetched from context
  const navigate = useNavigate(); //redirect to another route

  //submit signup form with validations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumberRef.current?.value)) {
      return setError("Phone number Invalid");
    }

    if (!validEmail(emailRef.current?.value)) {
      return setError("Email not valid");
    }

    if (!validatePassword(passwordRef.current?.value)) {
      return setError(
        "Password should be 8 characters or longer and contain atleast one uppercase character, one lowercase character, one numeric and one special character"
      );
    }

    try {
      setError("");
      setLoading(true);
      console.log(emailRef.current?.value, passwordRef.current?.value);
      await state?.signUp(emailRef.current?.value, passwordRef.current?.value);
      navigate("login");
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  // refs to access form inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="card-container">
          <Card.Body>
            <h5 className="text-center mb-4">Sign Up</h5>
            {error && <Alert variant="danger">{error}</Alert>}

            {/* EMAIL */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-5" id="email">
                <Form.Label>Email id</Form.Label>
                <Form.Control
                  ref={emailRef}
                  placeholder="enter your email id"
                  required
                />
              </Form.Group>

              {/* PHONE NO */}
              <Form.Group className="mt-3" id="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="enter your phone number"
                  ref={phoneNumberRef}
                  required
                />
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mt-3" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter your password"
                  ref={passwordRef}
                  required
                />
                <div className="form-text">Minimum 8 alpha numeric</div>
              </Form.Group>

              {/* SIGNUP BUTTON */}
              <Button
                bsPrefix="authButton"
                disabled={loading}
                style={{ marginTop: "75px" }}
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* FOOTER TEXT */}
        <div className="w-100 text-center mt-4">
          Already have an account? <Link to="/login">Login</Link> instead
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
