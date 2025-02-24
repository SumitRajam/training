import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useProducts } from "../contexts/MyHooks";
import { Link } from "react-router-dom";

const ProductList = () => {
    const { dispatch } = useGlobalContext();
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-danger text-center mt-4">Error loading products.</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Products</h2>
            <div className='container d-flex flex-wrap justify-content-center align-items-center'>
                {products?.map((product) => (
                    <div key={product.id} className="m-4" style={{ width: "300px", height: "390px" }}>
                        <div className="card shadow-sm h-100">
                            <img src={product.image} className="card-img-top p-3" alt={product.title} style={{ height: "200px", objectFit: "contain" }} />
                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title" style={{ height: "38.4px", overflow: "hidden" }}>
                                    {product.title.length > 40 ? product.title.substring(0, 40) + "..." : product.title}
                                </h6>
                                <p className="card-text text-muted small">{product.category}</p>
                                <p className="fw-bold">${product.price}</p>
                                <div className='d-flex gap-2'>
                                    <Link to='/'>
                                        <button className="btn btn-secondary w-100 mt-auto">
                                            Details
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-primary w-100 mt-auto"
                                        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ProductList;
