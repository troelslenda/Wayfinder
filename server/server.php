<?php

error_reporting(E_ALL);

$lib = dirname(dirname(__FILE__)) . '/lib/php-websocket/server/lib';

//var_dump($lib);

require( $lib . '/SplClassLoader.php');
//require('DingWayfinderApplication.php');

$classLoader = new SplClassLoader('WebSocket', $lib);
$classLoader->register();
$classLoaderDing = new SplClassLoader('Ding', dirname(__FILE__));
$classLoaderDing->register();

$server = new \WebSocket\Server('localhost', 8000);
$server->registerApplication('echo', \WebSocket\Application\EchoApplication::getInstance());
$server->registerApplication('time', \WebSocket\Application\TimeApplication::getInstance());
$server->registerApplication('dwf', \Ding\WayfinderApplication::getInstance());

$server->run();
