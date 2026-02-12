import { number, safeParse, pipe, transform, string, parse } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price, //+ para convertir el string a number
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
      
    } else {
      throw new Error("Datos no válidos");
    }

  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const {data} = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);

    if(result.success) {
      return result.output
    }else{
      throw new Error("Hubo un error...");
    }

  } catch (error) {
    console.log(error);
  }
}
export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const {data} = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);
    if(result.success) {
      return result.output
    }else{
      throw new Error("Hubo un error...");
    }

  } catch (error) {
    console.log(error);
  }
}
export async function updateProduct(id: Product["id"], data: ProductData){
  try {
    
    const NumberSchema =  pipe(string(), transform(Number), number())//esquema para convertir el price a number con vlaibot
    
    const result = safeParse(ProductSchema, {
      id: id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: data.availability === "true" ? true : false
    })

    if(result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
    
  } catch (error) {
    console.log(error);
  }

}
