document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
    const loginForm = document.getElementById("loginForm") as HTMLFormElement;
    const message = document.getElementById("message") as HTMLElement;

    loginBtn?.addEventListener("click", () => {
        const token = localStorage.getItem("token_ShopTastic");
        if (token) {
            const decodedData = decodeJWT(token);
            console.log(decodedData);
            fetchUserCart(decodedData);
        }
    });

    function decodeJWT(token: string): { sub: number } {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return { sub: decoded.sub };
    }

    interface Cart {
        id: number;
        userId: number;
        date: string;
        products: { productId: number; quantity: number }[];
    }

    async function fetchUserCart(decodedData: { sub: number }): Promise<void> {
        try {
            const response = await axios.get<Cart[]>(`https://fakestoreapi.com/carts/user/${decodedData.sub}`);
            const userCart = response.data;

            if (userCart.length > 0) {
                const cartItems = userCart.flatMap(cart => cart.products);
                localStorage.setItem("cartID", JSON.stringify(userCart[0]?.id));
                localStorage.setItem("cartProducts", JSON.stringify(cartItems));
            } else {
                console.log("No cart items found for the user.");
            }
            window.location.href = './views/home.html';
        } catch (error) {
            console.error("Error fetching user cart:", error);
        }
    }

    loginForm?.addEventListener("submit", async function (event: Event) {
        event.preventDefault();

        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try {
            const response = await axios.post<{ token: string }>("https://fakestoreapi.com/auth/login", {
                username: username,
                password: password
            });

            const token = response.data.token;
            localStorage.setItem("token_ShopTastic", token);
            const decodedData = decodeJWT(token);
            fetchUserCart(decodedData);

            message.innerHTML = `<span class="text-success">Login successful!</span>`;
        } catch (error: unknown) {
            message.innerHTML = `<span class="text-danger">Login failed! Check credentials.</span>`;
            console.error("Login Error:", error);
        }
    });
});
