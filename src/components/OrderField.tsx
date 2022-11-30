import { BsFillTrashFill } from "react-icons/bs";
import { Badge, Button, Container, ListGroup, Stack } from "react-bootstrap";
import { useAppContext } from "../context/UseStateContext";
import Alert from "./Alert";
import Counter from "./Counter";
import newOrderSound from "../../public/sounds/new_order_notification.wav";

const notificationSound = new Audio(newOrderSound);

const OrderField = ({ table_num, items, place, fullOrder, order_id, time }) => {
  const {
    updateFinishedOrders,
    setCompletedOrders,
    completedOrders,
    setShowAlert,
  } = useAppContext();

  return (
    <ListGroup.Item className="card">
      <div className="card-head">
        <Stack direction="horizontal" className="card-head-items">
          <h5>
            {place ? place + "," : null} Table {table_num}
          </h5>
          <div className="ms-auto badge-primary">
            <Counter time={time} /> mins ago
          </div>
        </Stack>
      </div>
      <Container fluid className="card-body">
        {items.map((item) => (
          <div key={item.id}>
            <Stack direction="horizontal">
              <p>
                {item.quantity} &times; {item.name}
              </p>
            </Stack>
          </div>
        ))}
        <div className="card-btn-area">
          <button
            className="btn-success"
            onClick={() =>
              updateFinishedOrders(
                fullOrder,
                setCompletedOrders,
                completedOrders,
                completedOrders
              )
            }
          >
            Completed
          </button>
          <button className="btn-danger" onClick={() => setShowAlert(true)}>
            <BsFillTrashFill />
          </button>
          <Alert fullOrder={fullOrder} />
        </div>
      </Container>
    </ListGroup.Item>
  );
};

export default OrderField;
