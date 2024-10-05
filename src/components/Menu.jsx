import React, { useState, useEffect } from "react";
import { ProductoCard } from "./ProductoCard";
import { Modal } from "./Modal";

export const Menu = ({ mesa }) => {
  const [verMenu, setVerMenu] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menu, setMenu] = useState({
    pizzas: [],
    bebidas: [],
    cafes: [],
  });

  const categorias = [
    { key: "pizzas", nombre: "Pizzas" },
    { key: "bebidas", nombre: "Bebidas" },
    { key: "cafes", nombre: "Cafés" },
  ];

  // Función para abrir el modal con el producto seleccionado
  const handleOpenModal = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setProductoSeleccionado(null);
    setShowModal(false);
  };

  // Función para cargar el menú desde la API
  const fetchMenu = async () => {
    try {
      let responsePizza = await fetch("https://localhost/restaurante/pizzas");
      let responseBebidas = await fetch(
        "https://localhost/restaurante/bebidas"
      );
      let responseCafes = await fetch("https://localhost/restaurante/cafes");

      const dataPizza = await responsePizza.json();
      const dataBebidas = await responseBebidas.json();
      const dataCafes = await responseCafes.json();

      if (
        dataPizza.status === "success" &&
        dataBebidas.status === "success" &&
        dataCafes.status === "success"
      ) {
        setMenu({
          pizzas: dataPizza.message || [],
          bebidas: dataBebidas.message || [],
          cafes: dataCafes.message || [],
        });
      }
    } catch (error) {
      console.error("Error al cargar el menú:", error);
    }
  };

  // Controlar el estado del menú (ver/ocultar) y cargar el menú si es necesario
  const handleMenu = () => {
    if (!verMenu) {
      fetchMenu(); // Cargar el menú cuando se visualiza
    }
    setVerMenu((prev) => !prev);
  };

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleMenu}
          style={{ width: "200px" }}
        >
          {verMenu ? "Ocultar Menú" : "Ver Menú"}
        </button>
      </div>

      {verMenu && (
        <div className="row mt-3">
          {categorias.map((categoria) => (
            <div key={categoria.key} className="col-md-4">
              <h3>{categoria.nombre}</h3>
              {Array.isArray(menu[categoria.key]) &&
              menu[categoria.key].length > 0 ? (
                menu[categoria.key].map((producto) => (
                  <ProductoCard
                    key={producto.id_producto}
                    producto={producto}
                    onOpenModal={handleOpenModal} // Solo pasamos el producto
                  />
                ))
              ) : (
                <p>No hay productos disponibles en esta categoría.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Mostramos el modal si está abierto */}
      {showModal && (
        <Modal
          producto={productoSeleccionado}
          mesa={mesa} // Usamos la prop mesa aquí
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
