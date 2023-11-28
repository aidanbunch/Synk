import { useState, useEffect } from "react";

export default function HotelPage() {
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual endpoint of your API
    fetch("/api/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendees: "100",
        cityCode: "SFO",
      }),
    })
      .then((response) => response.json())
      .then((data) => setHotelData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Hotel Offers</h1>
      {hotelData.length > 0 ? (
        <ul>
          {hotelData.map((hotel) => (
            <li key={hotel.hotelName}>
              <img src={hotel.imageUrl} alt={hotel.hotelName} />
              <p>{hotel.hotelName}</p>
              <p>Total Price: {hotel.totalPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
