<?php
try{
	$db = new PDO('mysql:host=localhost;dbname=zf3tutorial', 'root', '');
	  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	  $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	$fh = fopen(__DIR__ . '/album_fixtures.sql', 'r');
	while ($line = fread($fh, 4096)) {
	    echo $line;
	    $db->exec($line);
	}
	fclose($fh);
	echo "Data loaded";
	
} catch(Exception $e) {
	 echo 'Exception -> ';
     var_dump($e->getMessage());
}

