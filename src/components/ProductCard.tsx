import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { TProduct } from '@/Interface';
import { Star } from 'lucide-react';

interface Props {
    product: TProduct;
    handleCart: (product: TProduct) => void;
}
const ProductCard = ({ product, handleCart }: Props) => {

    const rating = Math.round(product?.rating) || 0;


    return (
        <Card key={product._id}>
            <CardHeader className="p-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className='hover:text-black/60 cursor-pointer' onClick={() => window.location.assign(`/product/${product._id}`)}>{product.name}</CardTitle>
                <CardDescription className="my-2">
                    {product.description}
                </CardDescription>
                <div className="flex items-center ">
                    {[...Array(Math?.round(rating))]?.map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                </div>
                <p className="text-lg font-semibold mt-2">
                    ${product?.price}
                </p>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={() =>
                        handleCart(product)
                    }
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;