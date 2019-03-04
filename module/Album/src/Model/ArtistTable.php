<?php
namespace Album\Model;

use RuntimeException;
use Zend\Db\ResultSet\ResultSet;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\TableGatewayInterface;
use Zend\Paginator\Adapter\DbSelect;
use Zend\Paginator\Paginator;

class ArtistTable
{
    private $tableGateway;

    public function __construct(TableGatewayInterface $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    public function fetchAll($paginated = false)
    {

        if ($paginated) {
            return $this->fetchPaginatedResults();
        }

        return $this->tableGateway->select();
 
    }
    
    
    public function fetchAllNoPagination() {
         return $this->tableGateway->select();
    }


        public function getArtist($id)
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

    public function save(Artist $artist) {
        $result = $this->tableGateway->select(['name' => $artist->name])->current();
        if (empty($result)) {
            $this->tableGateway->insert([
                'name' => $artist->name
            ]);
            $artist->id = $this->tableGateway->lastInsertValue;
        } else {
            $artist->id = $result->id;
        }
    }

    public function saveArtist(Artist $artist)
    {
        $data = [
            'artist' => $artist->artist
        ];

        $id = (int) $artist->id;

        if ($id === 0) {
            $this->tableGateway->insert($data);
            return;
        }

        try {
            $this->getArtist($id);
        } catch (RuntimeException $e) {
            throw new RuntimeException(sprintf(
                'Cannot update album with identifier %d; does not exist',
                $id
            ));
        }

        $this->tableGateway->update($data, ['id' => $id]);
    }
    
    
        public function saveArtistAndGetId(Artist $artist)
    {
        $data = [
            'artist' => $artist->artist
        ];

        $id = (int) $artist->id;

        if ($id === 0) {
            $this->tableGateway->insert($data);
            return  $this->tableGateway->lastInsertValue;
        }

        try {
            $this->getArtist($id);
        } catch (RuntimeException $e) {
            throw new RuntimeException(sprintf(
                'Cannot update album with identifier %d; does not exist',
                $id
            ));
        }

        $this->tableGateway->update($data, ['id' => $id]);
    }
    

    public function deleteArtist($id)
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