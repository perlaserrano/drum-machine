import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";

const DrumPad = ({ keyTrigger, clip, clipDescription, handlePadClick, power, volume }) => {
  const audioRef = useRef(null);

  const handleClick = () => {
    if (power) {
      handlePadClick(clipDescription);
      const audio = audioRef.current;
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play()
        .catch(error => {
          console.error('Error al reproducir audio:', error);
        });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === keyTrigger && power) {
        handleClick();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [keyTrigger, handleClick, power, volume]);

  const padStyle = {
    backgroundColor: power ? "#ED7EA4" : "#1E6BA2",
    height: 77,
    width: 77,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "#fff",
    cursor: "pointer",
    userSelect: "none",
    transition: "background-color 0.3s, box-shadow 0.3s",
  };

  return (
    <>
      <div className="drum-pad" id={clipDescription} onClick={handleClick} style={padStyle}>
        {keyTrigger}
        <audio ref={audioRef} className="clip" id={keyTrigger} src={clip}></audio>
      </div>
      <div className="logo">
        <div className="inner-logo" style={{ color: "#fff", fontSize: "20px" }}>FCC&nbsp;</div>
        <FontAwesomeIcon style={{ color: "#fff", fontSize: "20px" }} icon={faFreeCodeCamp} title="no-stack-dub-sack" />
      </div>
    </>
  );
};

export default DrumPad;
