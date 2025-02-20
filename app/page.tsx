import ProductList from "./productList/pages";
import {getProducts} from "./servise/api";

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <>
      <ProductList list={products}/>
    </>
  );
}