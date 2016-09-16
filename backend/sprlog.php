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

$servername = "localhost";
$username = "rq3";
$password = "eB6rW4RMeV";
$dbname = "rq3_sprlog";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!isset($_REQUEST['action'])) {
    die("no action");
}

$action = $_REQUEST['action'];

switch ($action) {
    case "add":
        // PHP server header naming is weird
        $add_type = $conn->$_SERVER['HTTP_X_EVENT_KEY'];
        $add_payload = file_get_contents('php://input');
        // this is stupid, convert from json, then back to json to strip crap
        // like newlines etc, makes it nice normalized json in db
        $add_payload_decoded = json_decode($add_payload, true );
        $add_payload_converted = json_encode($add_payload_decoded);
        $stmt = $conn->prepare("INSERT INTO log(type, payload) VALUES (?, ?)");
        $stmt->bind_param('ss', $add_type, $add_payload_converted);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        //echo $add_payload_converted;
        //echo var_dump($_SERVER);
        return;
    case "getRecent":
        $query = "select type,payload,time from log limit 25";
        break;
    case "getAll":
        $query = "select type,payload,time from log";
        break;
    default:
        die("Invalid action");
}

$result = $conn->query($query);
if (!$result) {
    $message = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

while ($row = $result->fetch_assoc()) {
    $ret[] = $row;//json_encode($row);
}

echo json_encode($ret);

$conn->close();
?>