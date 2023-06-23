$(document).ready(function(){
    //llamo las 2 funciones de Regiones y Candidatos para que se carguen al iniciar la pagina.
    obtenerRegiones();
    obtenerCandidatos();
    
    //al momento de que el Select de regiones se cambie se llama a la función para obtener las comunas.
    $('#region').change(function(){
        var regionId = $(this).val();
        if(regionId != ''){
            obtenerComunas(regionId);
        } else {
            $('#comuna').html('<option value="">-- Selecciona Una Comuna --</option>');
        }
    });

});

//función que trae las regiones a través de un archivo PHP.
function obtenerRegiones(){
    $.ajax({
        url: 'assets/php/obtener_regiones.php',
        type: 'GET',
        dataType: 'json',
        //en caso de obtener los datos, se carga el Select con las regiones.
        success: function(response){
            var options = '<option value="">-- Seleccione Una Región --</option>';
            for (var i = 0; i < response.length; i++){
                options += '<option value="' + response[i].id + '">' + response[i].nombre + '</option>';
            }
            $('#region').html(options);
        },
        error: function(xhr, status, error){
            console.log(xhr.responseText);
            alert('No se obtuvieron las regiones');
        }
    });
}

//función que trae las comunas a través de un archivo PHP
function obtenerComunas(regionId){
    $.ajax({
        url: 'assets/php/obtener_comunas.php',
        //el tipo es POST debido a que se manda un dato que en este caso sería el ID de la región para hacer match con la región que esté asociada la comuna
        type: 'POST',
        data: {regionId: regionId},
        dataType: 'json',
        //en caso de obtener los datos, se carga el Select con las comunas.
        success: function(response) {
            var options = '<option value="">-- Seleccione Una Comuna --</option>';
            for (var i = 0; i < response.length; i++) {
                options += '<option value="' + response[i].id + '">' + response[i].nombre + '</option>';
            }
            $('#comuna').html(options);
        },
        error: function(xhr, status, error){
            console.log(xhr.responseText);
            alert('No se obtuvieron las comunas');
        }
    });
}

 //función para obtener los candidatos y llenarlos en el select correspondientes
function obtenerCandidatos(){
    $.ajax({
        url: 'assets/php/obtener_candidatos.php',
        type: 'GET',
        dataType: 'json',
        success: function(response){
            var options = '<option value="">-- Seleccione Un Candidato --</option>';
            for (var i = 0; i < response.length; i++) {
                options += '<option value="' + response[i].id + '">' + response[i].nombre + '</option>';
            }
            $('#candidato').html(options);
        },
        error: function(xhr, status, error){
            console.log(xhr.responseText);
            alert('No se obtuvieron los candidatos');
        }
    });
}