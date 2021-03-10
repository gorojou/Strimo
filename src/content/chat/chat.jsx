import React, { useState, useEffect, useRef } from "react";
import Navbar from "../lobby/navbar";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Chat() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const addToChat = firebase.firestore().collection("Chat").doc(id);
  const mensajeRef = useRef();
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState([{}]);
  useEffect(() => {
    const unsubscribe = addToChat.onSnapshot((doc) => {
      if (
        !doc.data() ||
        !doc.data().integrantes.find((email) => email === currentUser.email)
      ) {
        history.push("/");
      } else {
        addToChat
          .collection("Mensajes")
          .orderBy("timeCreated")
          .limitToLast(25)
          .onSnapshot((snapshot) => {
            let mensajes = [];
            snapshot.forEach((data) => {
              mensajes.push({ id: data.id, mensaje: data.data() });
            });
            setChat(mensajes);
            setLoading(false);
            // goToBottom();
          });
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (!loading) {
      goToBottom();
    }
  }, [chat]);
  const goToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleMensaje = async (e) => {
    e.preventDefault();
    await addToChat.collection("Mensajes").add({
      texto: mensajeRef.current.value,
      email: currentUser.email,
      nombre: currentUser.displayName,
      timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    goToBottom();
    mensajeRef.current.value = "";
  };
  return (
    <>
      <Navbar />
      {loading || (
        <div className="chat">
          <div className="mensajes">
            {chat.map((data) => {
              // return <p>{JSON.stringify(mensaje.texto)}</p>;
              return (
                <div key={data.id}>
                  {data.mensaje.email !== currentUser.email ? (
                    <MensajeRecibido mensaje={data} />
                  ) : (
                    <MensajeEnviado mensaje={data} />
                  )}
                </div>
              );
            })}
            <div ref={scrollRef}></div>
          </div>
          <div className="input">
            <form onSubmit={handleMensaje}>
              <input
                type="text"
                placeholder="Di algo a `Aca nombre` "
                ref={mensajeRef}
              />
              <button
                style={{ width: "10%", margin: "5px" }}
                type="submit"
                className="primario"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
const MensajeEnviado = ({ mensaje }) => {
  return (
    <div className="derecha">
      <div className="mensajeE">
        <div className="nombreE">{mensaje.mensaje.nombre}</div>
        <div className="textoE">{mensaje.mensaje.texto}</div>
      </div>
    </div>
  );
};
const MensajeRecibido = ({ mensaje }) => {
  return (
    <div className="mensaje">
      <div className="nombre">{mensaje.mensaje.nombre}</div>
      <div className="texto">{mensaje.mensaje.texto}</div>
    </div>
  );
};

export default Chat;
