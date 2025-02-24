import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51MZZ3QSHEDkedxN5G1SDOxK8lChku9wNPCgboClRyrtjiTCenVs1ZdHdQLQwCtexbjwvXnJKkgXPBoibLsywEgaB00KezNQwpn"
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      dispatch({
        type: "SET_USER",
        user: { email: "user@example.com" }, // Replace with actual user data from backend
      });
    } else {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
