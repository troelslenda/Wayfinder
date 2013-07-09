<?php

error_reporting(E_ALL);

function findDrupalRoot($dir) {
	if ($dir == '/') {
    // nothing found at all!
    return FALSE;
  }
  if(in_array('index.php',scandir($dir))){

    return $dir;
  }
  return findDrupalRoot(dirname($dir));
}

$root = findDrupalRoot(dirname(__FILE__));
if ($root) {
  require_once $root . '/includes/bootstrap.inc';
}


use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

$lib = dirname(dirname(__FILE__)) . '/lib/Ratchet/vendor';
require( $lib . '/autoload.php');

/**
 * Wayfinder
 * Send any incoming messages to all connected clients (except sender)
 */
class Wayfinder implements MessageComponentInterface {
  protected $clients;

  public function __construct() {
    $this->clients = new \SplObjectStorage;
  }

  public function onOpen(ConnectionInterface $conn) {
    $this->clients->attach($conn);
  }

  public function onMessage(ConnectionInterface $from, $msg) {
    foreach ($this->clients as $client) {
      if ($from != $client) {
        $client->send($msg);
      }
    }
  }

  public function onClose(ConnectionInterface $conn) {
    $this->clients->detach($conn);
  }

  public function onError(ConnectionInterface $conn, \Exception $e) {
    $conn->close();
  }
}


    // Run the server application through the WebSocket protocol on port 8080
$server = IoServer::factory(new WsServer(new Wayfinder), 8080);
$server->run();
