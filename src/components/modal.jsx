import React, { useState } from "react";
import "./modalstyle.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Mod(props) {


  return (
    <div className="App" >

      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.toggleModal}
        contentLabel="My dialog"
      >
        <span onClick={props.toggleModal}>X</span>
        <div > <center><img style={{width:'70%',height:'60vh',cursor:'pointer',margin:'0',padding:'0'}}  src={props.ipath} /></center></div>
       
      </Modal>
    </div>
  );
}
