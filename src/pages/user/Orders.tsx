import { useContext, useEffect, useState } from 'react';
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
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { TOrder } from '@/Interface';
import Swal from 'sweetalert2';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { AuthContext } from '@/AuthProvider/Authprovider';



export default function UserOrders() {
  const [orders, setorders] = useState<TOrder[] | []>([]);
  const authContext = useContext(AuthContext);
  const user = authContext ? authContext.user : null;
  const axios = useAxiosPublic();
  useEffect(() => {
    const fetchOrders = async () => {
      fetch(`http://localhost:5000/orders/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setorders(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          toast.error('Failed to fetch products');
        });
    }
    if (user?.email && orders.length === 0) {
      fetchOrders();
    }
  }, [orders, user?.email]);


  const handleDelete = async (id: string) => {
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
            .delete(`/orders/${id}`)
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
                <TableCell>{order?.products?.map(() => {
                  return order.products.length
                })} items</TableCell>
                <TableCell>${order.total_bill}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => handleDelete(order._id)} variant="ghost" >
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