
# Proyecto Final

##Pre Entrega 1

Comision:  70065
Alumno: Moro Alan


## Roadmap

- Se desarrolló un Servidor Basado en Node Js

- Se creo dos grupos de rutas "products" y "carts"

- En Products fueron necesarios: 
    #### GET
    - La raiz /  lista todos los productos
    - la ruta /:pid muestra el producto con el id seleccionado
    #### POST
    - el ID se autogenera y nunca se repite, si un ID es eliminado y tiene mas ID con un valor mayor por encima, el post nuevo reemplaza al ID faltante y luego continuaria con el ID superior al ultimo valor
    - los productos se cargan con los siguientes valores:

        {

        "id": 1, 

        "title": "producto ejemplo ",

        "description": "Descripcion ejemplo",

        "code": "codigo ejemplo",

        "price": 100,

        "status": true,

        "stock": 10,

        "cateogy": "categoria ejemplo",

        "thumbnails": ""

        }

    #### POST
    - el post reemplaza al ID selecionado previamente, el mismo actualiza la informacion

    #### DELETE

    - el delete elimina el producto con el ID seleccionado


- En Carts fueron necesarios: 
    ### GET
    - creacion del carrito y en la ruta raiz / muestra los productos del carrito

    ### GET ID
    - muetra los productos del carrito selecionado

    ### POST
    - se puede postear un carrito completo y guardarlo en un ID autogenerado que nunca se repite

    ###POST ID
    - se actualiza el carrito antes guardado con un producto nuevo y su cantidad o con un mismo producto y actualiza su cantidad.
## Autor

- [Alan Moro](https://github.com/alanmorog)

