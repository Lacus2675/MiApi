document.addEventListener('DOMContentLoaded', function () {
    const placasDeVideoLink = document.getElementById('placas-de-video-link');
    const productList = document.getElementById('product-list');

    placasDeVideoLink.addEventListener('click', async function (e) {
        e.preventDefault(); // Evita que el enlace navegue a otra página

        try {
            const response = await fetch('http://localhost:3000/api/data'); // Reemplaza con la ruta de tu propia API
            const data = await response.json();
            productList.innerHTML = ''; // Limpia la lista antes de mostrar los resultados

            data.forEach((item) => {
                const listItem = document.createElement('div');
                listItem.className = 'col-md-4';
                listItem.innerHTML = `
                    <div class="card" id="margen"
                        style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); text-align: center;">
                        <img src="${item.imagen}">
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
    });
});
