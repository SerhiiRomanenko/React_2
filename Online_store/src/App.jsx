import { useState, useEffect } from "react";
import service from "./services/mockapi";

function App() {
  const [trailers, setTrailers] = useState([]);

  const getData = async () => {
    try {
      const response = await service.get("trailers");
      setTrailers(response.data.trailers);
      console.log(response.data.trailers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="trailers"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        textAlign: "center",
      }}
    >
      {trailers.length > 0
        ? trailers.map((trailer) => {
            return (
              <div
                className="trailer__card"
                style={{ border: "1px solid black", width: "200px" }}
                key={trailer.id}
              >
                <p>{trailer.brand}</p>
                <p>{trailer.model}</p>
                <p>{trailer.price}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
