import React /*{ useState }*/ from "react";
// import Navbar from "./navbar";
import Index from "./contenido";
import "./style.css";
function Lobby() {
  return (
    <div>
      <div className="degradado">
        {/* <Navbar /> */}
        <Index />
      </div>
    </div>
  );
}

export default Lobby;
