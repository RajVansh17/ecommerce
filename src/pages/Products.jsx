import { ProductCard } from "../components/ProductCard";
import { product } from "../data/product.js";

export const Products = () => {
  return (
    <div className="grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-5
    gap-6">
        {product.map(product => (

            <ProductCard
            key={product.id}
            product={product}
            />
        )
        )}
    </div>
  )
}
