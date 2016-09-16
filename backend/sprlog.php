<?php
/**
 * Created by PhpStorm.
 * User: Dexter
 * Date: 9/15/2016
 * Time: 7:11 PM
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

function add_log($type, $payload) {
    //X-Event-Key: pullrequest:rejected
    $servername = "localhost";
    $username = "rq3";
    $password = "eB6rW4RMeV";
    $dbname = "rq3_sprlog";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";
}

$action = $_REQUEST['action'];
switch ($action) {
    case 'add':
        $type = $_SERVER['X-Event-Key'];
        $payload = file_get_contents('php://input');
        add_log($type, $payload);
        break;
    case 'getRecent':
        break;
    case 'getAll':
        break;
    default:
        echo json_encode("Invalid action");
        break;
}
?>