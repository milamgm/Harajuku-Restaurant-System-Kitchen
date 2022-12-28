import { Button, Modal } from "react-bootstrap";
import { useAppContext } from "../context/UseStateContext";
import { IOrder } from "../types/types";

type AlertProps = {
  fullOrder: IOrder;
};
////////ORDER DELETION CONFIRMATION MODAL
const Alert = ({ fullOrder }: AlertProps) => {
  const { order_id, table_num } = fullOrder;
  const { setShowAlert, showAlert, updateFinishedOrders, setDeletedOrders } =
    useAppContext();
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
            updateFinishedOrders(fullOrder, setDeletedOrders);
            setShowAlert(false);
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
