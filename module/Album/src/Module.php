<?php
namespace Album;

use Album\Model\AlbumTable;
use Album\Model\ArtistTable;
use Album\Model\AlbumModel;
use Album\Model\SongTable;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\TableGateway\TableGateway;
use Zend\ModuleManager\Feature\ConfigProviderInterface;




class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }

    public function getServiceConfig()
    {
        return [
            'factories' => [
                Model\AlbumTable::class => function($container) {
                    $tableGateway = $container->get('AlbumTableGateway');
                    $table = new AlbumTable($tableGateway);
                    return $table;
//                    return new Model\AlbumTable($tableGateway);
                },


                'AlbumTableGateway'=> function ($container) {
                    $dbAdapter = $container->get(AdapterInterface::class);
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Model\Album());
                    return new TableGateway('album', $dbAdapter, null, $resultSetPrototype);
                },

                //new
                Model\ArtistTable::class => function($container) {
                    $tableGateway = $container->get('ArtistTableGateway');
                    $table = new ArtistTable($tableGateway);
                    return $table;
//                    return new Model\ArtistTable($tableGateway);
                },
                //new
                'ArtistTableGateway' => function ($container) {
                    $dbAdapter = $container->get(AdapterInterface::class);
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Model\Artist());
                    return new TableGateway('artist', $dbAdapter, null, $resultSetPrototype);
                },


                Model\SongTable::class => function($container) {
                    $tableGateway = $container->get('SongTableGateway');
                    $table = new SongTable($tableGateway);
                    return $table;
//                    return new Model\ArtistTable($tableGateway);
                },
                //new
                'SongTableGateway' => function ($container) {
                    $dbAdapter = $container->get(AdapterInterface::class);
                    $resultSetPrototype = new ResultSet();
                    $resultSetPrototype->setArrayObjectPrototype(new Model\Song());
                    return new TableGateway('songs', $dbAdapter, null, $resultSetPrototype);
                },



                AlbumModel::class => function ($container) {
                    return new AlbumModel(
                        $container->get(Model\AlbumTable::class),
                        $container->get(Model\ArtistTable::class),
                        $container->get(Model\SongTable::class)
                    );
                },


            ],
        ];
    }

    public function getControllerConfig()
    {
        return [
            'factories' => [
                Controller\AlbumController::class => function($container) {
                    return new Controller\AlbumController(
                        $container->get(Model\AlbumTable::class, Model\ArtistTable::class),
                        $container->get(AlbumModel::class)
                    );
                },
                //new
//                 Controller\AlbumController::class => function($container) {
//                    return new Controller\AlbumController(
//                        $container->get(Model\ArtistTable::class)
//                    );
//                },
            ],




        ];
    }
}

