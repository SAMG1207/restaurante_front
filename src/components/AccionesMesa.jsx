import React, { useState, useEffect } from "react";
import { Consumido } from "./Consumido";
import { Menu } from "./Menu";

export const AccionesMesa = ({ number }) => {
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    if (number !== 0) {
      estadoMesa(number);
    }
  }, [number]);

  const estadoMesa = async (mesaNumber) => {
    try {
      const url = `https://localhost/restaurante/seeservice/${parseInt(
        mesaNumber
      )}`;

      const response = await fetch(url);

      const data = await response.json();
      setEstado(data.status);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMesa = async (number, action) => {
    const urlMesa = `https://localhost/restaurante/${action}`; // 'action' puede ser 'closeservice' o 'openservice'
    const dataMesa = { mesa: parseInt(number) };

    try {
      const response = await fetch(urlMesa, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMesa),
      });
      let data = await response.json();
      let statusTable = data.status;
      setEstado(statusTable);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-3">
      {estado === "open" ? (
        <div className=" row text-center d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-danger d-block mb-3"
            onClick={() => handleMesa(number, "closeservice")}
            style={{ width: "200px" }}
          >
            Cerrar Mesa
          </button>

          {/* Contenedor fijo para mantener la posición */}
          <div className=" row text-center d-flex justify-content-center">
            <Consumido mesa={number} />
          </div>
          <div className=" row text-center d-flex justify-content-center">
            <Menu mesa={number}></Menu>
          </div>
        </div>
      ) : (
        <div className="row text-center d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-success d-block mb-3"
            onClick={() => handleMesa(number, "openservice")}
            style={{ width: "200px" }}
          >
            Abrir Mesa
          </button>
        </div>
      )}
    </div>
  );
};
