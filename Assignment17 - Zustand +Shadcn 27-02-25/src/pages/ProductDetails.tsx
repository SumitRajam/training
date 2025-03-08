import React from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
};

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading, error } = useProductDetails(id as unknown as number);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product.</p>;

    if (!product) return <p>Product not found.</p>;

    return (
        <div className="m-2">
            <Card key={product.id} className="shadow-lg">
                <CardHeader>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-75 h-75 object-contain mx-auto"
                    />
                    <CardTitle className="text-xl text-center">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-700 text-lg">{product.description}</p>
                    <p className="font-semibold text-lg mt-2">${product.price}</p>
                    <div className="flex align-middle justify-center gap-2 mt-2">
                        {/* <Button variant="destructive">Remove Item</Button> */}
                        <Button>Buy</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
