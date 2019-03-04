<?php
namespace Album\Model;

use Album\Model\Artist;
use Album\Model\Album;

class AlbumModel
{
    private $albumTable;
    private $artistTable;

    public function __construct($albumTable, $artistTable)
    {
        $this->albumTable = $albumTable;
        $this->artistTable = $artistTable;
    }

    public function save(array $data)
    {

        $artist = new Artist();
        $artist->exchangeArray([
            'name' => $data['artist']
        ]);
        $this->artistTable->save($artist);

        $albumData = [];
        $albumData['title'] = $data['title'];
        $albumData['artist_id'] = $artist->id;
        $albumData['song_id'] = 1;

        $album = new \Album\Model\Album();
        $album->exchangeArray($albumData);

        $this->albumTable->save($album);

        die;
    }
}