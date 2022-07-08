// Booklist

class BookList {


    constructor() {
        this.books = [];

        this.booksRead = 0;
        this.bookNotRead = 0;
        this.bookLastRead ={};
        this.nextBook = {};
        this.currentBook = {};
    }

    add(book) {
        this.books.push(book)
    }   

    startReading (book) {
        this.currentBook = book;
    }

    finishCurrentBook() {
        this.currentBook.read = true;
        this.currentBook.date = new Date()
        this.bookLastRead = this.currentBook;

        this.currentBook = {}
        // Find the first unread book
        this.nextBook = this.findFirstUnreadBook();
        
    }

    findFirstUnreadBook() {
        return this.books.find(book => !book.read)
    }
}


class Book {
    constructor( title, genre, author) {

        this.title = title;
        this.genre = genre;
        this.author = author;

        this.read = false;
        this.date = ''
    }


}

const sciFi = new BookList()

const battleFieldEarth = new Book('Battlefield Earth', 'Sci Fi', 'Hubbard')

const dune = new Book('Dune', 'Sci Fi', 'Frank Herbert')

sciFi.add(battleFieldEarth)
sciFi.add(dune)

sciFi.startReading(battleFieldEarth)
sciFi.finishCurrentBook()
console.log(sciFi)

///


class Cat {
    // tiredness, hunger, lonliness and happiness
    constructor() {
        this.tiredness = 50;
        this.hunger = 50;
        this.lonliness = 50;
        this.happiness = 50;
    }

    play() {
        this.tiredness += 10;
        this.hunger += 10;
        this.lonliness -= 10;
        this.happiness += 10;
    }

    sleep() {
        this.tiredness -= 10;
        this.hunger += 1;
        if (this.happiness > 60) console.log("I'm playing! Leave me alone")
    }

    feed(amount) {
        this.hunger -= amount;
        this.happiness += 10;
    }

    pet() {
        this.lonliness -= 10;
        this.happiness += 10;
    }

    printStatus() {
        console.log(`I'm ${this.happiness}% happy
            and my sleep is at ${this.tiredness}%
        `)
    }
}

const Mimi = new Cat()

Mimi.play()
Mimi.sleep()
Mimi.sleep()
Mimi.sleep()
Mimi.sleep()

Mimi.feed(50)
Mimi.pet()
Mimi.sleep()
Mimi.printStatus()

console.log(Mimi)

//////////////////////////////////////////

class Eshop {
    constructor(name, owner, address, billingInfo) {
        this.name = name;
        this.owner = owner;
        this.address = address;
        this.billingInfo = billingInfo;
        this.products = []
        this.clients = []
        this.carts = []
    }
}

const companyName = 'Kitchen Tools'

const address = {
    street:'Manhatan',
    number: 58,
    postCode: '1234'
}

const billingInfo = {
    ...address, // spread the address object
    vat: '123456789',
    companyName // object property shorthand
}

const kitchenTools = new Eshop(companyName, address, billingInfo)

// create another class named Product
class Product {
    constructor(description, price, images, title, code) {
        
        this.description = description;
        this.price = price;
        this.images = images;
        this.title = title;
        this.code = code;
    }
}

const mixer = new Product('Super Mixer for your kitchen', 
123, 
['http://1.com/1.jpg','http://1.com/2.jpg'],
'Kenwood mixer model A-123', 'KM-1230'
)

const pan = new Product('Pan for pancakes with antistuck technology', 
56, 
['http://1.com/p1.jpg','http://1.com/p2.jpg'],
'ABC pancakes pan', 'AP-9999'
)

// create the class ProductManager
class ProductsManager {
    constructor(products) {
        this.products = products;
    }

    addProduct(...products) {
        this.products.push(...products);
        console.log('Products after addition: ', this.products)
    }

    deleteProduct(product) {

        //find the index of the product in the products array
        // product is an object with a property 'code'
        // this.products is the array of products. each object has a code property
        const index = this.products.findIndex(item => item.code === product.code)

        if (index > -1) {
            this.products.splice(index, 1)
            console.log('Products array after deletion', this.products)
        } else console.log('Product not found')

    }
    
    listAllProducts() {
        console.log('List all Products:', this.products)
    }
}

const productsManager = new ProductsManager(kitchenTools.products);

productsManager.addProduct(mixer)
productsManager.addProduct(pan)
productsManager.listAllProducts()
productsManager.deleteProduct(mixer)

// create class Client
class Client {
    constructor(name, email, address, birthdate) {
    
            this.name = name;
            this.email = email;
            this.address = address;
            this.birthdate = birthdate;
    }
}

// use format month/date/year
const john = new Client('John', 'john@email.com', 'Berlin', '11/3/1970')
const maria = new Client('Maria', 'maria@email.com', 'Leipzig', '1/1/1980')
const jurgen = new Client('Jurgen', 'jurgen@email.com', 'Leipzig', '1/1/1990')

