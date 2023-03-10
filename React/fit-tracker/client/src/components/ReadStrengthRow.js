import React from "react";
import { BsFillPencilFill, BsFillTrashFill, BsTrashFill } from "react-icons/bs";

export default function ReadStrengthRow({
  record,
  handleClickEdit,
  handleDeleteClick,
}) {
  return (
    <>
      <td>{record.date}</td>
      <td>{record.exercise}</td>
      <td>{record.sets}</td>
      <td>{record.reps}</td>
      <td>{record.resistance}</td>
      <td className="table-icon">
        <BsFillPencilFill
          className="pencil-icon"
          size={30}
          onClick={() => {
            handleClickEdit(record);
          }}
        />
      </td>
      <td className="table-icon">
        <BsFillTrashFill
          size={30}
          onClick={() => {
            handleDeleteClick();
          }}
        />
      </td>
    </>
  );
}
