
# Proyecto Final

## Pre Entrega 1

Comision:  70065
Alumno: Moro Alan


## Roadmap

- Se desarrolló un Servidor Basado en Node Js

- Se creo dos grupos de rutas "products" y "carts"

### En Products fueron necesarios: 
    #### GET
    - La raiz /api/products  lista todos los productos

![App Screenshot](https://github.com/alanmorog/Bakend70065/blob/master/assets/screenshots/productujson.PNG?raw=true)

![App Screenshot](https://github.com/alanmorog/Bakend70065/blob/master/assets/screenshots/productsPOSTMAN.PNG?raw=true)

    - la ruta /api/products/:pid muestra el producto con el id seleccionado

#### Demo

https://youtu.be/RcLsz7Aey0E

    #### POST
    - el ID se autogenera y nunca se repite, si un ID es eliminado y tiene mas ID con un valor mayor por encima, el post nuevo reemplaza al ID faltante y luego continuaria con el ID superior al ultimo valor

    
    - los productos se cargan con los siguientes valores:

        {

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


### En Carts fueron necesarios: 
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



# Proyecto Final

## Pre Entrega 1

Comision:  70065
Alumno: Moro Alan


## Roadmap

- Se desarrolló un Servidor Basado en Node Js

- Se creo dos grupos de rutas "products" y "carts"

### En Products fueron necesarios: 
    #### GET
    - La raiz /api/products  lista todos los productos

![App Screenshot](https://github.com/alanmorog/Bakend70065/blob/master/assets/screenshots/productujson.PNG?raw=true)

![App Screenshot](https://github.com/alanmorog/Bakend70065/blob/master/assets/screenshots/productsPOSTMAN.PNG?raw=true)

    - la ruta /api/products/:pid muestra el producto con el id seleccionado

![App Screenshot](https://github.com/alanmorog/Bakend70065/blob/master/assets/screenshots/producID.PNG?raw=true)

    #### POST
    - el ID se autogenera y nunca se repite, si un ID es eliminado y tiene mas ID con un valor mayor por encima, el post nuevo reemplaza al ID faltante y luego continuaria con el ID superior al ultimo valor

![App Screenshot](https://github.com/alanmorog/Bakend70065/blob/master/assets/screenshots/products%20sin%20id2.PNG?raw=true)

    #### Demo

    https://youtu.be/RcLsz7Aey0E

    
    - los productos se cargan con los siguientes valores:

        {

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


### En Carts fueron necesarios: 
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


