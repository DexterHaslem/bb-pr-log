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

//X-Event-Key: pullrequest:rejected
$type = $_SERVER['X-Event-Key'];
$entityBody = file_get_contents('php://input');

//echo $entityBody;

$action = $_REQUEST['action'];

switch ($action) {
    case 'add':
        break;
    case 'getRecent':
        break;
    case 'getAll':
        break;
    default:
        echo "unknown action";
        break;
}
?>