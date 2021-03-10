import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as ReactLeft } from "../../images/iconmonstr-angel-left-thin.svg";
import { ReactComponent as ReactRight } from "../../images/iconmonstr-angel-right-thin.svg";
import "./lobby.css";
function Conciertos({ data }) {
  const ref = useRef(null);
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);
  const checkScroll = () => {
    if (ref.current.scrollLeft === 0) {
      setLeft(false);
    } else {
      setLeft(true);
    }

    if (
      ref.current.scrollLeft ===
      ref.current.scrollWidth - ref.current.clientWidth
    ) {
      setRight(false);
    } else {
      setRight(true);
    }
  };
  const handleScroll = (scroll) => {
    ref.current.scrollBy({ left: scroll, behavior: "smooth" });
    setTimeout(() => checkScroll(), 450);
  };
  useEffect(() => {
    checkScroll();
  }, []);
  return (
    <>
      <div className="section">
        <h3 className="titulo-seccion">{data.title}</h3>
        <div className="prueba">
          {left && <LeftScrollButton handleScroll={handleScroll} />}
          {right && <RightScrollButton handleScroll={handleScroll} />}
          {/* <PopUp /> */}
          <div className="carousel" ref={ref}>
            {data.html}
          </div>
        </div>
      </div>
    </>
  );
}

const RightScrollButton = ({ handleScroll }) => {
  return (
    <div className="scroll-right" onClick={() => handleScroll(600)}>
      <ReactRight></ReactRight>
    </div>
  );
};
const LeftScrollButton = ({ handleScroll }) => {
  return (
    <div className="scroll-left" onClick={() => handleScroll(-600)}>
      <ReactLeft></ReactLeft>
    </div>
  );
};
export default Conciertos;
