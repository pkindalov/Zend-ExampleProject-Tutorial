<?php
namespace Album\Model;

use RuntimeException;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\TableGatewayInterface;
use Zend\Paginator\Adapter\DbSelect;
use Zend\Paginator\Paginator;
use Zend\Db\Adapter\Adapter;

use Zend\Db\Adapter\Driver\ResultInterface;


class AlbumTable
{
    private $tableGateway;
    private $adapter;

    public function __construct(TableGatewayInterface $tableGateway)
    {
        $this->tableGateway = $tableGateway;
        $this->adapter = new Adapter([
            'driver'   => 'Pdo_Mysql',
            'database' => 'zf3tutorial',
            'username' => 'root',
            'password' => ''
        ]);
    }

    public function fetchAll($paginated = false)
    {

        if ($paginated) {
            return $this->fetchPaginatedResults();
        }

        return $this->tableGateway->select();
 
    }
    
    
    public function fetchAllNoPagination() {
       
//         return $this->tableGateway->select();
        $sql = "SELECT album.id, album.title, songs.title AS song, artist.name FROM album INNER JOIN artist ON album.artist_id = artist.id INNER JOIN songs ON album.song_id = songs.id";
        $statement = $this->adapter->createStatement($sql);
        $statement->prepare();
        $result = $statement->execute();
        return $result;


//        $sql = "SELECT * FROM album INNER JOIN artist ON album.artist_id = artist_id";
//        $statement = $sql->prepareStatementForSqlObject($this->tableGateway->select());
//        $result = $statement->execute();
//        return $result;
        


//            return $this->tableGateway->select()
//            ->from(array('a' => 'album'),
//                array('id', 'title'))
//            ->join(array('art' => 'artist'),
//                'a.artist_id = art.id')->toArray();

//        $adapter = $this->tableGateway->getAdapter();
//        $sql = new Sql($adapter);
//
//        $select = $sql->select() ;
//        $select -> from ('Album')
//            -> join ( 'artist' , 'album.artist_id= artist_id');
//
//        $statement = $sql->prepareStatementForSqlObject($select);
//        return $statement->execute();


//        $sql = "SELECT * FROM album INNER JOIN artist ON album.artist_id = artist_id";
//        $statement = $sql->prepareStatementForSqlObject($this->tableGateway->select());
//        $result = $statement->execute();
//        return $result;

//        $album = 'album';
//        return $this->tableGateway->select(function (Select $select)  {
//              $select->columns(['id', 'title', 'song_id', 'artist_id']);
//              $select->join('artist', 'album.artist_id = artist_id', ['id', 'name']);
////              $select->where('album.artist_id = artist_id');
////              $select->from('album', ['id', 'title'])
////                     ->joinInner('artist', 'album.artist_id = artist_id', ['id', 'name']);
//
//        })->toArray();

//         $sql = "SELECT * FROM album INNER JOIN artist ON album.artist_id = artist_id";
//         $query_result = $this->adapter->query($sql);

//         return $query_result;


//         return $this->tableGateway->select()
//                                   ->from('album', ['id', 'title'])
//                                   ->joinInner('artist', 'album.artist_id = artist_id', ['id', 'name']);

    }


        public function getAlbum($id)
    {
        $id = (int) $id;
        $rowset = $this->tableGateway->select(['id' => $id]);
        $row = $rowset->current();
        if (! $row) {
            throw new RuntimeException(sprintf(
                'Could not find row with identifier %d',
                $id
            ));
        }

        return $row;
    }
    public function save(Album $album)
    {
        $this->tableGateway->insert($album->getArrayCopy());

    }
    public function saveAlbum(Album $album)
    {
        $data = [
            'artist' => $album->artist,
            'title'  => $album->title,
        ];

        $id = (int) $album->id;

        if ($id === 0) {
            $this->tableGateway->insert($data);
            return;
        }

        try {
            $this->getAlbum($id);
        } catch (RuntimeException $e) {
            throw new RuntimeException(sprintf(
                'Cannot update album with identifier %d; does not exist',
                $id
            ));
        }

        $this->tableGateway->update($data, ['id' => $id]);
    }

    public function deleteAlbum($id)
    {
        $this->tableGateway->delete(['id' => (int) $id]);
    }


     private function fetchPaginatedResults()
    {
        // Create a new Select object for the table:
        $select = new Select($this->tableGateway->getTable());

        // Create a new result set based on the Album entity:
        $resultSetPrototype = new ResultSet();
        $resultSetPrototype->setArrayObjectPrototype(new Album());

        // Create a new pagination adapter object:
        $paginatorAdapter = new DbSelect(
            // our configured select object:
            $select,
            // the adapter to run it against:
            $this->tableGateway->getAdapter(),
            // the result set to hydrate:
            $resultSetPrototype
        );

        $paginator = new Paginator($paginatorAdapter);
        return $paginator;
    }
}