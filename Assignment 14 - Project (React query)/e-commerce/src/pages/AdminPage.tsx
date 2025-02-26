import React, { useContext, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

const ProductList = () => {
    const { state, dispatch } = useGlobalContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
    });

    const handleDelete = (id: number) => {
        dispatch({ type: "SET_PRODUCTS", payload: state.products.filter(product => product.id !== id) });
    };

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProductWithId = {
            ...newProduct,
            id: Date.now(),
            price: parseFloat(newProduct.price),
        };
        dispatch({ type: "SET_PRODUCTS", payload: [...state.products, newProductWithId] });
        setNewProduct({ title: "", price: "", image: "", description: "" });
        setIsModalOpen(false);
    };

    return (
        <div className="container mt-4">
            <h2>Product List</h2>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add Product</button>
            <div className="container d-flex flex-wrap justify-content-center align-items-center mt-3">
                {state.products.map(product => (
                    <div key={product.id} className="m-4" style={{ minWidth: "300px", width: "300px", height: "390px" }}>
                        <div className="card shadow-sm h-100">
                            <img
                                src={product.image}
                                className="card-img-top p-3"
                                alt={product.title}
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title" style={{ height: "38.4px", overflow: "hidden" }}>
                                    {product.title.length > 40 ? product.title.substring(0, 40) + "..." : product.title}
                                </h6>
                                <p className="fw-bold">${product.price}</p>
                                <button className="btn btn-danger w-100 mt-auto" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Product</h5>
                                <button type="button" className="close" onClick={() => setIsModalOpen(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <label>Title</label>
                                    <input type="text" name="title" className="form-control" value={newProduct.title} onChange={handleChange} required />
                                    <label>Price</label>
                                    <input type="number" name="price" className="form-control" value={newProduct.price} onChange={handleChange} required />
                                    <label>Image URL</label>
                                    <input type="text" name="image" className="form-control" value={newProduct.image} onChange={handleChange} required />

                                    <label>Description</label>
                                    <textarea name="description" className="form-control" value={newProduct.description} onChange={handleChange} required></textarea>
                                    <button type="submit" className="btn btn-success mt-3">Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
