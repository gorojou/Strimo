import React, { useEffect } from "react";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
function Content({ info }) {
  return (
    <>
      {info.map((doc, i) => {
        return (
          <>
            <p>{doc.info}</p>
            <hr />
          </>
        );
      })}
      {info.length > 2 && (
        <div className="nav-item">
          <a href="/" className="ver-mas nav-link">
            <h4>Ver mas</h4>
          </a>
        </div>
      )}
    </>
  );
}

export default Content;
