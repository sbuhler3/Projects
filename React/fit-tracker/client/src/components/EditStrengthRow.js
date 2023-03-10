import React from "react";
import { BiSave } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
export default function EditStrengthRow({ record }) {
  return (
    <>
      <td>
        <input
          type="text"
          required
          name="date"
          defaultValue={record.date}
        ></input>
      </td>
      <td>
        {" "}
        <input
          type="text"
          required
          name="exercise"
          defaultValue={record.exercise}
        ></input>
      </td>
      <td>
        {" "}
        <input
          type="number"
          required
          name="sets"
          defaultValue={record.sets}
        ></input>
      </td>
      <td>
        {" "}
        <input
          type="number"
          required
          name="reps"
          defaultValue={record.reps}
        ></input>
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="resistance"
          defaultValue={record.resistance}
          placeholder="Enter resistance"
        ></input>
      </td>
      <td>
        <BiSave />
      </td>
      <td>
        <FcCancel />
      </td>
    </>
  );
}
