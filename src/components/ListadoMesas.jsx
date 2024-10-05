import React from "react";
import { useState } from "react";

export const ListadoMesas = ({ number, setMesaATrabajar }) => {
  const mesas = [];

  const [table, setTable] = useState("");
  const escogeMesa = (e) => {
    let nroMesa = parseInt(e.target.value);
    setMesaATrabajar(nroMesa);
    setTable(nroMesa);
  };

  // Generar las mesas en un bucle 'for'
  for (let i = 1; i <= number; i++) {
    mesas.push(
      <div className="col-auto" key={i}>
        <button
          type="button"
          className="btn btn-primary mt-1"
          value={i}
          onClick={escogeMesa}
        >
          Mesa {i}
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row d-flex justify-content-evenly">{mesas}</div>
      <div>
        <h4 className="text-center mt-4">
          Está trabajando con la mesa {table}
        </h4>
      </div>
    </div>
  );
};
