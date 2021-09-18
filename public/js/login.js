$(function(){
    $('#loguear').click(function(){
        let username =  $('#user').val();
        let password = $('#password').val();
        $.ajax({
            url: "http://localhost:8080/login",
            type: "POST",
            data: {
                username: username,
                clave: password
            },
            cache: false,
            success: function(dataResult){
                console.log(dataResult.mensaje)
                if(dataResult.mensaje.length == 0){
                    alert('Datos Incorrectos');
                    localStorage.setItem('sesion', 'false');
                }else{
                    localStorage.setItem('sesion', 'true');
                    window.location="index.html"
                    
                    
                }
                
            }
        });
    });

});