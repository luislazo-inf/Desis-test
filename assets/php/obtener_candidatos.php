<?php 

    include 'connection.php';

    mysqli_set_charset($conn, "utf8");

    $query = "SELECT * FROM candidatos";

    $result = mysqli_query($conn, $query);

    $region = array();

    while($row = mysqli_fetch_assoc($result)){
        $region[] = $row;
    }

    echo json_encode($region);

?>