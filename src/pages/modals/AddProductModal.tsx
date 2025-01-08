import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "../../lib/uploadimage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductModal() {
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const axiosPublic = useAxiosPublic();
    interface ProductFormData {
        name: string;
        image: File | null;
        price: number;
        stock: number;
        category: string;
        description: string;
    }
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        image: null,
        price: 0,
        stock: 0,
        category: "",
        description: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImageFile( e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (imageFile) {
                const imageUploadRes = await uploadImage(imageFile);
                if (imageUploadRes.success) {
                   
                    const info = { ...formData, image: imageUploadRes.url as string };
                    const res = await axiosPublic.post('/products', info);
                    console.log(res);
                    if (res.data.insertedId) {
                        // Handle success
                        toast.success("product added successfully");
                        setOpen(false);
                    } else {
                        // Handle error
                        toast.error("Failed to add products");
                    }
                }


            }
            setOpen(false);
        } catch (error) {
            console.log(error);
            // Handle error
            toast.error("Failed to add medicine");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                className="p-2 border bg-transparent"
                                placeholder="Enter product name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            {/* <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                className="p-2 border bg-transparent"
                                placeholder="Enter category"
                                value={formData.category}
                                onChange={handleInputChange}
                            /> */}
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="basic-joggers">Basic Joggers</SelectItem>
                                    <SelectItem value="polo-tshirt">Polo T-shirt</SelectItem>
                                    <SelectItem value="narrow-pants">Narrow Pants</SelectItem>
                                    <SelectItem value="cargo-pants">Cargo Pants</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <div className="flex-1">
                                <Label htmlFor="stock">Stock</Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    className="p-2 border bg-transparent"
                                    placeholder="Enter stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    className="p-2 border bg-transparent"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image-upload">Upload Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden bg-transparent"
                                id="image-upload"
                                onChange={handleImageChange}
                            />
                            <Label
                                htmlFor="image-upload"
                                className="flex items-center gap-2 cursor-pointer border rounded-md p-2"
                            >
                                <ImagePlus className="h-4 w-4" />
                                {formData.image ? formData.image.name : "Upload Image"}
                            </Label>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="p-2 border bg-transparent"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Product</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
