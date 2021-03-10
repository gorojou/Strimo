import React, { useState, useRef } from "react";
import { useAuth } from "../context/authContext";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("algo salio mal");
    }
    setLoading(false);
  };
  return (
    <>
      {/* <img src={logo} width="100px" alt="logo"></img> */}
      <h3 className="title">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="name">Email: </label>
          <input
            className="login"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            ref={emailRef}
          />
        </div>
        <div className="form-element">
          <label htmlFor="passowrd">Password: </label>
          <input
            className="login"
            type="password"
            id="passowrd"
            passowrd="passowrd"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>

        <button
          style={{ width: "50%" }}
          disable={loading}
          type="Submit"
          className="primario margenes-boton"
        >
          Entrar
        </button>
      </form>
    </>
  );
}
