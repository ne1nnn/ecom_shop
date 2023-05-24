import { Schema, model, Document } from "mongoose";

// Interfaz que define la estructura de un documento de producto
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

// Definición del esquema de Mongoose para el producto
const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
});

// Creación del modelo de producto utilizando el esquema definido
const Product = model<IProduct>("Product", productSchema);
export default Product;
