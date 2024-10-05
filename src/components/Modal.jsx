import React, { useState } from "react";

export const Modal = ({ mesa, producto, onClose }) => {
  const [cantidad, setCantidad] = useState();
  console.log(`mesa: ${mesa}`);
  const handlePedido = async () => {
    const url = `https://localhost/restaurante/addproduct`;
    const data = {
      mesa: parseInt(mesa),
      id_producto: parseInt(producto.id_producto),
      cantidad: parseInt(cantidad),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    const result = await response.json();
    if (response.status === 201 || result.status === "success") {
      console.log("Pedido realizado con éxito.");
      onClose(); // Cerrar el modal tras éxito
    } else {
      console.log("Error al realizar el pedido.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{producto.nombre}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Mesa: {mesa}</p>
            <p>Precio: {producto.precio}</p>
            <p>{producto.descripcion}</p>

            {/* Control para seleccionar la cantidad */}
            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                className="form-control"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min="1"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePedido}
            >
              Pedir
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
