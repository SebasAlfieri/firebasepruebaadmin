"use client";
import React, { useState } from "react";
import { deleteItem, getItems } from "@/lib/firebase";
const ProductsList = ({ data }: { data: any }) => {
  const [productos, setProductos] = useState(data);

  const handleDelete = async (itemId: string) => {
    try {
      await deleteItem(itemId);
      console.log("Documento eliminado correctamente");

      const updatedProductos = productos.filter(
        (item: any) => item.id !== itemId
      );
      setProductos(updatedProductos);
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  };

  return (
    <div>
      {data.map((item: any) => {
        return (
          <div key={item.id}>
            <h1>{item.nombre}</h1>
            <h2>${item.valor}</h2>
            <button onClick={() => handleDelete(item.id)}>Eliminar</button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
