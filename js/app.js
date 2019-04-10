const descargarUsuarios = cantidad => new Promise((resolve, reject) => {
    //Pasar cantidad a la api
    const api = `https://randomuser.me/api/?results=${cantidad}&nat=us`;

    //Llamado a ajax
    const xhr = new XMLHttpRequest();
    //Abrir la conexion
    xhr.open('GET', api, true); //True = asincrono

    xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).results);
        } else {
            reject(Error(xhr.statusText));
        }
    }

    //Opcional (on error)
    xhr.onerror = (error) => reject(error);

    //Send
    xhr.send()

});

descargarUsuarios(20)
    .then(
        miembros => imprimirHtml(miembros),
        error => console.error(
            new Error('Hubo un error' + error)
        )
    )

function imprimirHtml(usuarios) {
    let html = '';
    usuarios.forEach(usuario => {
        html += `
            <li>
                Nombre: ${usuario.name.first} ${usuario.name.last}
                <br>
                Pais: ${usuario.nat}
                <br>
                Imagen: <br>
                    <img src="${usuario.picture.thumbnail}">
                <br>
                Genero: ${usuario.gender}
                <br><br>
            </li>
        `;
    });
    const contenedorApp = document.querySelector('#app');
    contenedorApp.innerHTML = html;
}