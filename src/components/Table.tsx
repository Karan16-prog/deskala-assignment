import React, { useState,useEffect } from "react";
// import { Table } from "react-bootstrap";
import { Form} from "react-bootstrap";
import "./styles.css";
import AddCandidate from "./AddCandidate";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { candidateType } from "../types";
import JSON from "../data.json";

const Dashboard = () => {
  //dummy data from JSON
  const [candidates, setCandidates] = useState<candidateType[]>(JSON.data);
  const [show, setShow] = useState<boolean>(false);
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);

  // Delete from table
  const deleteCandidate = (index: number) => {
    setCandidates([
      ...candidates.slice(0, index),
      ...candidates.slice(index + 1),
    ]);
  };
 

  return (
    <>
      {!show && (
        <Form>
          <div className="table-container">
            <div className="total-number">
              <h6>Candidates List: {candidates.length}</h6>
            </div>
            <table>
              <thead>
                {/* Table Header Row */}
                <tr id="trHeader">
                  <th className="tHeader"></th>
                  <th className="tHeader">Name</th>
                  <th className="tHeader">Date of Birth</th>
                  <th className="tHeader">Email</th>
                  <th className="tHeader tHeader-result">Result</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Mapping each row */}
                {candidates.map((candidate, index) => (
                  <React.Fragment>
                    
                    {editRowIndex === index ? (
                      //Row in Edit Mode
                      <EditableRow 
                        candidates={candidates}
                        setCandidates={setCandidates}
                        index={index}
                        editRowIndex={editRowIndex}
                        setEditRowIndex={setEditRowIndex}
                      />
                    ) : (
                      //Row in Read only mode
                      <ReadOnlyRow
                        candidates={candidates}
                        setCandidates={setCandidates}
                        candidate={candidate}
                        index={index}
                        deleteCandidate={deleteCandidate}
                        editRowIndex={editRowIndex}
                        setEditRowIndex={setEditRowIndex}
                      />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {/* Add candidate button */}
            <input
              type="button"
              value="+Add new candidate"
              className="add-candidate"
              onClick={() => setShow(!show)}
            />
          </div>
        </Form>
      )}

    {/* Add candidate form */}
      {show && (
        <AddCandidate
          candidates={candidates}
          setCandidates={setCandidates}
          show={show}
          setShow={setShow}
        />
      )}
    </>
  );
};

export default Dashboard;
