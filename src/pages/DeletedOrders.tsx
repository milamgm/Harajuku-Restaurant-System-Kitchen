import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import { useAppContext } from "../context/UseStateContext";
import db from "../firebase/firebaseConfig.js";

const DeletedOrders = () => {
  const { deletedOrders, setDeletedOrders } = useAppContext();
  let orderDate;
  const currentDate = new Date();
  const ordersPerArrival = [...deletedOrders].sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });
  useEffect(() => {
    onSnapshot(collection(db, "deletedOrders"), (snapshot) => {
      setDeletedOrders([]);
      snapshot.docs.forEach((doc) => {
        if (
          new Date(doc.data().time).getFullYear() ===
            currentDate.getFullYear() &&
          new Date(doc.data().time).getMonth() === currentDate.getMonth() &&
          new Date(doc.data().time).getDate() === currentDate.getDate()
        ) {
          setDeletedOrders((prevProducts) => [...prevProducts, doc.data()]);
        }
      });
    });
  }, []);
  return (
    <Container>
      {ordersPerArrival.map((deletedOrder) => (
        <Accordion key={deletedOrder.order_id}>
          <Accordion.Item eventKey="0">
          <Accordion.Header>
              Order #{deletedOrder.order_id}
              <span className="ms-auto">Table {deletedOrder.table_num}</span>
              <small className="ms-auto text-muted">
              Ordered at {new Date(deletedOrder.time).toLocaleString("de-DE", {
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
                  {deletedOrder.items.map((item) => (
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
    </Container>
  );
};

export default DeletedOrders;
