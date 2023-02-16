import { Col, Container, Row } from "react-bootstrap";
import OrderField from "../components/OrderField";
import { useAppContext } from "../context/UseStateContext";

//SHOWS ACTIVE ORDERS IN ORDER OF ARRIVAL (FROM NEWEST TO OLDEST).
const Orders = () => {
  const { activeOrders } = useAppContext();
  const ordersPerArrival = [...activeOrders].sort((a, b) => {
    return (
      new Date(a.time.seconds * 1000).valueOf() -
      new Date(b.time.seconds * 1000).valueOf()
    );
  });
  return (
    <div>
      <Container fluid>
        <Row>
          {ordersPerArrival.length > 0 &&
            ordersPerArrival.map((order) => (
              <Col sm="6" md="6" lg="4" xl="3" key={order.order_id}>
                <div className="order_field mt-2">
                  <OrderField {...order} fullOrder={order} />
                </div>
              </Col>
            ))}
          {ordersPerArrival.length === 0 && (
            <div className="mt-5 ms-5">
              <h2>No active orders.</h2>
              <h5>
                Orders will be displayed here as soon as a customer places an
                order.
              </h5>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Orders;
