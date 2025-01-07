import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Plus, Trash2 } from 'lucide-react';
import AddProductModal from '../modals/AddProductModal';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import UpdateProductModal from '../modals/UpdateProductModal';

export default function AdminProducts() {
  const axios=useAxiosPublic();
  const [products, setproducts] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/admin/products")
        .then((res) => res.json())
        .then((data) => {
          setproducts(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          toast.error('Failed to fetch products');
        });
    }, [products]);

    const handleDelete = async (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const callBackFunction = async () => {
            await axios
              .delete(`/admin/products/${id}`)
              .then((res) => {
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                } else {
                  Swal.fire({
                    title: "Error!",
                    text: "Something went wrong.",
                    icon: "error",
                  });
                }
              });
          };
          callBackFunction();
        }
      });
    };
  return (
    <div className="container mx-auto px-4 py-8">
      <AddProductModal />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right flex gap-5">
                    <UpdateProductModal Product={product} />
                    <Trash2 onClick={()=>handleDelete(product._id)} className="h-4 w-4 text-red-600 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}