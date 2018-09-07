var VistaCart = function(modelo, controlador) {
  this.modelo = modelo;
  this.controlador = controlador;
  var contexto = this;

  //suscripcion a eventos del modelo
  this.modelo.carritoCargado.suscribir(function(modelo, carrito){
    //Cuando se carga el carrito en el modelo
    contexto.recargarCarrito(carrito);
  });
  this.modelo.itemAgregadoAlCarrito.suscribir(function(carrito) {
    //Cuando se agrega un item al carrito
    contexto.recargarCarrito(carrito);
  });
  this.modelo.itemEliminadoCarrito.suscribir(function(modelo, carrito){
    //Cuando se elimina un item del carrito en el modelo
    contexto.recargarCarrito(carrito);
  });
};

VistaCart.prototype = {
  inicializar: function() {
    this.configuracionDeBotones();
    this.controlador.cargarCarrito();
  },

  configuracionDeBotones: function(){
    this.setEventoBorrar(this);
  },

  setEventoBorrar: function(contexto){
    //Se consigue el id del contenedor padre del boton y se manda como parametro al controlador
    $("button.delete").click(function(){
      var parent = $(this).parent();
      contexto.controlador.borrarItem(parent.attr('id'));
    });
  },

  recargarCarrito: function(carrito){
    //Se borran todos los carritos visuales
    $('.carritoVisual').each(function(){
      this.remove();
    })
    //Creacion de las variables a usar
    var total = 0,
        itemNuevo,
        htmlNuevo,
        cantidadTotal = 0;
    for(var i=0; i < carrito.length; i++){
      //Se clona la plantilla por cada elemento de carrito
      itemNuevo = $('#template').clone().removeClass('hide').addClass('carritoVisual').attr('id', carrito[i].id);
      //Se setean los datos reales y se inserta en el html
      htmlNuevo = itemNuevo.html().replace('./img/plantilla.png', carrito[i].imagen)
              .replace('{nombre}', carrito[i].nombre)
              .replace('{precio}', '$' + carrito[i].precio)
              .replace('{cantidad}', carrito[i].cantidad + 'x');
      itemNuevo.html(htmlNuevo);
      itemNuevo.insertBefore('#template');
      total += carrito[i].precio * carrito[i].cantidad;
      cantidadTotal += carrito[i].cantidad;
    }
    $('#qty').html(cantidadTotal);
    $('.cart-summary h5').html('SUBTOTAL: $' + total);
    //Se setea el evento del boton 
    this.setEventoBorrar(this);
  }
};