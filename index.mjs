import { input } from "./utils.mjs"
import {Sequelize, QueryTypes} from "sequelize"

const sequelize = new Sequelize("twitter", "root", "VectorLord",{
    dialect: "mysql",
    logging: false,
})
// const a = await input("Ingrese un numero: ")
// const b = await input("Ingrese otro numero: ")

// console.log(Number(a) + Number(b))
// console.log(Number(a) - Number(b))
// console.log(Number(a) * Number(b))
// console.log(Number(a) / Number(b))
// console.log(Number(a) ** Number(b))
// console.log(Number(a) % Number(b))

// await sequelize.query(`create table if not exists tipo_producto(
//     id int not null auto_increment primary key,
//     tipo varchar(100) not null,
//     );`)
// await sequelize.query(`create table if not exists productos_servicios(
//     id int not null auto_increment primary key,
//     nombre varchar(50) not null,
//     descripcion varchar(255),
//     precio float not null,
//     stock int not null,
//     tipo_id int not null,
//     creado datetime default now(),
//     actualizado datetime default now() on update now(),
//     constraint fk_tipo foreign key (tipo_id) references tipo_producto(id)
//     );`)

while(true){
    console.clear()
    console.log(`
        Programa de stock

        Elija una opcion:
        1) Categoría
        2) Productos
        3) Servicios
        4) Salir
        `)
    const opcion = await input("Opcion:")
    if(opcion == "1"){
        while(true){
            console.clear()
            console.log(`
                Sección Categorías
                Elija una opción:
                1- Ver todas
                2- Nueva categoría
                3- Actualizar categoría
                4- Eliminar categoría
                5- Volver
                `)
                const opcion = await input(": ")
                if(opcion === "1"){
                    const categorias = await sequelize.query(`select * from tipo_producto;`, {
                        type:QueryTypes.SELECT
                    })
                    console.log("Categorias: ")
                    categorias.forEach(function (categoria) {
                        console.log(`${categoria.id} -- ${categoria.tipo}`)
                    })
                    await input("")
                }
                if(opcion === "2"){
                    const categoria = await input("Ingrese la categoría: ")
                    await sequelize.query(`insert into tipo_producto (tipo) values ('${categoria}');`, {
                        type:QueryTypes.INSERT
                    })
                    console.log(`Categoria ${categoria} creada con éxito`)
                    await input("")
                }
                if(opcion === "3"){
                    console.clear()
                    const categorias = await sequelize.query(`select * from tipo_producto;`, {
                        type:QueryTypes.SELECT
                    })
                    console.log("Categorias: ")
                    categorias.forEach(function (categoria) {
                        console.log(`${categoria.id} -- ${categoria.tipo}`)
                    })
                    const categoria = await input("Ingrese el id de la categoría que desea actualizar: ")
                    if(categoria.includes(id)){
                    const tipo = await input("Ingrese el nuevo tipo de categoria: ")
                    await sequelize.query(`update tipo_producto set tipo= '${tipo} where id = ${id};`,{
                        type:QueryTypes.UPDATE
                    })
                    console.log(`La categoría de id ${id} fue actualizada`)
                }
                else{
                    console.log("El id ingresado no existe")
                }
                await input("")
                continue
                }
                if(opcion === "4"){
                    console.clear()
                    const categorias = await sequelize.query(`select * from tipo_producto;`, {
                        type:QueryTypes.SELECT
                    })
                    console.log("Categorias: ")
                    categorias.forEach(function (categoria) {
                        console.log(`${categoria.id} -- ${categoria.tipo}`)
                    })
                    const id = await input("Ingrese el id de la categoría que desea eliminar: ")
                    await sequelize.query(`delete from tipo_producto where id = '${id}';`, {
                        type: QueryTypes.DELETE
                    })
                    console.log(`Categoria con id ${id} eliminada con éxito`)
                    await input("")
                    continue
                }
                if(opcion === "5"){
                    break
                }
            }
    }
    if(opcion === "2"){
        while(true){
            console.clear()
            console.log(`
                Sección Productos
                Elija una opción:
                1- Ver todos
                2- Nuevo producto
                3- Actualizar producto
                4- Eliminar producto
                5- Volver
                `)
            const opcion = await input(": ")
            if(opcion === "1"){
                const productos = await sequelize.query(`select * from productos_servicios where tipo_id = 1;`, {
                    type:QueryTypes.SELECT
                })
                console.log(productos)
                await input("")
            }
            if(opcion === "2"){
                const nombre = await input("Ingrese el nombre del producto: ")
                const descripcion = await input("Ingrese la descripción del producto: ")
                const precio = await input("Ingrese el precio del producto: ")
                const stock = await input("Ingrese la cantidad de stock del producto: ")
                await sequelize.query(`insert into productos_servicios (nombre, descripcion, precio, stock, tipo_id) values ('${nombre}', '${descripcion}', ${precio}, ${stock}, 1);`, {
                    type:QueryTypes.INSERT
                })
                console.log(`Producto ${nombre} creado con éxito`)
                await input("")
            }
            if(opcion === "3"){
                const productos = await sequelize.query(`select * from productos_servicios;`, {
                        type:QueryTypes.SELECT
                    })
                    console.log("Productos: ")
                    productos.forEach(function (producto) {
                        console.log(`${producto.id} -- ${producto.nombre} -- ${producto.descripcion} -- ${producto.precio} -- ${producto.stock}`)
                    })
                const id = await input("Ingrese el id del producto que desea actualizar: ")
                if(productos.includes(id)){
                    const nombre = await input("Ingrese el nuevo nombre del producto: ")
                    const descripcion = await input("Ingrese la nueva descripción del producto: ")
                    const precio = await input("Ingrese el nuevo precio del producto: ")
                    const stock = await input("Ingrese la nueva cantidad de stock del producto: ")
                    await sequelize.query(`update productos_servicios set nombre = '${nombre}', descripcion = '${descripcion}', precio = ${precio}, stock = ${stock} where id = ${id};`,{
                        type:QueryTypes.UPDATE
                    })
                    console.log(`El producto de id ${id} fue actualizado`)
                }
                else{
                    console.log("El id ingresado no existe")
                }
                await input("")
            }
            if(opcion === "4"){
                const productos = await sequelize.query(`select * from productos_servicios;`, {
                        type:QueryTypes.SELECT
                    })
                    console.log("Productos: ")
                    productos.forEach(function (producto) {
                        console.log(`${producto.id} -- ${producto.nombre} -- ${producto.descripcion} -- ${producto.precio} -- ${producto.stock}`)
                    })
                const id = await input("Ingrese el id del producto que desea eliminar: ")
                if(productos.includes(id)){
                    await sequelize.query(`delete from productos_servicios where id = ${id};`, {
                        type:QueryTypes.DELETE
                    })
                    console.log(`El producto de id ${id} fue eliminado`)
                }
                else{
                    console.log("El id ingresado no existe")
                }
                await input("")
            }
            if(opcion === "5"){
                break
            }
        }
    }
    if(opcion === "3"){
        while(true){
            console.clear()
            console.log(`
                Sección Servicios
                Elija una opción:
                1- Ver todos
                2- Nuevo servicio
                3- Actualizar servicio
                4- Eliminar servicio
                5- Volver
                `)
            const opcion = await input(": ")
            if(opcion === "1"){
                const servicios = await sequelize.query(`select * from productos_servicios where tipo_id = 2;`, {
                    type:QueryTypes.SELECT
                })
                console.log(servicios)
                await input("")
            }
            if(opcion === "2"){
                const nombre = await input("Ingrese el nombre del servicio: ")
                const descripcion = await input("Ingrese la descripción del servicio: ")
                const precio = await input("Ingrese el precio del servicio: ")
                await sequelize.query(`insert into productos_servicios (nombre, descripcion, precio, stock, tipo_id) values ('${nombre}', '${descripcion}', ${precio}, 1, 2);`, {
                    type:QueryTypes.INSERT
                })
                console.log(`servicio ${nombre} creado con éxito`)
                await input("")
            }
            if(opcion === "3"){
                let servicios = await sequelize.query(`select * from productos_servicios;`, {
                        type:QueryTypes.SELECT
                    })
                    console.log("Servicios: ")
                    servicios.forEach(function (servicio) {
                        console.log(`${servicio.id} -- ${servicio.nombre} -- ${servicio.descripcion} -- ${servicio.precio} -- ${servicio.stock}`)
                    })
                const id = await input("Ingrese el id del servicio que desea actualizar: ")
                if(servicios.includes(id)){
                    const nombre = await input("Ingrese el nuevo nombre del servicio: ")
                    const descripcion = await input("Ingrese la nueva descripción del servicio: ")
                    const precio = await input("Ingrese el nuevo precio del servicio: ")
                    const stock = await input("Ingrese la nueva cantidad de stock del servicio: ")
                    await sequelize.query(`update productos_servicios set nombre = '${nombre}', descripcion = '${descripcion}', precio = ${precio}, stock = ${stock} where id = ${id};`,{
                        type:QueryTypes.UPDATE
                    })
                    console.log(`El servicio de id ${id} fue actualizado`)
                }
                else{
                    console.log("El id ingresado no existe")
                }
                await input("")
            }
            if(opcion === "4"){
                const servicios = await sequelize.query(`select * from productos_servicios;`, {
                        type:QueryTypes.SELECT
                    })
                    console.log("Servicios: ")
                    servicios.forEach(function (servicio) {
                        console.log(`${servicio.id} -- ${servicio.nombre} -- ${servicio.descripcion} -- ${servicio.precio} -- ${servicio.stock}`)
                    })
                const id = await input("Ingrese el id del servicio que desea eliminar: ")
                if(servicios.includes(id)){
                    await sequelize.query(`delete from productos_servicios where id = ${id};`, {
                        type:QueryTypes.DELETE
                    })
                    console.log(`El servicio de id ${id} fue eliminado`)
                }
                else{
                    console.log("El id ingresado no existe")
                }
                await input("")
            }
            if(opcion === "5"){
                break
            }
        }
    }
    if(opcion === "4"){
        console.clear()
        break
    }
}