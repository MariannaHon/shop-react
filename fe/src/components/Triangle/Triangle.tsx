import { Product } from "@/models/product";

interface TriangleProps {
    product: Product
}

const Triangle = ({ product }: TriangleProps) => {
    return (
        <div>
            {product.price <= 80 ? (
                <p className="triangle triangle-sale">Sale</p>
            ) : (
                ''
            )}
            {product.sold < 30 ? (
                <p className="triangle triangle-new">New</p>
            ) : (
                ''
            )}
        </div>
    );
};

export default Triangle;
