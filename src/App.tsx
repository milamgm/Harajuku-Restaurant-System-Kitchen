import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppContextProvider } from "./context/UseStateContext";
import CompletedOrders from "./pages/CompletedOrders";
import DeletedOrders from "./pages/DeletedOrders";
import Orders from "./pages/Orders";
import "./styles/styles.css";

function App() {
  return (
    <div>
      <AppContextProvider>
        <>
          <Navbar />
          <Container fluid>
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/completedorders" element={<CompletedOrders />} />
              <Route path="/deletedorders" element={<DeletedOrders />} />
            </Routes>
          </Container>
        </>
      </AppContextProvider>
    </div>
  );
}

export default App;
