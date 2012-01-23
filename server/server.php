<?php

error_reporting(E_ALL);

function findDrupalRoot($dir) {
  if(in_array('index.php',scandir($dir))){
    return $dir;
  }
  return findDrupalRoot(dirname($dir));
}
$root = findDrupalRoot(dirname(__FILE__));
require_once $root . '/includes/bootstrap.inc';
//drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
//var_dump(variable_det('ding_wayfinder_server',''));


$lib = dirname(dirname(__FILE__)) . '/lib/php-websocket/server/lib';
require( $lib . '/SplClassLoader.php');

$classLoader = new SplClassLoader('WebSocket', $lib);
$classLoader->register();
$classLoaderDing = new SplClassLoader('Ding', dirname(__FILE__));
$classLoaderDing->register();


$server = new \WebSocket\Server('localhost', 8000);
$server->registerApplication('echo', \WebSocket\Application\EchoApplication::getInstance());
$server->registerApplication('time', \WebSocket\Application\TimeApplication::getInstance());
$server->registerApplication('dwf', \Ding\WayfinderApplication::getInstance());

$server->run();
