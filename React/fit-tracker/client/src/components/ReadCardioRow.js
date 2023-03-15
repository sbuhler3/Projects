import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

export default function ReadCardioRow({
  record,
  handleClickEdit,
  handleDeleteClick,
}) {
  return (
    <>
      <td className="table-data">{record.date}</td>
      <td className="table-data">{record.exercise}</td>
      <td className="table-data">{record.time}</td>
      <td className="table-icon cardio-icon">
        <BsFillPencilFill
          className="pencil-icon"
          onClick={() => {
            handleClickEdit(record);
          }}
        />
      </td>
      <td className="table-icon cardio-icon">
        <BsFillTrashFill
          onClick={() => {
            handleDeleteClick(record.id);
          }}
        />
      </td>
    </>
  );
}
