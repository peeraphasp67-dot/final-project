import ProductsPage from "../../page";

export default function CategoryList({ params }) {
  return <ProductsPage category={params.category} />;
}

