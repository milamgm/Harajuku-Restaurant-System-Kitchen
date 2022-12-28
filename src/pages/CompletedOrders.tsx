import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import { useAppContext } from "../context/UseStateContext";
import db from "../firebase/firebaseConfig.js";
import { IOrder } from "../types/types";

//SHOWS TODAY'S COMPLETED ORDERS IN ORDER OF ARRIVAL (FROM NEWEST TO OLDEST).
const CompletedOrders = () => {
  const { completedOrders, setCompletedOrders } = useAppContext();
  const currentDate = new Date();
  const ordersPerArrival = [...completedOrders].sort((a, b) => {
    return new Date(b.time).valueOf() - new Date(a.time).valueOf();
  });

  useEffect(() => {
    onSnapshot(collection(db, "completedOrders"), (snapshot) => {
      setCompletedOrders([]);
      snapshot.docs.forEach((doc) => {
        const orderFetch = doc.data() as IOrder;
        if (
          new Date(orderFetch.time).getFullYear() ===
            currentDate.getFullYear() &&
          new Date(orderFetch.time).getMonth() === currentDate.getMonth() &&
          new Date(orderFetch.time).getDate() === currentDate.getDate()
        ) {
          setCompletedOrders((prevCompletedOreders) => [
            ...prevCompletedOreders,
            orderFetch,
          ]);
        }
      });
    });
  }, []);
  return (
    <Container>
      {ordersPerArrival.length > 0 &&
        ordersPerArrival.map((completedOrder) => (
          <Accordion key={completedOrder.order_id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Order #{completedOrder.order_id}
                <span className="ms-auto">
                  Table {completedOrder.table_num}
                </span>
                <small className="ms-auto text-muted">
                  Created at{" "}
                  {new Date(completedOrder.time).toLocaleString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs="8">Ordered Items</Col>
                </Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th># ID</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="text-muted">{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      {ordersPerArrival.length === 0 && (
        <div className="mt-5 ms-5">
          <h2>No orders have been completed today yet.</h2>
          <h5>
            If you wish to check the previous days' orders, please refer to the
            Harajuku Admin App.
          </h5>
        </div>
      )}
    </Container>
  );
};

export default CompletedOrders;
