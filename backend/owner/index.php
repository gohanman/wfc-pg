<?php

$ret = array(
    'valid' => false,
    'ownerNumber' => null,
);
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($ret);
