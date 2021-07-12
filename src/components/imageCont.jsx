import React,{useState} from 'react'
import Modal from './modal'
import './imageContStyle.css'

function ImageCont(props) {

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
      }
    return (
        <div>

        <div className="cart" onClick={toggleModal}>
              
        <center><img src={props.imgData}  /></center>
        {<Modal ipath={props.imgData} isOpen={isOpen} toggleModal={toggleModal}/>}

</div></div>

    )
}

export default ImageCont
