/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app');

//INTL:  API para dar formato a fechas y monedas
const formatPrice = (price)=>{
    const newPrice = new window.Intl.NumberFormat("en-EN",{
        style: 'currency',
        currency: 'USD'
    }).format(price);

    return newPrice;
}

//WEB API fECHT: nos permite obtener un recurso
//Conectarnos al server
window
    .fetch(`${baseUrl}/api/avo`)
    //Procesar la respuesta, y convertirla en JSON
    .then((respuesta) => respuesta.json())
    // JSON -> Data -> Renderizar info browser
    .then((responseJSON) => {
        const todosLosItems = [];
        responseJSON.data.forEach((item)=>{
            //create image
            const imagen = document.createElement('img');
            imagen.src = baseUrl+item.image;
            //create title
            const title = document.createElement('h2');
            title.textContent = item.name;
            title.className = "mb-2 text-xl font-medium text-gray-800 dark:text-white";
            //create price
            const price = document.createElement('div');
            price.textContent = formatPrice(item.price);
            price.className = "text-xl font-medium text-green-500"
            //create paragrahp
            const paragraph = document.createElement('p');
            paragraph.textContent = item.attributes.description;
            paragraph.className = "text-xs text-gray-400";

            const article = document.createElement('article');
            article.className = "m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 p-3 ";
            article.append(imagen,title,price,paragraph);

            todosLosItems.push(article);
        });
        appNode.append(...todosLosItems);
    })
