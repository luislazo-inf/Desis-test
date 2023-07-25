var validaciones = {
    nombre: {
        validacion: function() {
            var nombre = $('#nombre').val();
            return nombre.trim() !== '';
        },
        mensajeError: 'El nombre no puede venir vacío'
    },
    alias: {
        validacion: function() {
            var alias = $('#alias').val();
            var regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
            return alias.trim() !== '' && alias.length > 5 && regex.test(alias);
        },
        mensajeError: 'El alias no cumple con los requisitos que son: contener más de 5 caracteres, y tener al menos 1 letra y 1 numero'
    },
    rut: {
        validacion: function() {
            var rut = $('#rut').val();
            return rut !== '';
        },
        mensajeError: 'El Rut no puede ir vacío'
    },
    email: {
        validacion: function() {
            var email = $('#email').val();
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        mensajeError: 'El correo debe tener un formato correcto, ejemplo: correo@example.com'
    },
    region: {
        validacion: function() {
            var region = $('#region').val();
            return region !== '';
        },
        mensajeError: 'Debes seleccionar una región'
    },
    comuna: {
        validacion: function() {
            var comuna = $('#comuna').val();
            return comuna !== '';
        },
        mensajeError: 'Debes seleccionar una comuna'
    },
    candidato: {
        validacion: function() {
            var candidato = $('#candidato').val();
            return candidato !== '';
        },
        mensajeError: 'Debes seleccionar un candidato'
    },
    checkbox: {
        validacion: function() {
            var checkbox = document.querySelectorAll('input[type="checkbox"]:checked');
            return checkbox.length >= 2;
        },
        mensajeError: 'Debes seleccionar al menos 2 opciones'
    }
};

$(document).ready(function(){
    $('#votacion').bind("submit", function(event){
        event.preventDefault();
        var error = false;

        // Iterar sobre el objeto de validaciones
        for (var campo in validaciones) {
            if (!validaciones[campo].validacion()) {
                alert(validaciones[campo].mensajeError);
                error = true;
                break; // Detener la iteración en caso de encontrar un error
            }
        }

        if (error) {
            // Detener el proceso si hay errores
            return false;
        }

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