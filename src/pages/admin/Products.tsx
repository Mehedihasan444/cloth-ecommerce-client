import { Button } from '@/components/ui/button';
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

export default function AdminProducts() {
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
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}