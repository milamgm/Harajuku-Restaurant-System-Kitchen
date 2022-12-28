import { BsFillTrashFill } from "react-icons/bs";
import {Container, ListGroup, Stack } from "react-bootstrap";
import { useAppContext } from "../context/UseStateContext";
import Alert from "./Alert";
import Counter from "./Counter";
import newOrderSound from "../../public/sounds/new_order_notification.wav";
import { IItem, IOrder } from "../types/types";
//const notificationSound = new Audio(newOrderSound);

type OrderFieldProps = {
  table_num: number;
  items: IItem[];
  fullOrder: IOrder;
  order_id: string;
  time: number;
};
//////////FIELD THAT DISPLAYS THE ORDER DATA ON THE ACTIVEORDERS PAGE
const OrderField = ({
  table_num,
  items,
  fullOrder,
  order_id,
  time,
}: OrderFieldProps) => {
  const {
    updateFinishedOrders,
    setCompletedOrders,
    setShowAlert,
  } = useAppContext();

  return (
    <ListGroup.Item className="card">
      <div className="card-head">
        <Stack direction="horizontal" className="card-head-items">
          <h5>
            Table {table_num}
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
