import  { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { toast } from 'sonner';
import { TOrder } from '@/Interface';



export default function UserOrders() {
  const [orders, setorders] = useState<TOrder[] | []>([]);
    useEffect(() => {
      fetch("http://localhost:5000/orders")
        .then((res) => res.json())
        .then((data) => {
          setorders(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          toast.error('Failed to fetch products');
        });
    }, [orders]);
  return (
    <div className=" mx-auto px-4 py-8l">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="rounded-md border w-900px">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.code}</TableCell>
                <TableCell>{order.ordered_date}</TableCell>
                <TableCell>{order?.products?.map(()=>{
                  return order.products.length
                })} items</TableCell>
                <TableCell>${order.total_bill}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" >
                    <Eye className="h-4 w-4" />
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