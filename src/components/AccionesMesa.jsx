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

  const handleCerrarMesa = () => {
    // Lógica para cerrar la mesa
    // Puedes implementar la lógica que necesites aquí
    console.log(`Cerrando la mesa ${number}`);
  };

  return (
    <div className="container mt-3 d-flex justify-content-center">
      {estado === "open" ? (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-danger d-block mb-3"
            onClick={handleCerrarMesa}
          >
            Cerrar Mesa
          </button>
          <Consumido mesa={number} />
          <Menu></Menu>
        </div>
      ) : (
        <button type="button" className="btn btn-success">
          Abrir Mesa
        </button>
      )}
    </div>
  );
};
