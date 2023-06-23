<?php 
    // Asignar los datos recibidos a variables
    $nombre = $_POST['nombre'];
    $alias = $_POST['alias'];
    $rut = $_POST['rut'];
    $email = $_POST['email'];
    $region = $_POST['region'];
    $comuna = $_POST['comuna'];
    $candidato = $_POST['candidato'];
    $nosotros = $_POST['nosotros'];

    // Verificar si alguna variable está vacía
    if (empty($nombre) || empty($alias) || empty($rut) || empty($email) || empty($region) || empty($comuna) || empty($candidato) || empty($nosotros)) {
        // Faltan datos, mostrar mensaje de error
        echo 'No se proporcionaron todos los datos necesarios';
    } else {
        // Establecer la conexión a la base de datos
        include 'connection.php';

        mysqli_set_charset($conn, "utf8");

        // Verificar si la conexión fue exitosa
        if (!$conn) {
            die('Error al conectar con la base de datos: ' . mysqli_connect_error());
        }

        // Verificar si el RUT ya existe en la base de datos
        $checkQuery = "SELECT 1 FROM votantes WHERE rut = '$rut' LIMIT 1";
        $checkResult = mysqli_query($conn, $checkQuery);

        if (mysqli_num_rows($checkResult) > 0) {
            // El RUT ya existe, no se puede ingresar el voto
            echo 'No se logró ingresar el voto, ya que el RUT está repetido';
        } else {
            // Preparar la consulta SQL para insertar los datos
            $query = "INSERT INTO votantes (nombre, alias, rut, email, nosotros, region_id, comuna_id, candidato_id) VALUES ('$nombre', '$alias', '$rut', '$email', '" . implode(',', $nosotros) . "', $region, $comuna, $candidato)";
            
            // Ejecutar la consulta
            if (mysqli_query($conn, $query)) {
                // Los datos se insertaron correctamente
                echo 'Se ha ingresado un nuevo voto';
            } else {
                // Ocurrió un error al insertar los datos
                echo 'No se logró ingresar el voto';
            }
        }

        // Cerrar la conexión a la base de datos
        mysqli_close($conn);
    }
?>