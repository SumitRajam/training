import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();

    const goToCart = () => {
        navigate("/home");
    };

    return <button onClick={goToCart}>Go to Home</button>
}
