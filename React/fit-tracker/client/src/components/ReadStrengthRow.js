import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export default function ReadStrengthRow({
  record,
  handleClickEdit,
  handleDeleteClick,
}) {
  return (
    <>
      <td className="table-data">{record.date}</td>
      <td className="table-data">{record.exercise}</td>
      <td className="table-data">{record.sets}</td>
      <td className="table-data">{record.reps}</td>
      <td className="table-data">{record.resistance}</td>
      <td className="table-icon">
        <BsFillPencilFill
          className="pencil-icon"
          onClick={() => {
            handleClickEdit(record);
          }}
        />
      </td>
      <td className="table-icon">
        <BsFillTrashFill
          onClick={() => {
            handleDeleteClick(record.id);
          }}
        />
      </td>
    </>
  );
}
