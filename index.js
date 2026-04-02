const showBtn = document.querySelector("#hero-btn")
const closeBtn = document.getElementById("close-btn")
const overLay = document.querySelector(".overlay")

showBtn.addEventListener("click", () => {
    overLay.classList.add("show")
})
closeBtn.addEventListener("click", () => {
    overLay.classList.remove("show")
})
overLay.addEventListener("click", (e) => {
    if (e.target ===overLay) {
        overLay.classList.remove("show")
    }
})