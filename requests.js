function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

/*  REQUESTS LISTING
    ================================================================ */
getAjax('admin/backend/handler.php?property=folder', function(data) {
    console.log('folder: ' + data);
});

getAjax('admin/backend/handler.php?property=title', function(data) {
    console.log('title: ' + data);
});

getAjax('admin/backend/handler.php?property=date', function(data) {
    console.log('date: ' + data);
});

getAjax('admin/backend/handler.php?property=description', function(data) {
    console.log('description: ' + data);
});

getAjax('admin/backend/handler.php?property=body', function(data) {
    console.log('body: ' + data);
});
