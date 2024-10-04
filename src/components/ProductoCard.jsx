import React from "react";

export const ProductoCard = ({ producto, onOpenModal }) => {
  return (
    <div className="col-md-12 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <button
            className="btn btn-primary w-100 border border-dark"
            onClick={() => onOpenModal(producto)} // Pasamos el producto al abrir modal
          >
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text">
              <strong>Precio:</strong> €{producto.precio}
            </p>
            <p className="card-text">
              <strong>Descripción:</strong> {producto.descripcion}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
