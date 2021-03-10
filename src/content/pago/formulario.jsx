import React, { useState, useEffect, useRef } from "react";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
import qr from "../images/qr-code-example.png";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Register({ img, moneda }) {
  const { id } = useParams();
  const history = useHistory();
  const ref = useRef(null);
  const wallet = "6vuw9DbaenYyMjuBDn8bkH3Ny23b4s6mPPLq4dbuxZPDm EVo4TM";
  const [precio, setPrecio] = useState("");
  const preciobtc = "0.0013 BTC";
  const precioeth = "0.00042 ETH";
  const comprobante = "224345q7iq19";
  const { currentUser } = useAuth();
  useEffect(() => {
    if (moneda === "btc") {
      setPrecio(preciobtc);
    } else {
      setPrecio(precioeth);
    }
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [moneda]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const createChat = firebase.firestore().collection("Chat");
    const pago = firebase.firestore().collection("Pagos");
    const invitacionDoc = firebase.firestore().collection("Invitacion");
    const conciertos = firebase.firestore().collection("Conciertos");
    const notificaciones = firebase.firestore().collection("Notificaciones");
    pago
      .where("comprobante", "==", comprobante)
      .where("usuario", "==", currentUser.uid)
      .get()
      .then((snapshot) => {
        let match = "";
        snapshot.docs.map(async (doc) => {
          match = doc.data();
        });
        console.log(match);
        if (!match) {
          pago
            .add({
              comprobante: comprobante,
              concierto: id,
              usuario: currentUser.uid,
            })
            .then(async (docRef) => {
              await conciertos.doc(id).update({
                entradasVip: firebase.firestore.FieldValue.increment(-1),
              });
              await createChat
                .add({
                  concierto: id,
                  pago: docRef.id,
                  integrantes: [currentUser.email],
                })
                .then(async (doc) => {
                  await invitacionDoc.add({
                    concierto: id,
                    de: currentUser.email,
                    pago: docRef.id,
                    usuarioInvitado: "",
                    tiempo:
                      firebase.firestore.Timestamp.now().toMillis() +
                      1000 * 60 * 60 * 5,
                    chatId: doc.id,
                  });
                });
              await notificaciones.add({
                info: `Solicitud de compra para concierto ${id}, ha sido procesada correctamente`,
                infoHeadLine: "Compra procesada",
                usuario: currentUser.uid,
                visto: false,
                tiempo: firebase.firestore.Timestamp.now().toDate(),
              });
              history.push(`/invitacion/${docRef.id}`);
            })
            .catch(async (error) => {
              alert(error);
              await notificaciones.add({
                info: `Solicitud de compra para concierto ${id}, ha devuelto un error :/`,
                infoHeadLine: "Error para procesar compra",
                usuario: currentUser.uid,
                visto: false,
              });
            });
        } else {
          history.push(`/invitacion/${comprobante}`);
        }
      });
    e.preventDefault();
  };
  return (
    <div className="form-pago">
      <img alt="" src={img} width="100px"></img>
      <h3 className="title">Formulario de pago</h3>
      <form onSubmit={handleSubmit} className="form-layout">
        <img alt="" src={qr} width="250px"></img>
        <input type="text" value={wallet} readOnly={true} />
        <Precio precio={precio} />
        <button
          type="Submit"
          className="primario"
          style={{ width: "30%" }}
          ref={ref}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
const Precio = ({ precio }) => {
  return (
    <div className="precio">
      <h4>Precio: </h4>
      <h2>{precio}</h2>
    </div>
  );
};
