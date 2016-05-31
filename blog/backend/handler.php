<?php
// header('content-type: application/json; charset=utf-8');
// header("access-control-allow-origin: *");

if(isset($_GET["property"]) && trim($_GET["property"]) == 'meta') {

    $folders = array_filter(glob('*'), 'is_dir');

    $array = array();
    $counter = 0;

    foreach($folders as $folder) {
        $counter++;
        $meta = file_get_contents($folder.'/meta.json');
        $json = json_decode($meta);
        $json->folder = $folder;
        $meta = json_encode($json);
        $array[$counter] = $json;
    }
    echo (json_encode($array));

}
elseif(isset($_GET["property"]) && trim($_GET["property"]) == 'body') {

    if(isset($_GET['folder'])) {
        $body = file_get_contents($_GET['folder'].'/body.html');

        // $jsonizedBody = json_encode($body);

        print_r(trim($body,'"'));
    }
}
else {
    echo "Wrong URL params";
}

?>
