import React, { useState } from "react";
import Nav from "../NavBar/Nav";
import Sidebar from "../NavBar/Sidebar";
export default function Strength() {
  const today = new Date();
  const [month, setMonth] = useState(
    today.toLocaleString("default", { month: "short" })
  );

  const handleClickMonth = (e) => {
    setMonth(e.currentTarget.innerText);
  };
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="page">
        <aside>
          <Sidebar handleClick={handleClickMonth} />
        </aside>
        <h1>{month} Cardio page</h1>
      </main>
    </>
  );
}
