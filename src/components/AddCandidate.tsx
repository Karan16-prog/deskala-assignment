import React, { useState } from "react";
import { Form, Button, Card, Alert, Container, Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { candidateType } from "../types";
import { validEmail, formatDate } from "../validations";
import { findFormErrors } from "../validations";
import "./styles.css";

//Prop types
interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  candidates: candidateType[];
  setCandidates: React.Dispatch<React.SetStateAction<candidateType[]>>;
}

const AddCandidate = ({ show, setShow, candidates, setCandidates }: Props) => {
  const [form, setForm] = useState<candidateType>({
    no: null,
    name: "",
    dob: "",
    email: "",
    result: "shortlist",
    age: null,
    state: "",
    pincode: null,
  });
  const [errors, setErrors] = useState<any>({});

  const setField = (field: string, value: number | string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors(form);
    // Conditional logic:

    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      setForm({
        ...form,
        no: new Date().getTime(),
      });
      setCandidates([...candidates, form]);
      handleClose();
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Container fluid>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="title">Create Candidate</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col lg={true}>
                {/* NAME */}
                <Form.Group className="mb-3" controlId="candidate_name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="input"
                    autoFocus
                    placeholder="enter your name"
                    required
                    onChange={(e) => setField("name", e.target.value)}
                    isInvalid={errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={true}>
                {/* EMAIL */}
                <Form.Group className="mb-3" controlId="canidadate_email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="enter your email address"
                    required
                    onChange={(e) => setField("email", e.target.value)}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={true}>
                {/* DOB */}
                <Form.Group className="mb-3" controlId="canidadate_dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="enter your date of birth"
                    required
                    onChange={(e) =>
                      setField(
                        "dob",
                        formatDate(e.target.value.split("-").join("/"))
                      )
                    }
                    isInvalid={errors.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={true}>
                {/* STATE (TEMP DATA) */}
                <Form.Group className="mb-3" controlId="canidadate_state">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    aria-label="Select state"
                    onChange={(e) => setField("state", e.target.value)}
                    required
                    isInvalid={errors.state}
                  >
                    <option>Select your state</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={true}>
                {/* AGE */}
                <Form.Group className="mb-3" controlId="canidadate_age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="enter your age"
                    required
                    onChange={(e) => setField("age", e.target.value)}
                    isInvalid={errors.age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={true}>
                {/* PINCODE */}
                <Form.Group className="mb-3" controlId="candidate_pindcode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="enter your 6-digit pincode"
                    required
                    onChange={(e) => setField("pincode", e.target.value)}
                    isInvalid={errors.pincode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pincode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* CANCEL BUTTON */}
          <Button
            bsPrefix="cancel-button"
            className="me-3"
            onClick={handleClose}
          >
            Cancel
          </Button>

          {/* CREATE BUTTON */}
          <Button bsPrefix="create-button" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddCandidate;
