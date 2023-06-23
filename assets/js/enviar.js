$(document).ready(function(){
    $('#votacion').bind("submit", function(event){
        event.preventDefault();

        validarNombre();
        validarAlias();
        validarEmail();
        validarRegion();
        validarComuna();
        validarCandidato();
        validarCheckbox();

        var nombre = $('#nombre').val();
        var alias = $('#alias').val();
        var rut = $('#rut').val();
        var email = $('#email').val();
        var region = $('#region').val();
        var comuna = $('#comuna').val();
        var candidato = $('#candidato').val();
        
        var checkbox = document.querySelectorAll('input[type="checkbox"]:checked');
        var nosotros = [];

        for(var i = 0; i < checkbox.length; i++){
            nosotros.push(checkbox[i].value);
        }

        var data = {
            nombre: nombre,
            alias: alias,
            rut: rut,
            email: email,
            region: region,
            comuna: comuna,
            candidato: candidato,
            nosotros: nosotros
        };

        $.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: data,
            success: function(response){
                alert('Se ha ingresado un nuevo voto')
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
                alert('No se logró ingresar un voto');
            }
        });
    });
});

function validarNombre(){
    var nombre = $('#nombre').val();

    if(nombre.trim() === ''){
        alert('El nombre no puede venir vacío');
        return false;
    }
}

function validarAlias(){
    var alias = $('#alias').val();
    var regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

    if(alias.trim() === ''){
        alert('El alias no puede venir vacio');
        return false;
    } else if(alias.length <= 5) {
        alert('El alias debe contener más de 5 caracteres');
        return false;
    } else if(!regex.test(alias)){
        alert('El alias debe contener al menos 1 letra y 1 numero');
        return false;
    }
}

function validarEmail(){
    var email = $('#email').val();
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(email)){
        alert('El correo debe tener un formato correcto, ejemplo: correo@example.com');
        return false;
    }
}

function validarRegion(){
    var region = $('#region').val();

    if(region === ''){
        alert('Debes seleccionar una región');
        return false;
    }
}

function validarComuna(){
    var comuna = $('#comuna').val();

    if(comuna === ''){
        alert('Debes seleccionar una comuna');
        return false;
    }
}

function validarCandidato(){
    var candidato = $('#candidato').val();

    if(candidato === ''){
        alert('Debes seleccionar un candidato');
        return false;
    }
}

function validarCheckbox(){
    var checkbox = document.querySelectorAll('input[type="checkbox"]:checked');

    if(checkbox.length < 2){
        alert('Debes seleccionar 2 opciones como minimos');
        return false;
    }
}