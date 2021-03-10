import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import { useAuth } from "../context/authContext";
import "./imagen-perfil.css";
import { useHistory } from "react-router-dom";
function Index() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const storage = firebase.storage();
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  useEffect(() => {
    storage
      .ref(`users/${currentUser.uid}/`)
      .child(`pfp${currentUser.uid}`)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageAsUrl((prevObject) => ({
          ...prevObject,
          imgUrl: fireBaseUrl,
        }));
      });
  }, []);
  console.log(!imageAsUrl, imageAsUrl);
  const handleImageAsFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageAsUrl({ imgUrl: e.target.result });
        console.log(imageAsUrl);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  const handleFireBaseUpload = async (e) => {
    e.preventDefault();
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/users/${currentUser.uid}/pfp${currentUser.uid}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // storage
        //   .ref(`users/${currentUser.uid}/`)
        //   .child(imageAsFile.name)
        //   .getDownloadURL()
        //   .then((fireBaseUrl) => {
        //     setImageAsUrl((prevObject) => ({
        //       ...prevObject,
        //       imgUrl: fireBaseUrl,
        //     }));
        //   });
      }
    );
    uploadTask.then((doc) => {
      console.log("xd");
      setTimeout(() => {
        history.push("/");
      }, 3000);
    });
  };
  return (
    <div className="degradado fondo">
      <form className="form-perfil" onSubmit={handleFireBaseUpload}>
        <h1>Carga una imagen de perfil!</h1>
        <div className="file-form">
          {imageAsUrl.imgUrl == "" ? (
            <img src={blankImaage} width="100px" />
          ) : (
            <img src={imageAsUrl.imgUrl} />
          )}
          <input
            className="image-input"
            type="file"
            onChange={handleImageAsFile}
          />
        </div>
        <button className="primario">Subir Imagen</button>
      </form>
      {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
    </div>
  );
}

export default Index;
