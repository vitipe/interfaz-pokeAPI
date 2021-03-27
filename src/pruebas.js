/*
Armando detalles popover:
        console.log($boton.value)
        console.log(dataAPI.name)
        console.log(dataAPI.id) //con este ver de hacer las llamadas en vez del index
        console.log(dataAPI.types[0].type.name);
        console.log(dataAPI.types[1].type.name); //tirar un for que por cada type lo traiga cuando sea más de uno
        console.log(dataAPI.weight / 10 + " kg.")
        console.log(dataAPI.height * 10 + " cm.") //la llamada viene en decímetros

        // let nuevoTitulo = dataAPI.name;
        // $(".btn btn-lg btn-dark boton-detalles").attr('title', nuevoTitulo); //ir jugando con esto
        // $(".btn btn-lg btn-dark boton-detalles").popover('show');

        
        // let popover = $('button').data('bs.popover');
        // console.log(popover)
        // popover.config.title = dataAPI.name;
        // console.log(popover.config.title)
        // popover.config.content = dataAPI.id
        // console.log(popover.config.content)
        // popover.show();

        
        Probar con esto:
        http://jsfiddle.net/scje9w5y/
        


        
Ejemplo de estructura de popover

<button type="button" 
    class="btn btn-lg btn-dark boton-detalles" 
    data-toggle="popover" 
    title="Cargando..." 
    data-content="">Detalles</button>
              </div>




              // let indexAPI = urlAPI.match(/\d{2}/g)[0];
*/