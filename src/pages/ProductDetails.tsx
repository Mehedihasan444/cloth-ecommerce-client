import { AuthContext } from "@/AuthProvider/Authprovider";
import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { TProduct } from "@/Interface";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<TProduct | null>(null);
    const axiosPublic = useAxiosPublic();
    const authContext = useContext(AuthContext);
    const user = authContext ? authContext.user : null;
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axiosPublic.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        if (id && !product) {
            fetchProduct();

        }

    }, [axiosPublic, id, product]);
    const handleCart = async (product: TProduct) => {
        if (!user) {
            toast.warning('Please login to add to cart');
            window.location.assign('/login');
            return;

        }
        try {
            const res = await axiosPublic.post('/cart', { ...product, email: user.email, quantity: 1 });
            console.log(res.data)
            if (res.data.insertedId)
                toast.success('Product added to cart');
            if (res.data.message === 'already exists') {
                toast.warning('product already exist in your cart');

            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to add to cart');
        }

    }
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
                    <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
                    <Button onClick={() => handleCart(product)}>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;