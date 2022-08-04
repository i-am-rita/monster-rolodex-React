import React from "react";
import Modal from "react-modal";

export default function MyModal(props) {
//   console.log(props.rita);
  if (!props.rita) {
    return "";
  }
  return (
    <>
      <Modal isOpen={props.open}>
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="button">
              <button
                onClick={() => {
                  props.close(false);
                }}
              >
                X
              </button>
            </div>

            <div className="title">
              <h3>Name: {props.rita.name}</h3>
              <h3>Email: {props.rita.email}</h3>
              <h3>Company: {props.rita.company.name}</h3>
              <h3>Catch Phrase: {props.rita.company.catchPhrase}</h3>
              <h3>Phone:{props.rita.phone}</h3>
              <h3>Website: {props.rita.website}</h3>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
