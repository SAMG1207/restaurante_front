import React, { useEffect, useState } from "react";

export const Consumido = ({ mesa }) => {
  const [pedido, setPedido] = useState(null); // Cambiamos a null para representar que aún no hay pedido.
  const [verPedido, setVerPedido] = useState(false);

  // Esta función será responsable de obtener los pedidos desde la API
  const fetchPedido = async () => {
    try {
      const response = await fetch(
        `https://localhost/restaurante/verproductos/${parseInt(mesa)}`
      );
      const data = await response.json();
      if (data.status === "success") {
        setPedido(data.message); // Guardamos el objeto completo del mensaje.
      } else {
        setPedido(null); // Resetear a null si no hay éxito.
      }
    } catch (error) {
      console.log(error);
      setPedido(null); // Resetear a null en caso de error.
    }
  };

  // Este efecto se disparará cuando la mesa cambie
  useEffect(() => {
    fetchPedido();
  }, [mesa]); // Dependencia de mesa, se ejecuta cada vez que cambia

  const handleClick = () => {
    setVerPedido((prev) => !prev);
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        {verPedido ? "Ocultar Productos" : "Ver Productos"}
      </button>

      {verPedido && (
        <div>
          {pedido && pedido.pedidos && pedido.pedidos.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Ud.</th>
                  <th scope="col">Precio Total</th>
                  <th scope="col">Eliminar Producto</th>
                </tr>
              </thead>
              <tbody>
                {pedido.pedidos.map((item, index) => (
                  <tr key={item.id_producto}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.product}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.precioUnit}</td>
                    <td>{item.total_producto}</td>
                    <td>
                      <button className="btn btn-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3">
                    <b>Total Gastado</b>
                  </td>
                  <td colSpan="2">{pedido.totalGastado}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No hay productos consumidos.</p>
          )}
        </div>
      )}
    </>
  );
};
