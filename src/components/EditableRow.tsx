import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container, Modal } from "react-bootstrap";
import { AiFillSave } from "react-icons/ai";
import { candidateType } from "../types";
import { formatDateYYYYMMDD, formatDate, findFormErrors } from "../validations";

// Prop types
interface Props {
  candidates: candidateType[];
  setCandidates: React.Dispatch<React.SetStateAction<candidateType[]>>;
  index: number;
  editRowIndex: number | null;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditableRow = ({
  index,
  candidates,
  setCandidates,
  setEditRowIndex,
}: Props) => {

  //edit state - contains value of row to be edited
  const [editFormCandidate, setEditFormCandidate] = useState<candidateType>(
    candidates[index]
  );

  // alert when edited data fails validation
  const [alert, setAlert] = useState<boolean>(false);

// save the new edited data to temp state
  const handleFormChange = (field: string, value: number | string) => {
    setEditFormCandidate({ ...candidates[index], [field]: value });
  };

  // save the temp state to the original state with validations
  const saveEdit = () => {
    let newErrors = findFormErrors(editFormCandidate); // validate new edited data
    if (Object.keys(newErrors).length > 0) {
      setAlert(true); //error present
    } else {
      setAlert(false); //no error in validation
      setCandidates([
        ...candidates.slice(0, index),
        editFormCandidate,
        ...candidates.slice(index + 1, candidates.length),
      ]);
      setEditRowIndex(null);
    }
  };

  return (
    <tr>
      <Modal variant="danger" show={alert} onHide={() => setAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Format</Modal.Title>
        </Modal.Header>
      </Modal>
      {/* NO */}
      <td>{index + 1}</td>

      {/* NAME */}
      <td>
        <Form.Control
          type="input"
          value={editFormCandidate?.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              saveEdit();
            }
          }}
          required
        />
      </td>

      {/* DOB */}
      <td>
        <Form.Control
          type="date"
          value={formatDateYYYYMMDD(
            editFormCandidate.dob?.split("/").join("-")
          )}
          onChange={(e) => handleFormChange("dob", formatDate(e.target.value))}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              saveEdit();
            }
          }}
          required
        />
      </td>

      {/* EMAIL */}
      <td>
        <Form.Control
          type="email"
          //   placeholder="enter your name"
          value={editFormCandidate.email}
          onChange={(e) => handleFormChange("email", e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              saveEdit();
            }
          }}
          required
        />
      </td>

      {/* RESULT */}
      <td>
         <select
          value={editFormCandidate.result}
          className="select-result"
          name="result"
          id="result"
          onChange={(e) => handleFormChange("result", e.target.value)}
        >
          <option value="shortlist">Shortlist</option>
          <option value="reject">Reject</option>
        </select>
      </td>
      
      {/* SAVE BUTTON */}
      <td>
        <span onClick={() => saveEdit()}>
          <AiFillSave color="rgb(86, 184, 240)" />
        </span>
      </td>
    </tr>
  );
};

export default EditableRow;
