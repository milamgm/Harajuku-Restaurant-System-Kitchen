import { Col, Container, Row } from "react-bootstrap";
import OrderField from "../components/OrderField";
import { useAppContext } from "../context/UseStateContext";

const Orders = () => {
  const { activeOrders } = useAppContext();
  const ordersPerArrival = [...activeOrders].sort((a, b) => {
    return new Date(a.time) - new Date(b.time);
  });
  return (
    <div>
      <Container fluid>
        <Row>
          {ordersPerArrival.map((order) => (
            <Col sm="6" md="6" lg="4" xl="3" key={order.order_id}>
              <div className="order_field mt-2">
                <OrderField {...order} fullOrder={order} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Orders;
