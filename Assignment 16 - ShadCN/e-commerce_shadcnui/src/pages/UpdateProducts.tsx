import React, { useState } from "react";
import { useProducts, useCategory, postProduct } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDeleteProduct } from "../api";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

type NewProduct = Omit<Product, "id">;

export default function UpdateProducts() {
    const [category, setCategory] = useState<string>("all");
    const [newProduct, setNewProduct] = useState<NewProduct>({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
    });

    const { data: products, isLoading, error } = useProducts(category);
    const { mutate: addProduct, error: postError } = postProduct();
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategory();
    const { mutate: deleteProduct } = useDeleteProduct();

    const handleDelete = (id: number) => {
        deleteProduct(id, {
            onSuccess: () => {
                console.log(`Product ${id} deleted successfully`);
            },
            onError: (error) => {
                console.error("Failed to delete product:", error);
            },
        });
    };

    if (isLoading || categoriesLoading) return <p>Loading...</p>;
    if (error || categoriesError) return <p>Error loading data.</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: name === "price" ? parseFloat(value) || 0 : value }));
    };

    const handleSubmit = () => {
        if (!newProduct.title || !newProduct.price || !newProduct.category) {
            alert("Please fill all required fields.");
            return;
        }

        addProduct(newProduct, {
            onSuccess: () => {
                setNewProduct({ title: "", price: 0, description: "", category: "", image: "" });
            },
            onError: () => {
                alert("Error adding product.");
            }
        });
    };

    return (
        <div>
            <div className="flex flex-col justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-4">Update Products</h2>
                <div className="flex flex-wrap align-middle justify-center gap-4">
                    <Select onValueChange={setCategory}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {categories?.map((category: string) => (
                                <SelectItem key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="cursor-pointer">Add Product</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4">
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input name="title" value={newProduct.title} onChange={handleChange} placeholder="Product Name" />

                                <Label>Price</Label>
                                <Input name="price" value={newProduct.price} onChange={handleChange} type="number" placeholder="Price" />

                                <Label>Description</Label>
                                <Input name="description" value={newProduct.description} onChange={handleChange} placeholder="Short Description" />

                                <Label>Category</Label>
                                <Select onValueChange={(value) => setNewProduct((prev) => ({ ...prev, category: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category: string) => (
                                            <SelectItem key={category} value={category}>
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Label>Image URL</Label>
                                <Input name="image" value={newProduct.image} onChange={handleChange} placeholder="Image URL" />

                                <Button className="mt-2 w-full" onClick={handleSubmit}>
                                    Add Product
                                </Button>
                                {postError && <p className="text-red-500 text-sm">Error adding product.</p>}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {products?.map((product: Product) => (
                    <Card key={product.id} className="shadow-lg w-72 hover:scale-105 transition-transform">
                        <CardHeader>
                            <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mx-auto" />
                            <CardTitle className="text-lg text-center">{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-500">{product.description.substring(0, 50)}...</p>
                            <p className="font-semibold text-lg my-2">${product.price}</p>
                            <div className="flex justify-center gap-2">
                                <Link to={`/product/${product.id}`}>
                                    <Button variant="outline">Details</Button>
                                </Link>
                                <Button onClick={() => handleDelete(product.id)} variant="destructive">Remove</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
