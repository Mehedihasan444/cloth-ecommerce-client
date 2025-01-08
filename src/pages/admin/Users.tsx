import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ban, CheckCircle, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TUser } from '@/Interface';
import Swal from 'sweetalert2';
import useAxiosPublic from '@/hooks/useAxiosPublic';

export default function AdminUsers() {
  const [users, setusers] = useState<TUser[]>([]);
  const axios=useAxiosPublic();
    useEffect(() => {
      fetch("http://localhost:5000/admin/users")
        .then((res) => res.json())
        .then((data) => {
          setusers(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          toast.error('Failed to fetch products');
        });
    }, [users]);


   const handleDelete = async (id:string) => {
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
              .delete(`/users/${id}`)
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
    const updateStatus = async (email: string, status: string) => {
      try {
        const res = await axios.put(`/users/${email}`, { status });
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
      <h1 className="text-3xl font-bold mb-8">Users</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user:TUser) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.createdAt.slice(0,10)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" >
                    {user.status === 'active' ? (
                      <Ban className="h-4 w-4" onClick={()=>updateStatus(user.email,"blocked")}/>
                    ) : (
                      <CheckCircle className="h-4 w-4"  onClick={()=>updateStatus(user.email,"active")}/>
                    )}
                  </Button>
                  <Button variant="ghost" onClick={()=>handleDelete(user._id)}>
                    <Trash className="h-4 w-4" />
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