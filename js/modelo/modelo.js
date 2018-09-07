/*
 * Modelo
 */
var Modelo = function() {
  this.wishList = [];
  this.carrito = [];

  //inicializacion de eventos
  this.itemAgregadoAWhishList = new Evento(this);
  this.itemEliminadoDeWhishList = new Evento(this);
  this.listaExtraida = new Evento(this);
  this.itemEliminadoCarrito = new Evento(this);
  this.carritoCargado = new Evento(this);
  this.itemAgregadoAlCarrito = new Evento(this);
};

Modelo.prototype = {
  addToWishlist: function(productID) {
    this.wishList.push(productID);
    this.itemAgregadoAWhishList.notificar(productID);
    this.guardar();
  },

  removeFromWishlist: function(productID){
    var index = this.wishList.indexOf(productID);
    if (index > -1) {
      this.wishList.splice(index, 1);
      this.itemEliminadoDeWhishList.notificar(productID);
      this.guardar();
    }
  },

  //Se guarda la wishList en el local storage
  guardar: function(){
    var lista = JSON.stringify(this.wishList);
    localStorage.setItem('listaGuardada', lista);
  },

  //Se extrae la wishList del localStorage, si no existia, se setea en vacio
  extraer: function() {
    var listaExtraida = localStorage.getItem('listaGuardada');
    if(listaExtraida == null){
      this.wishList = [];
      this.listaExtraida.notificar(this.wishList);  
    } else{
      this.wishList = JSON.parse(listaExtraida);
      this.listaExtraida.notificar(this.wishList);
    }
  },

  //Se guarda el carrito en el local storage
  guardarCarrito: function(){
    var carrito=JSON.stringify(this.carrito);
    localStorage.setItem('carrito', carrito);  
  },

  //Se extrae el carrito del localStorage, si no existia, se setea en vacio  
  cargarCarrito: function(){
    var carrito = localStorage.getItem('carrito');
    if (carrito == null) {
      this.carrito=[];
      this.carritoCargado.notificar(this.carrito);
    }else{
      this.carrito=JSON.parse(carrito);
      this.carritoCargado.notificar(this.carrito);
    }
  },

  anadirAlCarrito: function(producto) {
    //Seteamos una variable de control con un valor no alcanzable
    var posicion = -1;
    for (var i = 0; i < this.carrito.length; i++) {
      //revisamos el carrito en busca de una coincidencia de id
      if(this.carrito[i].id == producto.id) {
        //Si conincide, se setea la variable de control
        posicion = i;
      }
    }
    //Dependiendo si la variable de control cambio o no, se crea un nuevo producto o se agrega cantidad al ya creado
    if( posicion == -1){
      producto.cantidad = 1;
      this.carrito.push(producto);
    } else{
      this.carrito[posicion].cantidad++;
    }
    this.guardarCarrito();
    this.carritoCargado.notificar(this.carrito);
  },

  borrarItem: function(id){
    //Se recorre el carrito buscando una coincidencia de ids
    for(var i=0; i < this.carrito.length; i++){
      if(this.carrito[i].id == id){
        if(this.carrito[i].cantidad > 1){
          //Si la cantidad es mayor a 1, se resta
          this.carrito[i].cantidad--;
        } else{
          //Si es menor a 1 o 1, se borra
          this.carrito.splice(i, 1);
        }
        this.itemEliminadoCarrito.notificar(this.carrito);
        this.guardarCarrito();
      }
    }
  },

  getWishList: function(){
    //Se crea esta funcion para poder acceder a la wishList desde afuera del modelo
    return this.wishList;
  }
};
