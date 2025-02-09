document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-btn").addEventListener("click", () => {
        if (localStorage.getItem('token_ShopTastic')) {
            const token = localStorage.getItem('token_ShopTastic');
            const decodedData = decodeJWT(token);
            console.log(decodedData);
            fetchUserCart(decodedData);
        }
    });

    function decodeJWT(token) {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    async function fetchUserCart(decodedData) {
        try {
            const response = await axios.get(`https://fakestoreapi.com/carts/user/${decodedData.sub}`);
            const userCart = await response.data;

            if (userCart.length > 0) {
                const cartItems = userCart.flatMap(cart => cart.products);
                localStorage.setItem("cartID", JSON.stringify(userCart[0]?.id));
                localStorage.setItem("cartProducts", JSON.stringify(cartItems));
            } else {
                console.log("No cart items found for the user.");
            }
            window.location.href = 'home.html';
        } catch (error) {
            console.error("Error fetching user cart:", error);
        }
    }

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', {
                username: username,
                password: password
            });
            const token = response.data.token;
            localStorage.setItem("token_ShopTastic", token);
            const decodedData = decodeJWT(token);
            fetchUserCart(decodedData);

            document.getElementById('message').innerHTML = `<span class="text-success">Login successful!</span>`;
            // window.location.href = 'index.html';
        } catch (error) {
            document.getElementById('message').innerHTML = `<span class="text-danger">Login failed! Check credentials.</span>`;
            console.error("Login Error:", error);
        }
    });

});