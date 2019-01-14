<?php
try{
	$db = new PDO('mysql:host=localhost;dbname=zf3tutorial', 'root', '');
	  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	  $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

	  // $result = $db->query('SELECT * FROM posts');

	  // while ($row = $result->fetch()) {
	  // 	echo $row['title'].'<br />\n';
	  // }

	$fh = fopen(__DIR__ . '/schema.sql', 'r');
	while ($line = fread($fh, 4096)) {
	    $db->exec($line);
	}
	fclose($fh);
	
} catch(Exception $e) {
	 echo 'Exception -> ';
     var_dump($e->getMessage());
}

