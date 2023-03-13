import React from "react";
import { BiSave } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
export default function EditStrengthRow({
  record,
  handleEditRecord,
  handleCancelEdit,
}) {
  return (
    <>
      <td className="edit-row">
        <input
          type="date"
          required
          name="date"
          defaultValue={record.date}
          onChange={handleEditRecord}
        ></input>
      </td>
      <td className="edit-row">
        {" "}
        <input
          type="text"
          required
          name="exercise"
          defaultValue={record.exercise}
          onChange={handleEditRecord}
        ></input>
      </td>
      <td className="edit-row">
        {" "}
        <input
          type="number"
          required
          name="sets"
          defaultValue={record.sets}
          onChange={handleEditRecord}
        ></input>
      </td>
      <td className="edit-row">
        {" "}
        <input
          type="number"
          required
          name="reps"
          defaultValue={record.reps}
          onChange={handleEditRecord}
        ></input>
      </td>
      <td className="edit-row">
        {" "}
        <input
          type="text"
          name="resistance"
          defaultValue={record.resistance}
          onChange={handleEditRecord}
          placeholder="Enter resistance"
        ></input>
      </td>
      <td className="table-icon edit-row">
        <button className="save-icon">
          <BiSave className="save-icon" type="submit" size={18} />
        </button>
      </td>
      <td className="table-icon edit-row">
        <FcCancel size={18} onClick={handleCancelEdit} />
      </td>
    </>
  );
}
