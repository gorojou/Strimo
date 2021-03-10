import React, { useState } from "react";
import "./pago.css";
import eth from "../images/eth.png";
import btc from "../images/btc.png";
import visa from "../images/visa.png";
import mastercard from "../images/mastercard.png";
import Formulario from "./formulario";
function Index() {
  const [formulario, setFormulario] = useState(false);
  const [moneda, setMoneda] = useState("");
  const [img, setImg] = useState("");
  const handleClick = (imagen, valor) => {
    setFormulario(true);
    setImg(imagen);
    setMoneda(valor);
  };
  return (
    <>
      <div className="fondo">
        <div className="container">
          <h1 className="titulo-importante">Metodo de pago:</h1>
          <div className="row centered">
            <div className="col seccion-pago">
              <div className="caja-pago">
                <h1>Cripto Monedas</h1>
                <div className="seccion">
                  <div
                    className="boton-pago"
                    onClick={() => handleClick(eth, "eth")}
                  >
                    <img src={eth} alt="" />
                    <h4>Ethereum</h4>
                  </div>
                  <div
                    className="boton-pago"
                    onClick={() => handleClick(btc, "btc")}
                  >
                    <img src={btc} alt="" />
                    <h4>Bitcoin</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col seccion-pago">
              <div className="caja-pago">
                <h1>TDD y TDC</h1>
                <div className="seccion">
                  <div className="boton-pago">
                    <img src={visa} alt="" />
                  </div>
                  <div className="boton-pago">
                    <img src={mastercard} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {formulario && <Formulario img={img} moneda={moneda} />}
    </>
  );
}

export default Index;
