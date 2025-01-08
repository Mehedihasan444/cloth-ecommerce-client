import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TOrder } from '@/Interface';
import useAxiosPublic from '@/hooks/useAxiosPublic';

export default function AdminOrders() {
  const [orders, setorders] = useState<TOrder[] | []>([]);
  const axiosPublic = useAxiosPublic();
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



  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await axiosPublic.put(`/orders/${id}`, { status });
      console.log(res);
      if (res.data.modifiedCount > 0) {
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: TOrder) => (
              <TableRow key={order._id}>
                <TableCell>{order.code}</TableCell>
                <TableCell>{order.userEmail}</TableCell>
                <TableCell>{order.ordered_date}</TableCell>
                <TableCell>${order.total_bill}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select defaultValue={order.status} onValueChange={(value) => updateStatus(order._id, value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}