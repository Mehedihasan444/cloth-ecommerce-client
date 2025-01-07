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
import { Ban, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [users, setusers] = useState([]);
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.createdAt.slice(0,10)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    {user.status === 'active' ? (
                      <Ban className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
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