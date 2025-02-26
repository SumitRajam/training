import React, { useState } from "react";
import { useProducts } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProductList() {
    const [sortOrder, setSortOrder] = useState("asc");
    const [category, setCategory] = useState("all");
    const { data: products, isLoading, error } = useProducts(category);

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products.</p>;

    const sorted = [...products].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    return (
        <div className="p-4">
            <div className="flex flex-col justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-4">Product List</h2>
                <div className="flex flex-wrap align-middle justify-center gap-4">
                    <Select onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Sort by Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">Price: Low to High</SelectItem>
                            <SelectItem value="desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setCategory}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Sort by Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="men's clothing">Men's Clothing</SelectItem>
                            <SelectItem value="desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {sorted.map((product) => (
                    <Card key={product.id} className="shadow-lg w-75">
                        <CardHeader>
                            <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mx-auto" />
                            <CardTitle className="text-lg text-center">{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-gray-500">{product.description.substring(0, 50)}...</p>
                            <p className="font-semibold text-lg mt-2">${product.price}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
