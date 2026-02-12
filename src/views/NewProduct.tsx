import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMesagge from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {//si hay error, se retorn el error para mostrarlo en la vista
    return error;
  }

  await addProduct(data);

  return redirect("/");//redirección a la vista principal;
}

export default function NewProduct() {

  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
        <Link to={"/"} className="rounded-md p-3 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">Volver a Productos</Link>
      </div>

      {error && <ErrorMesagge>{error}</ErrorMesagge>}

      <Form className="mt-10" method="POST">

        <ProductForm />

        <input
          type="submit"
          value="Registrar Producto"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
        />

      </Form>
    </>
  );
}
