import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppContext } from "../context/UseStateContext";

const Alert = ({ fullOrder }) => {
  const { order_id, table_num } = fullOrder;
  const {
    setShowAlert,
    showAlert,
    updateFinishedOrders,
    setDeletedOrders,
    deletedOrders,
  } = useAppContext();
  console.log(fullOrder);
  return (
    <Modal show={showAlert} onHide={() => setShowAlert(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete order #{order_id} of table {table_num}?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            updateFinishedOrders(
              fullOrder,
              setDeletedOrders,
              deletedOrders,
              deletedOrders
            );
            setShowAlert(false)
          }}
        >
          Yes
        </Button>
        <Button variant="primary" onClick={() => setShowAlert(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Alert;
