document.addEventListener("DOMContentLoaded", function () {
    const navMenu = document.getElementById("navMenu");
    const openBtn = document.querySelector(".open-btn");
    const mainWindow = document.querySelector(".Main_window");

    function toggleSidebar() {
        if (navMenu.classList.contains("nav-container")) {
            navMenu.style.display = (navMenu.style.display === "none" || navMenu.style.display === "") ? "flex" : "none";
            mainWindow.style.marginLeft = navMenu.style.display === "flex" ? "260px" : "0";
        }
    }

    if (openBtn) {
        openBtn.addEventListener("click", toggleSidebar);
    }

    function adjustLayout() {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove("nav-container");
            navMenu.classList.add("bottom-nav");
            navMenu.querySelectorAll("span").forEach((span) => { span.style.display = "none"; });
            navMenu.style.display = "flex";
            mainWindow.style.marginLeft = "0";
        } else {
            navMenu.classList.remove("bottom-nav");
            navMenu.classList.add("nav-container");
            navMenu.querySelectorAll("span").forEach((span) => { span.style.display = "inline"; });
            navMenu.style.display = "flex";
            mainWindow.style.marginLeft = "260px";
        }
    }

    adjustLayout();
    window.addEventListener("resize", adjustLayout);
});
