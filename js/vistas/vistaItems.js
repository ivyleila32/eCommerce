var VistaItems = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  var contexto = this;

  // suscripción de observadores
  this.modelo.listaExtraida.suscribir(function(modelo, wishList){
    //Cuando se carga la WishList
    wishList.forEach(function(id){
      contexto.prenderCorazon(id);
    });
  });

  this.modelo.itemAgregadoAWhishList.suscribir(function(modelo, productID) {
    //Cuando se agrega un item a la WishList
    contexto.prenderCorazon(productID);
  });

  this.modelo.itemEliminadoDeWhishList.suscribir(function(modelo, productID) {
    //Cuando se elimina un item de la WishList
    contexto.apagarCorazon(productID);
  });

};

VistaItems.prototype = {
  inicializar: function() {
    this.configuracionDeBotones();
    this.controlador.extraer();
  },

  configuracionDeBotones: function(){
    var contexto = this;

    $("button.add-to-wishlist").click(function() {
      var id = $(this).closest("div.product").attr("id");
      contexto.controlador.addToWishlist(id);
    });

    $("button.add-to-cart-btn").click(function() {
      //Se guarda el producto
      var articulo = $(this).closest("div.product");
      //Se extrae el precio
      var precioLargo = articulo.find("div.product-body h4.product-price").text();
      var precioViejo = articulo.find("div.product-body h4.product-price del.product-old-price").text();
      var precioProducto = precioLargo.slice(1, precioLargo.length - precioViejo.length);
      //Se setea los valores del producto
      var producto = {
        id: articulo.attr("id"),
        nombre: articulo.find("div.product-body h3.product-name").text(),
        imagen: articulo.find("div.product-img img").attr("src"),
        precio: precioProducto
      };
      //Se manda el producto al controlador
      contexto.controlador.anadirAlCarrito(producto);
    });
  },

  prenderCorazon: function(productID){
    $("div#" + productID).find("button.add-to-wishlist i").addClass('fa-heart').removeClass('fa-heart-o');
    $("div#" + productID).find("span.tooltipp").html('remove from wishlist');
  },

  apagarCorazon: function(productID){
    $("div#" + productID).find("button.add-to-wishlist i").addClass('fa-heart-o').removeClass('fa-heart');
    $("div#" + productID).find("span.tooltipp").html('add to wishlist');
  }
};