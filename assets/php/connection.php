<?php 

    /**Se inicializan los datos para la conexión */
    $servername = "localhost";
    $database = "desis_test";
    $username = "root";
    $password = "";

    $conn = mysqli_connect($servername, $username, $password, $database);

    if(!$conn){
        die("Connection failed: " . mysqli_connect_error());
    }

?>