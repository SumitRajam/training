import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { selectedCategory, setSelectedCategory } = useGlobalContext();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100 px-4">
            <div className="container">
                <a className="navbar-brand" href="/">Shopify</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li>
                    </ul>

                    <select
                        className="form-select w-auto"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="men's clothing">men's clothing</option>
                        <option value="women's clothing">women's clothing</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">jewelery</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}
