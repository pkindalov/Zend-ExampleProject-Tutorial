<?php

namespace Album\Controller;

use Album\Form\AlbumForm;
use Album\Model\Album;
use Album\Model\AlbumTable;
use Album\Model\Artist;
use Album\Model\AlbumModel;


use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;


class AlbumController extends AbstractActionController
{

    private $table;
    private $sm;
    private $artistTable;
    private $albumModel;


    public function __construct(AlbumTable $table, AlbumModel $albumModel)
    {
        $this->table = $table;
        $this->albumModel = $albumModel;

//
    }

    public function indexAction()
    {
    // Grab the paginator from the AlbumTable:
        $paginator = $this->table->fetchAll(true);

        // Set the current page to what has been passed in query string,
        // or to 1 if none is set, or the page is invalid:
        $page = (int) $this->params()->fromQuery('page', 1);
        $page = ($page < 1) ? 1 : $page;
        $paginator->setCurrentPageNumber($page);

        // Set the number of items per page to 10:
        $paginator->setItemCountPerPage(10);

        $vm = new ViewModel(['paginator' => $paginator]);
//        var_dump(__DIR__);
        $template = 'index.phtml';
        return $this->layout('app/'.$template);
    }
    
    public function getAllAlbumsAction() {
       
        
//       $albums= $this->table->fetchAll(true);
       $albumsResultSet= $this->table->fetchAllNoPagination();

       $data = [];
       $jsonData = [
            'success' => true,
            'data' => []
    ];
//       $json = json_encode($albums);
       
        foreach ($albumsResultSet as $row){
            array_push($jsonData['data'], $row); 
//            array_push($data, json_encode($row));
        }
        
        
       
         
//       echo($json);
      
//        var_dump($albums);
//        var_dump($albums['arrayObjectPrototype']['returnType']);
//        
//        return new \Zend\View\View;
//        $this->_helper->json($albums);
        
//          return new JsonModel($data);
        return new JsonModel($jsonData);
    }

    public function addAction()
    {
        $jsonData = [
                'success' => true,
//                'text' => 'creating new post',
//                'id' => $id 
                  
            ];
        
        
        $form = new AlbumForm();
        $form->get('submit')->setValue('Add');

        $request = $this->getRequest();

        if (! $request->isPost()) {
            return ['form' => $form];
        }
        
        //new field here
        $artist = new Artist();
        
         //new fields here
        $form->setInputFilter($artist->getInputFilter());
        

//        $album = new Album();
        
        
//        $form->setInputFilter($album->getInputFilter());
        
       
        
        $form->setData($request->getPost());
        
      
        

        if (! $form->isValid()) {
            return ['form' => $form];
        }

        $this->albumModel->save($form->getData());

        //new field here
        
        
//        $album->exchangeArray($form->getData());
        
        //new field here
//        $createdArtistId = $this->table->saveArtistAndGetId($artist);
        $createdArtistId = $this->artistTable->saveArtistAndGetId($artist);

        return $createdArtistId;
//        $this->table->saveAlbum($album);
//        return new JsonModel($jsonData);
//        return $this->redirect()->toRoute('album');
    }

    public function editAction()
    {
//        echo 'we are here';
        $id = (int) $this->params()->fromRoute('id', 0);

        if (0 === $id) {
            return $this->redirect()->toRoute('album', ['action' => 'add']);
        }

        // Retrieve the album with the specified id. Doing so raises
        // an exception if the album is not found, which should result
        // in redirecting to the landing page.
        try {
            $album = $this->table->getAlbum($id);
        } catch (\Exception $e) {
            return $this->redirect()->toRoute('album', ['action' => 'index']);
        }

        $form = new AlbumForm();
        $form->bind($album);
        $form->get('submit')->setAttribute('value', 'Edit');

        $request = $this->getRequest();
        $viewData = ['id' => $id, 'form' => $form];

        if (! $request->isPost()) {
            return $viewData;
        }

        $form->setInputFilter($album->getInputFilter());
        $form->setData($request->getPost());

        if (! $form->isValid()) {
            return $viewData;
        }

        $this->table->saveAlbum($album);

        // Redirect to album list
        return $this->redirect()->toRoute('album', ['action' => 'index']);
    }

    public function deleteAction()
    {
         $id = (int) $this->params()->fromRoute('id', 0);
        if (!$id) {
            return $this->redirect()->toRoute('album');
        }

        $request = $this->getRequest();
        if ($request->isPost()) {
            $del = $request->getPost('del', 'No');

            if ($del == 'Yes') {
                $id = (int) $request->getPost('id');
                $this->table->deleteAlbum($id);
            }

            // Redirect to list of albums
            return $this->redirect()->toRoute('album');
        }

        return [
            'id'    => $id,
            'album' => $this->table->getAlbum($id),
        ];
    }
    
    
    
    public function createEditAction(){
                 
//        $id = (int)$this->params()->fromRoute('id', 0);
          $request = $this->getRequest();
          $id = (int) $request->getPost('id');
          
            $jsonData = [
                'success' => true,
//                'text' => 'creating new post',
//                'id' => $id 
                  
            ];

        
        if($id === 0){
            //if id is false, we must create new record. To put create query here
            $this->addAction();
            
            return new JsonModel($jsonData);
        }else {
                 //if the id exists then the edit query must be here.
              try {
                $album = $this->table->getAlbum($id);
            } catch (\Exception $e) {
                return $this->redirect()->toRoute('album', ['action' => 'index']);
            }

            $form = new AlbumForm();
            $form->bind($album);
            $form->get('submit')->setAttribute('value', 'Edit');

            $request = $this->getRequest();
            $viewData = ['id' => $id, 'form' => $form];

            if (!$request->isPost()) {
                return $viewData;
            }

            $form->setInputFilter($album->getInputFilter());
            $form->setData($request->getPost());

            if (!$form->isValid()) {
                return $viewData;
            }

            $this->table->saveAlbum($album);
            
               $jsonData = [
                'success' => true,
                'text' => 'editing post'
            ];
//
            return new JsonModel($jsonData);

            // Redirect to album list
//            return $this->redirect()->toRoute('album', ['action' => 'index']);
        }
    }
    
    
}