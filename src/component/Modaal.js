import React from 'react'
import Modal from 'react-modal'
export default function Modaal(props) {
    console.log(props.item);
    return (
        <div>
            <Modal
             isOpen={props.open}>

                 <button onClick={() => 
                     {props.close(false)}
                 }>X</button>
             <div> 
            <h2>Modaaaal oooo!!!</h2>
            <p>name: {props.mons.name}</p>
            <p>email: {props.mons.email}</p>
            {/* <p>company: {props.mons.company}</p> */}
            </div>
            </Modal>
        </div>
    )
}
