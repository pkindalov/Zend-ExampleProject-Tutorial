<?php
namespace Album;
use Zend\Router\Http\Segment;
use Zend\Router\Http\Literal;

return [
    'router' => [
        'routes' => [
            'album' => [
                'type'    => Segment::class,
                'options' => [
                    'route' => '/album[/:action[/:id]]',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ],
                    'defaults' => [
                        'controller' => Controller\AlbumController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            
               'getAlbums' => [
                'type'    => Literal::class,
                'options' => [
                    'route' => '/getAlbums',
                    'constraints' => [
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*'
                    ],
                    'defaults' => [
                        'controller' => Controller\AlbumController::class,
                        'action'     => 'getAllAlbums',
                    ],
                ],
            ],    
        
            
        ],
    ],
    
    
    'view_manager' => [
        'template_path_stack' => [
                 __DIR__ . '/../view',
                 __DIR__ . '/../../../public' // newLine  
//            'album' => __DIR__ . '/../view',
//            __DIR__ . '/../../../public/',
//            'base_path' => 'zend/public/',
//            'template_path_stack' => '/../../../public/app/',
//            'album' => '/../../../public/app/'
        ],
         'strategies' => [
                'ViewJsonStrategy'
         ],
    ],
    

     [
        'Zend\Form',
        'Zend\Db',
        'Zend\Router',
        'Zend\Validator',
        'Application',
        'Album',
        'Blog'    
    ],
];


