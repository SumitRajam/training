import React, { useState } from "react";
import { useProducts, useCategory } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Define TypeScript types for product and category
type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
};

export default function ProductList() {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [category, setCategory] = useState<string>("all");

    const { data: products, isLoading, error } = useProducts(category);
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategory();

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products.</p>;

    if (categoriesLoading) return <p>Loading categories...</p>;
    if (categoriesError) return <p>Error loading categories.</p>;

    const sortedProducts = [...(products || [])].sort((a: Product, b: Product) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    return (
        <div>
            <div className="flex flex-col justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-4">Product List</h2>
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

                    <Select onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Sort by Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">Price: Low to High</SelectItem>
                            <SelectItem value="desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
                {sortedProducts.map((product) => (
                    <Card key={product.id} className="shadow-lg w-75 hover:scale-105 transition-transform">
                        <CardHeader>
                            <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mx-auto" />
                            <CardTitle className="text-lg text-center">{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-500">{product.description.substring(0, 50)}...</p>
                            <p className="font-semibold text-lg my-2">${product.price}</p>
                            <div className="flex align-middle justify-center gap-2">
                                <Link to={`/product/${product.id}`}>
                                    <Button variant="outline">Details</Button>
                                </Link>
                                <Button>Buy</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
