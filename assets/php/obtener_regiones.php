<?php 

    /**se hace el llamado al archivo de la conexión */
    include 'connection.php';

    /**se establece el conjunto de caracteres que se usará*/
    mysqli_set_charset($conn, "utf8");

    /**Query a la que se le hará la consulta */
    $query = "SELECT * FROM regiones";

    /**se envia la Query a la base de datos y el resultado se guarda en una variable */
    $result = mysqli_query($conn, $query);

    /**variable para almacenar los resultados de la consulta */
    $region = array();

    /**bucle para guardar cada fila de resultados que se obtuvo a través de la Query */
    while($row = mysqli_fetch_assoc($result)){
        $region[] = $row;
    }

    /**se convierte el arreglo al formato JSON y poder usarse en la función obtenerRegiones del archivo datos.js */
    echo json_encode($region);

?>