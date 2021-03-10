import React, { useReducer } from "react";
import "./conciertos-row.css";
import PopUp from "../lobby/contenido/popup.jsx";
const popUpState = {
  titulo: "",
  isPopUpOpen: false,
  img: "",
};
function Index({ data }) {
  const reducer = (state, action) => {
    if (action.type === "ABRIR") {
      return {
        titulo: action.payload.titulo,
        isPopUpOpen: true,
        img: action.payload.img,
        id: action.payload.id,
        entradasVip: action.payload.entradasVip,
        envivo: action.payload.envivo,
      };
    } else {
      return {
        titulo: "",
        isPopUpOpen: false,
        img: "",
        id: "",
        entradasVip: "",
        envivo: "",
      };
    }
  };
  const closePopUp = () => {
    dispatch({ type: "CERRAR" });
  };
  const [state, dispatch] = useReducer(reducer, popUpState);
  const live = "https://images.emojiterra.com/mozilla/512px/1f534.png";
  return (
    <>
      {state.isPopUpOpen && (
        <PopUp
          titulo={state.titulo}
          img={state.img}
          closePopUp={closePopUp}
          id={state.id}
          entradasVip={state.entradasVip}
          envivo={state.envivo}
        />
      )}
      <div className="conciertos-row-menu">
        {data.map((doc) => {
          return (
            <div
              className="conciertos-row-contenedor"
              onClick={() => {
                dispatch({
                  type: "ABRIR",
                  payload: {
                    titulo: doc.info.artista,
                    img: doc.info.img,
                    id: doc.id,
                    entradasVip: doc.info.entradasVip,
                    envivo: doc.info.envivo,
                  },
                });
              }}
            >
              <div
                className="conciertos-row-imagen"
                style={{ backgroundImage: `url(${doc.info.img})` }}
              ></div>
              <div className="conciertos-row-info">
                <div className="conciertos-row-titulo">
                  {doc.info.envivo && (
                    <div
                      className="circulo-rojo"
                      style={{
                        backgroundImage: `url(${live})`,
                      }}
                    ></div>
                  )}
                  <h1 className="conciertos-row-titulo">{doc.info.titulo}</h1>
                </div>
                <p className="conciertos-row-artistas">
                  Artistas: {doc.info.artista}
                </p>
                {doc.espectadores && (
                  <small className="conciertos-row-espectadores">
                    Espectadores: {doc.info.espectadores}
                  </small>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Index;
