import React from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { candidateType } from "../types";
import "./styles.css";

//Prop types
interface Props {
  candidates:candidateType[];
  candidate: candidateType;
  index: number;
  deleteCandidate: (index: number) => void;
  editRowIndex: number | null;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setCandidates:React.Dispatch<React.SetStateAction<candidateType[]>>;
}
  

//read only row of table(except result). Rendered when not in edit mode
const ReadOnlyRow = ({
  candidates,
  candidate,
  index,
  deleteCandidate,
  editRowIndex,
  setEditRowIndex,
  setCandidates
}: Props) => {

   const handleFormChange = (value:string,index:number) => {
    console.log('RESULT CHANGED')
    setCandidates([...candidates.slice(0,index),{...candidates[index],result:value},...candidates.slice(index+1)])
  }

  return (
    <tr key={index + Date.now()}>
      {/* NO */}
      <td>{index + 1}</td>
      {/* NAME */}
      <td>{candidate.name}</td>
      {/* DOB */}
      <td>{candidate.dob}</td>
      {/* EMAIL */}
      <td>{candidate.email}</td>

      {/* RESULT - SHORTLIST/REJECT */}
      <td>
        <select
          value={candidates[index]?.result}
          className="select-result"
          name="result"
          id="result"
          onChange={(e) => handleFormChange(e.target.value, index)}
        >
          <option value="shortlist">Shortlist</option>
          <option value="reject">Reject</option>
        </select>
      </td>


      <td>
        {/* EDIT BUTTON */}
        <span onClick={() => setEditRowIndex(index)}>
          <MdOutlineModeEditOutline color="rgb(86, 184, 240)" />
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {/* DELETE BUTTON */}
        <span onClick={() => deleteCandidate(index)}>
          <RiDeleteBin4Line color="rgb(86, 184, 240)" />
        </span>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
