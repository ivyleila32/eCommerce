/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  addToWishlist: function(productID) {
    if (!this.modelo.getWishList().includes(productID)){
      this.modelo.addToWishlist(productID);
    } else {
      this.modelo.removeFromWishlist(productID);
    }
  },
  
  extraer: function(){
    this.modelo.extraer();
  },

  borrarItem: function(id){
    this.modelo.borrarItem(id);
  },

  cargarCarrito: function(){
    this.modelo.cargarCarrito();
  },

  anadirAlCarrito: function(producto) {
    this.modelo.anadirAlCarrito(producto);
  },
};
