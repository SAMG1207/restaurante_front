import React from "react";

export const Encabezado = ({ nombre }) => {
  return (
    <div className="container-fluid">
      <div className="row bg-dark text-center">
        <h1 className="d-block text-light">Atención a Mesas</h1>
        <h2 className="text-light">Restaurante {nombre}</h2>
      </div>
    </div>
  );
};
