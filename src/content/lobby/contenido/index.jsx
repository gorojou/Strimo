import React, { useReducer } from "react";
import Carousel from "./carousel";
import PopUp from "./popup";
import getContent from "./getContent";
const popUpState = {
  titulo: "",
  isPopUpOpen: false,
  img: "",
};
function Index() {
  const reducer = (state, action) => {
    if (action.type === "ABRIR") {
      return {
        titulo: action.payload.documento.artista,
        isPopUpOpen: true,
        img: action.payload.documento.img,
        id: action.payload.id,
        entradasVip: action.payload.documento.entradasVip,
        envivo: action.payload.documento.envivo,
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
  // const [loaded, setLoaded] = useState(initialState)
  const data = getContent("Conciertos");

  return (
    <div>
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
      {data.length > 0 && (
        <>
          <Carousel
            data={{ html: recomendado(data, dispatch), title: "Recomendados" }}
          />
          <Carousel data={{ html: perfiles(), title: "Perfiles" }} />
          <Carousel data={{ html: generos(), title: "Categorias" }} />
        </>
      )}
    </div>
  );
}

function recomendado(dato, dispatch) {
  return (
    <>
      <br />
      {dato.map((datos) => {
        return (
          <div
            className="item"
            key={datos.id}
            onClick={() => dispatch({ type: "ABRIR", payload: { ...datos } })}
          >
            <div
              className="espacio"
              style={{ backgroundImage: `url(${datos.documento.img})` }}
            ></div>
            <div className="titulo">
              <h3>{datos.documento.artista}</h3>
            </div>
          </div>
        );
      })}
      ;<div className="final"></div>
    </>
  );
}

function perfiles() {
  const data = [
    {
      id: 1,
      usuario: "@Maluma",
      img:
        "https://www.am.com.mx/__export/1558970060149/sites/am/img/2019/05/27/maluma_1.jpeg_423682103.jpeg",
      seguidores: "37K",
      link: "https://twitter.com/maluma",
    },
    {
      id: 2,
      usuario: "@BadBunny",
      img:
        "https://www.minutoe.com/u/fotografias/m/2020/9/1/f768x1-46225_46352_126.jpg",
      seguidores: "104K",
      link: "https://twitter.com/sanbenito",
    },
    {
      id: 3,
      usuario: "@BrunoMars",
      img:
        "https://mui.today/__export/1581030376079/sites/mui/img/2020/02/06/bruno-mars-1.jpeg_1902800913.jpeg",
      seguidores: "340K",
      link: "https://twitter.com/brunomars",
    },
    {
      id: 4,
      usuario: "@LadyGaga",
      img:
        "https://files.rcnradio.com/public/styles/img_galeria/public/2019-01/lady_gaga_en_los_globos_de_oro_3_0.jpg?itok=IWA5ujWI",
      seguidores: "201K",
      link: "https://twitter.com/ladygaga",
    },
    {
      id: 5,
      usuario: "@Residente",
      img:
        "https://storage.googleapis.com/afs-prod/media/media:9bf266faefb847dea4edf1d10cae72bd/800.jpeg",
      seguidores: "24K",
      link: "https://twitter.com/Residente",
    },
  ];
  return (
    <>
      {data.map((perfil, i) => {
        return (
          <div className="perfil" key={perfil.id}>
            <a href={perfil.link} target="_blank" rel="noreferrer">
              <div
                className="perfil-i"
                style={{ backgroundImage: `url(${perfil.img})` }}
              ></div>
              <h5>{perfil.usuario}</h5>
              <p>Seguidores: {perfil.seguidores}</p>
            </a>
          </div>
        );
      })}
      <div className="final"></div>
    </>
  );
}

const generos = () => {
  const data = [
    {
      id: 1,
      categoria: "Regueton",
      img:
        "https://ca-times.brightspotcdn.com/dims4/default/73822c0/2147483647/strip/true/crop/519x640+0+0/resize/840x1036!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe4%2F0b%2F83a02f944733a6e61182e3cd4766%2F119469014-10158893471267490-8069448782142814689-n.jpg",
      seguidores: "14M",
    },
    {
      id: 2,
      categoria: "Pop",
      img:
        "https://i.pinimg.com/736x/c7/7b/8f/c77b8f08bb9cdc9f5289fbfba135b599.jpg",
      seguidores: "5M",
    },
    {
      id: 3,
      categoria: "Rap",
      img:
        "https://los40es00.epimg.net/los40/imagenes/2019/10/21/musica/1571674924_397865_1571676084_noticia_normal.jpg",
      seguidores: "10M",
    },
    {
      id: 4,
      categoria: "Rock",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyVPZLsIaFzto9rGpYjSnIJrzXh-HHvwpkg&usqp=CAU",
      seguidores: "34K",
    },
    {
      id: 5,
      categoria: "Banda",
      img:
        "https://diariobasta.com/wp-content/uploads/2019/07/L5-PIE-DE-FOTO-1-Los-Ex-de-la-Banda-traen-la-crema-y-nata-1.jpg",
      seguidores: "1M",
    },
  ];
  return (
    <>
      {" "}
      {data.map((perfil, i) => {
        return (
          <div className="display1" key={perfil.id}>
            <div
              className="display1-i"
              style={{ backgroundImage: `url(${perfil.img})` }}
            ></div>
            <div className="contenido">
              <h4>{perfil.categoria}</h4>
              <div className="footer-div">
                <p>Seguidores: {perfil.seguidores} </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="final"></div>
    </>
  );
};
export default Index;
