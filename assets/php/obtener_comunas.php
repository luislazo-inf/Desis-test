<?php 

    /**se hace el llamado al archivo de la conexión */
    include 'connection.php';
    
    /**se establece el conjunto de caracteres que se usará*/
    mysqli_set_charset($conn, "utf8");
    
    /**se verifica si se entregó correctamente el parametro regionId a través del ajax */
    if(isset($_POST['regionId'])){
        
        /**se asigna el parametro regionId a una nueva variable */
        $regionId = $_POST['regionId'];
        
        /**Query para ver si existen comunas que tengan como id_region el parametro entregado */
        $query = "SELECT * FROM comunas WHERE id_region = $regionId";
        
        /**se envía la consulta a la base de datos */
        $result = mysqli_query($conn, $query);
        
        /**se verifica si se obtuvieron datos */
        if($result){
            /**se inicializa un arreglo vacío */
            $comuna = array();
            
            /**bucle para guardar cada fila de resultados que se obtuvo a través de la Query */
            while($row = mysqli_fetch_assoc($result)){
                $comuna[] = $row;
            }
            
            /**se convierte el arreglo al formato JSON y poder usarse en la función obtenerComunas del archivo datos.js */
            echo json_encode($comuna);
        } else {
            /**si la consulta no se ejecuta correctamente se envía un mensaje de error */
            echo "Error en la consulta: " . mysqli_error($conn);
        }
    } else {
        /**Si el parametro regionId no se entregó correctamente, se envía el mensaje de error */
        echo "No se proporcionó el parámetro 'regionId'";
    }

?>