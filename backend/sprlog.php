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
$url = $_REQUEST['url'];
$ret = '';
if ($url != '') {
    $ret = file_get_contents($url);
}
echo "hello world";
?>