// Productos
const Productos = [
    {id: 1, nombre: 'Andes', precio: 990},
    {id: 2, nombre: 'Corona', precio: 1540},
    {id: 3, nombre: 'Patagonia', precio: 1152},
    {id: 4, nombre: 'Quilmes', precio: 816},
    {id: 5, nombre: 'Stella', precio: 1070}
];

const carrito = document.querySelector("#cart");
const cartModalOverlay = document.querySelector(".cart-modal-overlay"); 


carrito.addEventListener("click", ()=>{
    if(cartModalOverlay.classList.contains("open")) {
        cartModalOverlay.classList.remove("open");
    } else {
        cartModalOverlay.classList.add("open");
    }
})

const closeBtn = document.querySelector("#close-btn");

closeBtn.addEventListener("click", ()=>{
    cartModalOverlay.classList.remove("open");
})

const addToCart = document.getElementsByClassName("add-to-cart");
console.log(addToCart)
for(let boton of addToCart) {
    boton.addEventListener("click", compilarDatos)
}
function compilarDatos(e){
    let boton = e.target;
    let producto = boton.parentElement;
    let prodID = producto.getAttribute("id");
    let prodName = producto.querySelector("h3").innerText;
    let precio = parseFloat(producto.querySelector (".product-price").innerText);
    let imagen = producto.querySelector(".product-image").src;
    agregarElemento(prodID, prodName, precio, imagen)
}

function agregarElemento(prodID,prodName,precio,imagen) {
    let contenedorProductos = document.querySelector(".product-rows"); 
    let carrito=JSON.parse(localStorage.getItem("carrito"))||[ ]
    carrito.push({id:prodID, imagen:imagen, nombre:prodName, precio:precio})
    localStorage.setItem("carrito", JSON.stringify(carrito))
    let productRow = document.createElement ("div");
    
    let elemProducto = `
        <div class="product-row" id="${prodID}">
            <img class="cart-image" src="${imagen}" />
            <span>${prodName}</span>
            <span class="cart-price">${precio}</span>
            <button class="remove-btn">Borrar</button>
        </div>
    `
    productRow.innerHTML = elemProducto;
    contenedorProductos.append(productRow);
    let botonesBorrar = document.querySelectorAll(".remove-btn");
    for(let boton of botonesBorrar) {
        boton.addEventListener("click", borrarElemento);
    }
    cantElementosCarrito();
    imprimirTotal()
}
function borrarElemento(e) {
    let carrito=JSON.parse(localStorage.getItem("carrito"))
    console.log(e.target.parentElement)
    let carritoFinal=carrito.filter(prod=>prod.id!==e.target.parentElement.id)
    localStorage.setItem ("carrito",JSON.stringify(carritoFinal))
    btn = e.target; 
    btn.parentElement.parentElement.remove();
    cantElementosCarrito()
    imprimirTotal()
}

function cantElementosCarrito() {
    let cantidad = document.querySelectorAll(".product-rows > div");
    let cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.innerText = cantidad.length;
}

function imprimirTotal () {
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let total = carrito.reduce((acc,objeto) => acc + objeto.precio, 0)
    document.getElementById ("total-price").innerHTML = `$${total}`
}

function mostrarCarrito() {
    let contenedorProductos = document.querySelector(".product-rows")
    let carrito=JSON.parse(localStorage.getItem("carrito"))||[ ]    
    for(let prod of carrito){
        let productRow = document.createElement ("div")
        let elemProducto = `
            <div class="product-row" id="${prod.id}">
                <img class="cart-image" src="${prod.imagen}" />
                <span>${prod.nombre}</span>
                <span class="cart-price">${prod.precio}</span>
                <button class="remove-btn">Borrar</button>
            </div> `
        productRow.innerHTML = elemProducto;
        contenedorProductos.append(productRow);        
    }
    let botonesBorrar = document.querySelectorAll(".remove-btn");
    for(let boton of botonesBorrar) {
        boton.addEventListener("click", borrarElemento);
    }
    cantElementosCarrito();
    imprimirTotal()
}
mostrarCarrito()

