import React, { useRef, useState } from "react";
import logo from "../images/strimo__1_-removebg-preview_auto_x1.png";
import { useAuth } from "../context/authContext";
export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Contrasenas no coinciden");
      return "errormanure";
    }
    try {
      setLoading(true);
      await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  };
  return (
    <>
      {/* <img src={logo} width="100px" alt=""></img> */}
      <h1 className="title">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 form-section">
              <div className="form-element email">
                <label htmlFor="email">Email: </label>
                <input
                  required={true}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  ref={emailRef}
                />
              </div>
              <div className="form-element">
                <label htmlFor="name">Nombre: </label>
                <input
                  required={true}
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  ref={nameRef}
                />
              </div>
            </div>
            <div className="col-sm-6 form-section">
              <div className="form-element">
                <label htmlFor="passowrd">Contraseña: </label>
                <input
                  required={true}
                  type="password"
                  id="passowrd"
                  passowrd="passowrd"
                  placeholder="Contraseña"
                  ref={passwordRef}
                />
              </div>
              <div className="form-element no-wrap">
                <label htmlFor="passowrd">Restablezca Contraseña: </label>
                <input
                  required={true}
                  type="password"
                  id="confirmPassowrd"
                  passowrd="passowrd"
                  placeholder="Contraseña"
                  ref={confirmPasswordRef}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          style={{ width: "50%" }}
          disabled={loading}
          type="Submit"
          className="primario margenes-boton"
        >
          Entrar
        </button>
      </form>
    </>
  );
}
