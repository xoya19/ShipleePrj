import { useLocalStorage } from "usehooks-ts";
import "./index.css";
import { useEffect, useRef } from "react";

export default function App() {
  const [isBooked, setIsBooked] = useLocalStorage("isBooked", false);
  const [pickupAdd, setPickupAdd] = useLocalStorage("pickupAdd", "");
  const [deliveryAdd, setDeliveryAdd] = useLocalStorage("deliveryAdd", "");
  const [courier, setCourier] = useLocalStorage("courier", "");
  const [weight, setWeight] = useLocalStorage("weight", "");
  const [isCalc, setIsCalc] = useLocalStorage("isCalc", false);
  const [shipmentCost, setShipmentCost] = useLocalStorage("shipmentCost", null);

  const costBoxRef = useRef(null); // Ref for the cost box
  const bookingPageRef = useRef(null); // Ref for the booking page

  function handleBooking() {
    setIsBooked(true);
  }

  function handleSave() {
    if (!pickupAdd.trim() || !deliveryAdd.trim() || !courier || !weight.trim()) {
      alert("Please fill all fields before saving.");
      return;
    }

    setTimeout(() => {
      const cost = Math.floor(Math.random() * 500) + 100; // Random cost between 100-600
      setShipmentCost(cost);
      setIsCalc(true);
    }, 1000);
  }

  function handleReturnHome() {
    // Clear localStorage
    localStorage.clear();

    // Reset state values
    setIsBooked(false);
    setPickupAdd("");
    setDeliveryAdd("");
    setCourier("");
    setWeight("");
    setIsCalc(false);
    setShipmentCost(null);
  }

  // Scroll to cost box when it appears
  useEffect(() => {
    if (isCalc && shipmentCost !== null && costBoxRef.current && bookingPageRef.current) {
      // Fade in the cost box and return button
      costBoxRef.current.classList.add("visible");

      // Smoothly scroll to the bottom of the booking page
      bookingPageRef.current.scrollTo({
        top: bookingPageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isCalc, shipmentCost]);

  return (
    <div className="container">
      {!isBooked ? (
        <div className="welcome-page">
          <h2>Welcome to the Shipment Booking</h2>
          <button onClick={handleBooking}>BOOK A SHIPMENT</button>
        </div>
      ) : (
        <div className="booking-page" ref={bookingPageRef}>
          <h4>Pickup Address Pincode:</h4>
          <textarea
            value={pickupAdd}
            onChange={(e) => setPickupAdd(e.target.value)}
            placeholder="Write Pickup Address Here..."
          />
          <h4>Delivery Address Pincode:</h4>
          <textarea
            value={deliveryAdd}
            onChange={(e) => setDeliveryAdd(e.target.value)}
            placeholder="Write Delivery Address Here..."
          />
          <h4>Parcel Weight:</h4>
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Enter weight in Kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <h4>Select Courier:</h4>
          <select value={courier} onChange={(e) => setCourier(e.target.value)}>
            <option value="">Select Courier</option>
            <option value="Delhivery">Delhivery</option>
            <option value="DTDC">DTDC</option>
            <option value="BlueDart">BlueDart</option>
            <option value="FedEx">FedEx</option>
          </select>
          <br />
          <button type="submit" onClick={handleSave}>
            Calculate Cost
          </button>

          {isCalc && shipmentCost !== null && (
            <div className="cost-box" ref={costBoxRef}>
              <h2>Cost Of Shipment: ₹{shipmentCost}</h2>
              <button onClick={handleReturnHome}>Return to Homepage</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
