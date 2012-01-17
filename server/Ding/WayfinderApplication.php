<?php
namespace Ding;
use \WebSocket\Application\Application;

/**
 * Digital Wayfinder WebSocket Application
 * 
 * @author Troels Lenda <troelslenda@gmail.com>
 */
class WayfinderApplication extends Application
{
    private $clients = array();

    public function onConnect($client)
    {
        $this->clients[] = $client;
    }

    public function onDisconnect($client)
    {
        $key = array_search($client, $this->clients);
        if ($key) {
            unset($this->clients[$key]);
        }
    }

    public function onData($data, $client)
    {
        foreach ($this->clients as $sendto) {
            $sendto->send($data);
var_dump($sendto);
        }
    }
}
