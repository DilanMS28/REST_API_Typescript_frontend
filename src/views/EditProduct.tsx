import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMesagge from "../components/ErrorMessage";
import {getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductById(Number(params.id));
        if (!product) {
            return redirect("/");//si no se encuentra el producto, redirige a la vista principal
        }
        return product;
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = "";
    if (Object.values(data).includes("")) {
        error = "Todos los campos son obligatorios";
    }
    if (error.length) {//si hay error, se retorn el error para mostrarlo en la vista
        return error;
    }

    if (params.id !== undefined) {
        await updateProduct(+params.id, data);
    }

    return redirect("/");//redirección a la vista principal;
}

const availabilityOptions = [
    { name: "Disponible", value: "true" },
    { name: "No Disponible", value: "false" },
]

export default function EditProduct() {

    const product = useLoaderData() as Product;

    const error = useActionData() as string;

    return (


        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link to={"/"} className="rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">Volver a Productos</Link>
            </div>

            {error && <ErrorMesagge>{error}</ErrorMesagge>}

            <Form className="mt-10" method="POST">

                <div className="mb-4">
                    <label htmlFor="name" className="text-gray-800">Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre del Producto"
                        name="name"
                        defaultValue={product.name}
                        className="mt-2 block w-full p-3 bg-gray-50"
                    />
                </div>

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="price">Precio:</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        defaultValue={product.price}
                        className="mt-2 block w-full p-3 bg-gray-50"
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    value="Registrar Producto"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                />

            </Form>
        </>
    );
}
