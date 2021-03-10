import React from "react";
import Link from "./link";
import "./link.css";
function Index() {
  // useEffect(() => createLink());
  return (
    <div>
      <div className="fondo">
        <div className="caja-link">
          <h2>Invita a alguien mas a ver el Show!</h2>
          <p>
            Comparte el Link para invitar a alguien y esa persona tendra acceso
            al show!
          </p>
          <Link />
          <small>El link se expirara en 5 horas</small>
        </div>
      </div>
    </div>
  );
}

export default Index;
