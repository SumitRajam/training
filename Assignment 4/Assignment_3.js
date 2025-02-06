document.addEventListener("DOMContentLoaded", () => {
    let leakArray = [];

    function addData() {
        leakArray.push(new Array(1000).fill("data"));
        console.log("Array size:", leakArray.length);
    }

    function cleanupMemory() {
        leakArray = [];
        console.log("Memory cleaned up!");
    }

    document.getElementById('btn').addEventListener('click', () => {

        setInterval(addData, 1000);
        setInterval(cleanupMemory, 5000);
    });
});
