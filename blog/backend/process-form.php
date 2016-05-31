<?php
// header('content-type: application/json; charset=utf-8');
// header("access-control-allow-origin: *");

if (!empty($_POST)) {
    $folderTitle = $_POST['folder'];
    $title = $_POST['title'];
    $date = $_POST['date'];
    $description= $_POST['description'];
    $body = $_POST['bodyHtml'];


    if(!is_dir($folderTitle)) {
        //Directory does not exist, so lets create it.
        mkdir($folderTitle, 0777, true);
    }

    $data = array(
        "title" => $title,
        "date"  => $date,
        "description" => $description
    );


    $fh = fopen($_POST['folder'].'/meta.json', 'w') or die("Can't create file");
    fwrite($fh, json_encode($data));
    fclose($fh);

    $fh = fopen($_POST['folder'].'/body.html', 'w') or die("Can't create file");
    fwrite($fh,  stripslashes($body));
    fclose($fh);
    echo 'success';
}

?>
