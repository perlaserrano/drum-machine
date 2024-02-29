import React, { useState } from "react";
import DrumPad from "./DrumPad";
import drumSounds from "../helpers/drumSounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

const DrumMachine = () => {
  const [soundDescription, setSoundDescription] = useState("");
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(50);
  const [bank, setBank] = useState(0);

  const handlePadClick = (description) => {
    setSoundDescription(description);
  };

  const togglePower = () => {
    setPower(!power);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    setSoundDescription(`Volumen: ${value}`);
  };

  const toggleBank = () => {
    setBank(bank === 0 ? 1 : 0);
  };

  const powerButtonStyle = {
    float: power ? "right" : "left"
  };
  const bankButtonStyle = {
    float: bank ? "right" : "left"
  };


  const currentSounds = bank === 0 ? drumSounds.slice(0, 9) : drumSounds.slice(9);

  return (
    <div id="drum-machine" className="inner-container">
      <div className="drum-pads pad-bank">
        {currentSounds.map((pad) => (
          <DrumPad
            key={pad.keyTrigger}
            keyTrigger={pad.keyTrigger}
            clip={pad.url}
            clipDescription={pad.id}
            handlePadClick={handlePadClick}
            power={power}
            volume={volume / 100}
            handleVolumeChange={handleVolumeChange}
          />
        ))}
      </div>
      <div className="controls-container">
        <div className="control">
          <p>Power</p>
          <div className="select" onClick={togglePower}>
            <div className="inner" style={powerButtonStyle}></div>
          </div>
        </div>
        <p id="display">{soundDescription}</p>
        <div className="volume-slider">
          <input
            max="100"
            min="0"
            step="1"
            type="range"
            value={volume}
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </div>
        <div className="control">
          <p>Bank</p>
          <div className="select" onClick={toggleBank}>
            <div className="inner" style={bankButtonStyle}></div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-icons">
          <a href="https://www.linkedin.com/in/perla-serrano-257b9217b/" target="_blank" rel="noopener">
            <div style={{ color: "blue", fontSize: "30px" }}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
          </a>
          <a href="https://github.com/perlaserrano" target="_blank" rel="noopener">
            <div style={{ color: "black", fontSize: "30px" }}>
              <FontAwesomeIcon icon={faGithub} />
            </div>
          </a>
        </div>
        <div className="footer-text">Created by Perla Serrano, © 2024.</div>
      </footer>
    </div>
  );
};

export default DrumMachine;