// create the class ClientManager
class ClientManager {
    
    constructor(clients) {
        this.clients = clients;
    }

    addClient(...clients) {
        this.clients.push(...clients);
        console.log('Clients after adding:', this.clients)
    }
    
    removeClient(client) {
        const index = this.clients.findIndex(item => item.name === client.name)

        if (index > -1) {
            this.clients.splice(index, 1)
            console.log('Clients array after deletion', this.clients)
        } else console.log('Client not found')
    }
    
    listClients() {
        console.log('List all Clients:', this.clients)
    }
    
    listBirthdayClients() {

        const birthdayClients = this.clients.filter(item => {

            // create a date from a string
            const birthday = new Date(item.birthdate)
            const birthdayMonth = birthday.getMonth() + 1 // months are 0 based
            const birthdate = birthday.getDate()
            
            const todayMonth = new Date().getMonth() + 1
            const todayDate = new Date().getDate()
            
            if (birthdayMonth === todayMonth && birthdate === todayDate) {
                return item // return this client. has birthday today
            }
        })

        console.log('Today these clients are having birthday', birthdayClients)
    }
}

const clientManager = new ClientManager(kitchenTools.clients)
clientManager.addClient(john, maria, jurgen)
clientManager.listClients()
clientManager.removeClient(maria)
clientManager.listBirthdayClients()

// Create a Cart class
class Cart {
    constructor(client) {
        this.client = {...client};
        this.products = []
    }
}

const johnCart = new Cart(john)
const jurgenCart = new Cart(jurgen)

class CartManager {
    constructor(carts) {
        this.carts = carts
    }

    addCart(...carts) {
        this.carts.push(...carts)
        console.log('Carts after adding a cart:', this.carts)
    }

    addProduct(client, product) {
        
        //find index of cart of client
        // N.B.
        // MIND the data structure: it's item.CLIENT.email and not item.email
        // the same in below methods
        const index = this.carts.findIndex(item => item.client.email === client.email)

        // if found add product to that cart
        if (index > -1) {

            // ALSO MIND THE Data Structure: it's this.carts[].products
            this.carts[index].products.push(product)
            console.log('Cart for client after adding a product:', this.carts[index].products)
        }

        else console.log('Client not found, no product added')
    }

    removeProduct(client, product) {

        //find index of cart of client
        const clientIndex = this.carts.findIndex(item => item.client.email === client.email)

        // console.log('client index is', clientIndex, 'this.carts is', this.carts[clientIndex])

        if (clientIndex > -1) {

            // then find index of product in products
            const productIndex = this.carts[clientIndex].products.findIndex(item => item.code === product.code)

            // delete if product found
            if (productIndex > -1) {
                
                this.carts[clientIndex].products.splice(productIndex, 1)
                console.log('Products after removing one:', this.carts[clientIndex].products)
            } else {
                
                console.log('Product not found. Nothing removed')
            }

        } else console.log('Client not found, no product removed')
    }

    emptyCart(client) {
        //find index of cart of client
        const clientIndex = this.carts.findIndex(item => item.client.email === client.email)

        if (clientIndex > -1) {
            
            // set array to empty
            this.carts[clientIndex].products = []

            console.log('Products afteremptying cart for client:', this.carts[clientIndex].products)
        } else console.log('Client not found, no cart was emptied')
    }
    
    listProductsForClient(client) {
        //find index of cart of client
        const clientIndex = this.carts.findIndex(item => item.client.email === client.email)

        if (clientIndex > -1) {

            console.log('Cart for client contains:', this.carts[clientIndex].products)
        } else console.log('Client not found, no products listed')
       
    }
    
    calcTotalForClient(client) {
        //find index of cart of client
        const clientIndex = this.carts.findIndex(item => item.client.email === client.email)       

        if (clientIndex > -1) {
            const total = this.carts[clientIndex].products.reduce((total, item) => total += item.price, 0)

            console.log('Total for client is:', total)
        } else console.log('Client not found, no total was calculated')
    }
}

const cartManager = new CartManager(kitchenTools.carts)
cartManager.addCart(johnCart, jurgenCart)
console.log('---------------------------')
cartManager.addProduct(john, pan)
cartManager.addProduct(john, mixer)
cartManager.addProduct(jurgen, mixer)
cartManager.addProduct(jurgen, pan)
cartManager.addProduct(jurgen, pan)
cartManager.addProduct('somebody', mixer)
console.log('---------------------------')
cartManager.removeProduct(jurgen, mixer)
cartManager.removeProduct(jurgen, 'not existed product')
console.log('---------------------------')

cartManager.emptyCart(jurgen)
cartManager.emptyCart('unknown user')
console.log('---------------------------')

cartManager.listProductsForClient(john)
cartManager.listProductsForClient('unknown user')
console.log('---------------------------')
cartManager.calcTotalForClient(john) // 179 = 56 + 123
cartManager.calcTotalForClient('unknown user')