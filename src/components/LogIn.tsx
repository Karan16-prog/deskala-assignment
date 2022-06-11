import React, { useRef, useState } from "react";
import { FC } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const LogIn: FC = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const state = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await state?.logIn(emailRef.current?.value, passwordRef.current?.value);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to log in");
    }
    setLoading(false);
  };
  
  // Refs used to access input for email & password
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card bsPrefix="card-container">
          <Card.Body>
            <h5 className="text-center mb-4">Login</h5>
            {error && <Alert variant="danger">{error}</Alert>}

            {/* EMAIL */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mt-5" id="email">
                <Form.Label>Email id</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  placeholder="enter your email id"
                  required
                />
              </Form.Group>

              {/*PASSWORD*/}
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

              {/* LOGIN BUTTON */}
              <Button
                bsPrefix="authButton"
                disabled={loading}
                style={{ marginTop: "75px" }}
                type="submit"
              >
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* FOOTER TEXT */}
        <div className="w-100 text-center mt-4">
          Need an account? <Link to="/">Sign Up</Link> instead
        </div>
      </div>
    </Container>
  );
};

export default LogIn;
