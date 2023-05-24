import { Request, Response } from "express";
import { Document } from "mongoose";
import Product, { IProduct } from "../models/product.model";
import path from "path";
// Controlador para la ruta GET /products

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};
// Controlador para la ruta GET /products/:id
export async function getProductById(req: Request, res: Response) {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send(product);
  } catch (err: any) {
    res.status(500).send(err);
  }
}

// Controlador para la ruta POST /products
export async function createProduct(req: Request, res: Response) {
  try {
    const file = req.file as Express.Multer.File;
    const imagePath = file ? file.filename : "";
    const product: IProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      image: imagePath,
      description: req.body.description,
      quantity: req.body.quantity,
      category: req.body.category,
    });

    await product.save();
    console.log(product);
    res.status(201).send(product);
  } catch (err: any) {
    res.status(500).send(err);
  }
}

// Controlador para la ruta PUT /products/:id
export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = req.params.id; // Obtén el ID del producto a actualizar desde los parámetros de la solicitud
    const updatedFields = req.body; // Obtén los campos actualizados desde el cuerpo de la solicitud

    // Utiliza el método findByIdAndUpdate para buscar y actualizar el producto
    const product: IProduct | null = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      {
        new: true, // Devuelve el producto actualizado en lugar del producto anterior
      }
    );

    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.send(product);
  } catch (err: any) {
    res.status(500).send(err);
  }
}

// Controlador para la ruta DELETE /products/:id
async function deleteProduct(req: Request, res: Response) {
  try {
    const product: IProduct | null = await Product.findByIdAndDelete(
      req.params.id
    );
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send({ message: "Producto eliminado correctamente" });
  } catch (err: any) {
    res.status(500).send(err);
  }
}
