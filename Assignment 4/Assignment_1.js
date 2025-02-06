function fetchData(callback) {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        const data = ["Sumit", "Manav", "Durgesh", "Yashodhan", "Vishwaved"];

        if (success) {
            callbackFunc(data, null);
        } else {
            callbackFunc(null, "Server error: Failed to fetch data");
        }
    }, 2000);
}

function callbackFunc(users, error) {
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Fetched users:", users);
    }
}

fetchData(callbackFunc);

/*Output:
on succes: "Fetched users: [ 'Sumit', 'Manav', 'Durgesh', 'Yashodhan', 'Vishwaved' ]"
on faiure: "Error: Server error: Failed to fetch data"
*/