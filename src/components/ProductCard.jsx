
export const ProductCard = ({ product }) => {
    return (
        <div className="flex flex-row justify-center m-2 rounded p-4 border-2 w-auto">
            <div>
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-30" />

                <h2>{product.title}</h2>
                <p>${product.price}</p>
            </div>
        </div>
    );
}
