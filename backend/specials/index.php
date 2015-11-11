<?php

function getCurrentDirectories()
{
    $path = __DIR__;
    $dir = opendir($path);
    $ret = array();
    while (($file=readdir($dir)) !== false) {
        if (validDateDir($file) && is_dir($path . DIRECTORY_SEPARATOR . $file)) {
            $ret[] = $file;
        }
    }

    return $ret;
}

function validDateDir($dir)
{
    if (preg_match('/^\d{8}.\d{8}$/', $dir)) {
        list($start, $end) = explode('.', $dir);
        $today = date('Ymd');
        if ($today >= $start && $today <= $end) {
            return true;
        }
    }

    return false;
}

function dirDates($dir)
{
    $pair = explode('.', $dir);
    $map = array_map(function($i){ return date('Y-m-d', strtotime($i)); }, $pair);
    return $map;
}

function getName($dir)
{
    if (file_exists($dir . DIRECTORY_SEPARATOR . 'name')) {
        return file_get_contents($dir . DIRECTORY_SEPARATOR . 'name');
    } else {
        throw new Exception('Missing sale name');
    }
}

function isImage($file)
{
    $file = strtolower($file);
    switch (substr($file, -4)) {
    case '.png':
    case '.jpg':
    case '.gif':
        return true;
    default:
        return false;
    }
}

function getImages($dir, $prefix)
{
    $dh = opendir($dir);
    $ret = array();
    while (($file=readdir($dh)) !== false) {
        if (is_file($dir . DIRECTORY_SEPARATOR . $file) && isImage($file)) {
            $ret[] = $prefix . '/' . $file;
        }
    }

    if (count($ret) === 0) {
        throw new Exception('Zero images for this sale');
    }

    sort($ret);

    return $ret;
}

function getSaleFromDir($dir)
{
    $ret = array();
    list($start, $end) = dirDates($dir);
    $ret['start'] = $start;
    $ret['end'] = $end;
    $here = __DIR__ . DIRECTORY_SEPARATOR . $dir;
    $ret['name'] = getName($here);
    $ret['images'] = getImages($here, $dir);

    return $ret;
}

$sales = array();
foreach (getCurrentDirectories() as $dir) {
    try {
        $sales[] = getSaleFromDir($dir);
    } catch (Exception $ex) {}
}

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($sales);

