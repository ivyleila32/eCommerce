var VistaWishList = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.cantidad = 0;
  var contexto = this;

  // suscripción de observadores
  this.modelo.itemAgregadoAWhishList.suscribir(function() {
    contexto.incrementarContador();
  });

  this.modelo.itemEliminadoDeWhishList.suscribir(function() {
    contexto.decrementarContador();
  });

  this.modelo.listaExtraida.suscribir(function(modelo, wishList){
    contexto.cantidad = wishList.length;
    contexto.setearContador(wishList);
  });
};


VistaWishList.prototype = {
  inicializar: function() {

  },

  incrementarContador: function(){
    this.cantidad++;
    $("#wishlist-qty").html(this.cantidad)
  },

  decrementarContador: function(){
    this.cantidad--;
    $("#wishlist-qty").html(this.cantidad)
  },
  setearContador: function(wishList){
    $("#wishlist-qty").html(wishList.length);
  }
};
