import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import { Edit, ImagePlus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectValue, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { uploadImage } from "../../lib/uploadimage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormData {
    name: string;
    image: File | null;
    price: number;
    stock: number;
    category: string;
    description: string;
}
export default function UpdateProductModal({ Product }: { Product: string }) {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const axiosPublic = useAxiosPublic();

    const [formData, setFormData] = useState<ProductFormData>(Product ? {
        name: Product.name ?? "",
        image: Product.image ?? null,
        price: Product.price ?? 0,
        stock: Product.stock ? Number(Product.stock) : 0,
        category: Product.category ?? "",
        description: Product.description ?? "",
    } : {
        name: "",
        image: null,
        price: 0,
        stock: 0,
        category: "",
        description: "",
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(formData, "formdata")

            if (imageFile) {
                const uploadResult = await uploadImage(imageFile);
                console.log("image",uploadResult)
                if (uploadResult.success) {

                    const updateData = {
                        ...formData,
                        image: uploadResult.url,
                    };

                    const response = await axiosPublic.put(`admin/products/${Product._id}`, updateData);
                    console.log(response, "respons-im")
                    if (response.data.modifiedCount > 0) {
                        toast.success('Product information updated successfully');
                        setOpen(false);
                    } else {
                        // Handle error
                        toast.error("Failed to Update Product information");
                    }
                }
            } else {
                const updateData = {
                    ...formData,
                };

                const response = await axiosPublic.put(`admin/products/${Product._id}`, updateData);
                console.log(response, "response")
                if (response.data.modifiedCount > 0) {
                    toast.success('Product information updated successfully');
                    setOpen(false);
                } else {
                    // Handle error
                    toast.error("Failed to Update Product information");
                }
            }

        } catch (error) {
            toast.error('Failed to update Product information');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Edit className="h-4 w-4 text-blue-600" />
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
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Basic Joggers">Basic Joggers</SelectItem>
                                    <SelectItem value="Polo T-shirt">Polo T-shirt</SelectItem>
                                    <SelectItem value="Narrow Pants">Narrow Pants</SelectItem>
                                    <SelectItem value="Cargo Pants">Cargo Pants</SelectItem>
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
                        <Button type="submit">Update Product</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
