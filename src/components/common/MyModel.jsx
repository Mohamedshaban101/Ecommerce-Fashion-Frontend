import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const MyModal = ({show , onClose , user}) => {
  return (
    <>

      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <div className="mt-4">

            <div className={'d-flex justify-content-between align-items-center'}>
                <div>id</div>
                <div>{user.id}</div>
            </div>
            <hr />
            <div className={'d-flex justify-content-between align-items-center'}>
                <div>Name</div>
                <div>{user.name}</div>
            </div>
            <hr />
            <div className={'d-flex justify-content-between align-items-center'}>
                <div>Email</div>
                <div>{user.email}</div>
            </div>
            
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
