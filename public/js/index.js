$(function() {
    
    let sesion =  localStorage.getItem('sesion')

    if(sesion == "true"){
        $('#cerrarSesion').show();
        $('#loguear').hide();
        $('#admin-opc').show();
    }else{
        $('#cerrarSesion').hide();
        $('#loguear').show();
        $('#admin-opc').hide();
    }

    $.ajax({
        url: "http://localhost:8080/personal",
        type: "GET",
        data: {
            
        },
        cache: false,
        success: function(dataResult){
            dataResult.mensaje.forEach(element => {
                var tr = `<tr>
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>${element.telefono}</td>
                <td>${element.direccion}</td>
                <td>${element.email}</td>
                <td>${element.fechanacimiento}</td>
              </tr>`;


              $('#tbdatos').append(tr);
            });
            
        }
    });



    $('#loguear').click(function (){
        window.location="login.html"
    });


    $('#cerrarSesion').click(function (){
      
        localStorage.setItem('sesion', 'false');
        location.reload();
    });

});