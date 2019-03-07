<?php
namespace Album\Model;

use Album\Model\Artist;
use Album\Model\Album;
use Album\Model\Song;

class AlbumModel
{
    private $albumTable;
    private $artistTable;
    private $songTable;

    public function __construct($albumTable, $artistTable, $songTable)
    {
        $this->albumTable = $albumTable;
        $this->artistTable = $artistTable;
        $this->songTable = $songTable;
    }

    public function save(array $data)
    {
        $artist = new Artist();
        $artist->exchangeArray([
            'name' => $data['artist']
        ]);
        $this->artistTable->save($artist);



        $song = new Song();
        $song->exchangeArray([
            'title' => $data['song']
        ]);

//        var_dump($song);
//        exit;
        $this->songTable->save($song);




        $albumData = [];
        $albumData['title'] = $data['title'];
        $albumData['artist_id'] = $artist->id;
        $albumData['song_id'] = $song->id;
//        $albumData['song_id'] = 1;

        $album = new \Album\Model\Album();
        $album->exchangeArray($albumData);

        $this->albumTable->save($album);

        die;
    }
}