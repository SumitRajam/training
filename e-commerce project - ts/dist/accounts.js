var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");
    loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", () => {
        const token = localStorage.getItem("token_ShopTastic");
        if (token) {
            const decodedData = decodeJWT(token);
            console.log(decodedData);
            fetchUserCart(decodedData);
        }
    });
    function decodeJWT(token) {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return { sub: decoded.sub };
    }
    function fetchUserCart(decodedData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios.get(`https://fakestoreapi.com/carts/user/${decodedData.sub}`);
                const userCart = response.data;
                if (userCart.length > 0) {
                    const cartItems = userCart.flatMap(cart => cart.products);
                    localStorage.setItem("cartID", JSON.stringify((_a = userCart[0]) === null || _a === void 0 ? void 0 : _a.id));
                    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
                }
                else {
                    console.log("No cart items found for the user.");
                }
                window.location.href = './views/home.html';
            }
            catch (error) {
                console.error("Error fetching user cart:", error);
            }
        });
    }
    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            try {
                const response = yield axios.post("https://fakestoreapi.com/auth/login", {
                    username: username,
                    password: password
                });
                const token = response.data.token;
                localStorage.setItem("token_ShopTastic", token);
                const decodedData = decodeJWT(token);
                fetchUserCart(decodedData);
                message.innerHTML = `<span class="text-success">Login successful!</span>`;
            }
            catch (error) {
                message.innerHTML = `<span class="text-danger">Login failed! Check credentials.</span>`;
                console.error("Login Error:", error);
            }
        });
    });
});
