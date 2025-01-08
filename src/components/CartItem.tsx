import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { toast } from 'sonner';

interface CartItemProps {
  _id: string;
  name: string;
  image: string;
  price: number;
  discount:number;
  email: string;
  quantity: number;
}
const CartItem: React.FC<CartItemProps> = ({
  _id,
  name,
  price,
  discount,
  quantity = 1,
  image,

}) => {
  const axiosPublic = useAxiosPublic();
  const onRemove = async (_id: string) => {
    try {
      const res = await axiosPublic.delete(`/cart/${_id}`);
      console.log(res.data);
      if (res.data.deletedCount) {
        console.log("Item removed from cart");
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);

    }
  }
  const onUpdateQuantity = async (_id: string, quantity: number) => {
    try {
      const res = await axiosPublic.put(`/cart/${_id}`, { quantity });
      console.log(res.data);
      if (res.data.modifiedCount) {
        console.log("Item quantity updated");
        toast.success('Item quantity updated');
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);

    }
  }
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img src={image} alt={name} className="w-24 h-24 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600">
        {
          discount>0 ? <p className='flex gap-4'> <span className='line-through text-gray-400'>${price} </span> ${price - (price*discount)/100} </p>:<p>${price}</p>
        }
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(_id, quantity - 1)}
            className="p-1 rounded-md hover:bg-gray-100"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(_id, quantity + 1)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">${(price * quantity)}</p>
        <button
          onClick={() => onRemove(_id)}
          className="text-rose-600 hover:text-rose-700 mt-2"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;