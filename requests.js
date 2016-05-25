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

//folder with this name should exist before fetching wanted data

getAjax('admin/backend/handler.php?property=body&folder=folder', function(data) {
    console.log('body: ' + data);
});

getAjax('admin/backend/handler.php?property=meta', function(data) {
    console.log('meta: ' + data);
});

