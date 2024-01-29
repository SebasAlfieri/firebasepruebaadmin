"use client";
import React, { useState } from "react";
import { createPost } from "@/lib/firebase";
import s from "./ItemCreator.module.css";
import Image from "next/image";
import { FormData } from "@/types/model";
import { Product } from "@/components";

interface InputChangeEvent {
  target: {
    name: string;
    value: string;
  };
}

const ItemCreator = () => {
  const [imageBase64, setImageBase64] = useState<string>("");

  function handlePost(event: React.FormEvent) {
    event.preventDefault();
    const orderData = {
      name: dataForm.name,
      value: dataForm.value,
      type: dataForm.type,
      image: imageBase64,
    };

    createPost(orderData);
  }

  const [dataForm, setDataForm] = useState<FormData>({
    name: "",
    value: 0,
    type: "",
  });

  function inputChangeHandler(evento: InputChangeEvent) {
    let inputName = evento.target.name;
    let value = evento.target.value;

    const newDataForm: FormData = {
      ...dataForm,
      [inputName]: value,
    };

    setDataForm(newDataForm);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
    }
  }

  return (
    <div className={s.container}>
      <Product
        name={dataForm.name ? dataForm.name.toString() : "nombre"}
        value={dataForm.value ? dataForm.value : 0}
        img={imageBase64}
      />
      <h3>{dataForm.name}</h3>
      <h4>{dataForm.value}</h4>

      <form onSubmit={handlePost}>
        <input
          type="text"
          className="inputText"
          onChange={inputChangeHandler}
          value={dataForm.name}
          name="name"
          placeholder="producto"
          required
        />
        <input
          type="number"
          className="inputNumber"
          onChange={inputChangeHandler}
          value={dataForm.value}
          name="value"
          placeholder="value"
          required
        />
        <select
          value={dataForm.type}
          onChange={inputChangeHandler}
          name="type"
          required
        >
          <option value="">Tipo de comida</option>
          <option value="bebida">Bebida</option>
          <option value="burga">Burga</option>
          <option value="pizza">Pizza</option>
        </select>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*" // Aceptar solo archivos de imagen
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default ItemCreator;
