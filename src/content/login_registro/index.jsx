import React, { useState } from "react";
import LoginForm from "./login";
import RegisterForm from "./register";
import logo from "../images/strimo__1_-removebg-preview_auto_x1.png";
import style from "./style.css";
function PreLogin() {
  const [form, setForm] = useState(false);
  const [string, setsString] = useState("Ingresa");
  const handleChange = () => {
    setForm(!form);
    if (string === "Registrate") {
      setsString("Ingresa");
    } else {
      setsString("Registrate");
    }
  };
  return (
    <>
      <link rel="stylesheet" href={style}></link>
      <div className="logo">
        <img src={logo} width="200vw" alt="" />
      </div>
      <div className="fondo">
        <div className="container">
          <div className="row centered">
            <div className="col left-side">
              <h1>Disfruta de las mejores transmisiones en VIVO.</h1>
              <br></br>
              <h1>Ten acceso a contenido VIP.</h1>
            </div>
            <div className="col right-side">
              <div className="form">
                {form ? <LoginForm /> : <RegisterForm />}
                <button
                  onClick={handleChange}
                  className="secundario"
                  style={{ width: "40%" }}
                >
                  {string}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreLogin;
