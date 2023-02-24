


class ProductManager {

    
    static plusIVA = 1.21;
    constructor(){
        this.products = []
    }

    getProducts(){
        console.log(this.products)
        return this.products
    }

    showProducts(){
        let showing = true
      const navMenu =[]
      let displayNav = ""
      let listOfProducts = []
      let displayProducts = ""
      let  choosenProducts = []

        for (const product of this.products){
            if((navMenu.find((product)=> product.category === product.category )) === undefined){
                navMenu.push(product.category)
            }else{
            console.log(navMenu)
            }
        }
        for (const property in navMenu) {
            displayNav+= `${parseInt(property)+1}:${navMenu[property]};`;
        }

        while(showing === true){   
            alert(` Estas son las categorias ${displayNav}`)  
            let res = prompt( `Eliga una categoria del menu, eligiendo su respectivo numero ${displayNav}`)
             res = parseInt(res)
            while(isNaN(res)){
                res = prompt( `Eliga una categoria del menu, eligiendo su respectivo numero ${displayNav}`)
                res = parseInt(res)
            }
            listOfProducts= this.products.filter((product)=> product.category === navMenu[parseInt(res)-1])
            for (let i= 0; i< listOfProducts.length; i++){
                displayProducts += `${i+1}: ${listOfProducts[i].title}, precio: ${listOfProducts[i].price} ; `
            }

            res = prompt(`Estos son los productos disponibles de esta categoria ${displayProducts}  .
            Si quiere comprar alguno ingrese el numero correspondiente.`)
            while (isNaN(parseInt(res)) && parseInt(res) < listOfProducts.length){
                alert(`Disculpe no entro un numero valido`)
                res = prompt(`Estos son los productos disponibles de esta categoria ${displayProducts}  .
                Si quiere comprar alguno ingrese el numero correspondiente.`)
            }
            while(!isNaN(parseInt(res)) && parseInt(res) < listOfProducts.length){
                choosenProducts.push(listOfProducts[parseInt(res)-1])

                res = prompt("Quieres seguir comprando si/ no ")

                if(res.toLowerCase()==="no") {
                    shoppingCart.addToCart(choosenProducts) 
                    showing = false
            
                }else {
                    showing = true
                }
            }

        }

       
    } 

    addProduct(title,description,price,thumbnail,category, stock){
        const product = new Product (null,title,description,price,thumbnail,category,stock)

        const productByTitle = this.products.find((el) => el.title === title)

        if (this.products.length === 0 && isNaN(product.price) === false && isNaN(product.stock ) === false){
            product.id = 1
            this.products.push(product)
        }else if  (this.products.length > 0  && productByTitle === undefined && isNaN(product.price) === false && isNaN(product.stock ) === false){
            product.id = this.products[this.products.length - 1].id + 1
            this.products.push(product)
        }else {
            console.log(`this product si parameters are wrong or its code is repeated, please verify and try again `)
        }
    }




    getProductById(id) {
        const productById = this.products.find((product) => product.id === id)
        if (productById !== undefined){
            console.log(productById)
        }else {
            console.log('Not found.')
        }
    }

}

// addProduct(title,description,price,thumbnail,category, stock){
// productManager.addProduct("Johny Walker 18 "," 750 ml", 48, "sin imagen", "Whiskies", 40 )
class Product {
    constructor(id,title,description,price,thumbnail,category,stock){
        this.id= id
       this.title = title
       this.description = description
       this.price = parseFloat(price)
       this.thumbnail= thumbnail
       this.category = category
       this.stock = parseInt(stock)
    }

  
}


class ShoppingCart {
    constructor(){
        this.products=[]
    }

    addToCart(products){
        this.products= products

    }

   getProducts(){
    console.log(this.products)
    return this.products
   }

   addtaxes(){
    this.products.map((product)=>{
        return{
            price: product.price*ProductManager.plusIVA
        }}
        )
    }
       
   /* addDiscounts(){
    const discount = (this, requirements, applies)=>{
        this.products
    }
    this.products.map((product)=>{
        return{
            price: product.price - discount()
        }}
        )
    }
 */
    getTotal(){
      const  total = this.products.reduce((acc, producto)=> acc + producto.price, 0)
      const  taxPercentage = total*(ProductManager.plusIVA-1) 
      const totalWTaxes = total + taxPercentage
      const result ={woTaxes:total,taxPer:taxPercentage,taxes:totalWTaxes}
     return (`Tu compra total es de ${result.woTaxes}, mas IVA 21% (${result.taxPer}), que resulta en  ${result.totalWTaxes}`
    )}
}



const productManager = new ProductManager()
const shoppingCart = new ShoppingCart()

productManager.addProduct("Johny Walker 18 "," 750 ml", 48, "sin imagen", "Whiskies", 40 )
productManager.addProduct("Blue Moon"," 350 ml Belgium Beer", 9, "sin imagen", "Cerveza", 140 )
productManager.addProduct("Dada"," 750 ml", 5, "sin imagen", "Vinos", 40 )
productManager.addProduct("Tequila Centenario Reposado"," 1l", 48, "sin imagen", "Licores", 40 )
productManager.addProduct("Swing "," 750 ml",33, "sin imagen", "Whiskies", 40 )


console.log(shoppingCart.getProducts())
let response = prompt(`Quieres ver nuestros productos: si/no?`)
let response1 = response.toLowerCase()
while (response1 !== "si" && response1 !== "no"){
    alert(`No he comprendido, por favor ingrese su respuesta de nuevo`)
    response1 = prompt(`Quieres ver nuestros productos: si/no?`)
    
}
if(response1.toLowerCase() === "si"){

    productManager.showProducts()
    if (shoppingCart.products.length > 0){
        alert(`${shoppingCart.getTotal()}`)
    }else alert("No te preocupes, tendremos cosas mejores para ti en el futuro")

}else{
    alert(`Quizas en otro momento`)
}




