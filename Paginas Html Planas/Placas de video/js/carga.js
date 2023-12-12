
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        const productList = document.getElementById('product-list');

        data.forEach((item) => {
            const listItem = document.createElement('div');
            listItem.className = 'col-md-4';
            listItem.innerHTML = `
                <div id="margen" class="card" 
                style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); text-align: center;">
                    
                    <img src="${item.imagen}" alt="${item.marca}">

                    <div class="card-body">
                        <h4 class="card-title">${item.marca}</h4>
                        <p class="card-text">${item.modelo}</p>
                        <p class="card-text">${item.precio}</p>
                        <a href="#" class="btn btn-primary">Entrar</a>
                    </div>
                </div>
            `;
            productList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

async function fetchDataByMarca(marca) {
    try {
        const response = await fetch(`http://localhost:3000/api/data/marca/${marca}`);
        const data = await response.json();
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpia la lista antes de mostrar los resultados filtrados

        data.forEach((item) => {
            const listItem = document.createElement('div');
            listItem.className = 'col-md-4';
            listItem.innerHTML = `
                <div id ="margen" class="card" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); text-align: center;">

                    <img src="${item.imagen}" alt="${item.marca}">

                   
                    <div class="card-body">
                        <h4 class="card-title">${item.marca}</h4>
                        <p class="card-text">${item.modelo}</p>
                        <p class="card-text">${item.precio}</p>
                        <a href="#" class="btn btn-primary">Entrar</a>
                    </div>
                </div>
            `;
            productList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}

fetchData(); // Cargar todos los datos al inicio



const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('searchByMarca');
    const marca = searchInput.value;
    fetchDataByMarca(marca);
});

// Agrega un evento de clic al botón "Entrar"
const entrarButton = listItem.querySelector('.btn-primary');
entrarButton.addEventListener('click', () => {
    mostrarDetalles(item);
});

function mostrarDetalles(item) {
    const detallesProducto = document.getElementById('detalles-producto');
    detallesProducto.innerHTML = `
        <h2>${item.marca} - ${item.modelo}</h2>
        <img src="${item.imagen}" alt="${item.marca}">
        <p>Precio: ${item.precio}</p>
        <p>Descripción: ${item.descripcion}</p>
        <!-- Agrega más detalles si es necesario -->
    `;
}
