import React from "react";
import { useState } from "react";
import { Encabezado } from "./Encabezado";
import { ListadoMesas } from "./ListadoMesas";
import { AccionesMesa } from "./AccionesMesa";
import { Footer } from "./Footer";
export const App = () => {
  const [mesaAtrabajar, setMesaATrabajar] = useState(0);
  return (
    <>
      <Encabezado nombre={"Napoles"} />
      <ListadoMesas number={parseInt(6)} setMesaATrabajar={setMesaATrabajar} />
      <AccionesMesa number={mesaAtrabajar}></AccionesMesa>
      <Footer></Footer>
    </>
  );
};
