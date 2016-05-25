hsr = hsr || {};

hsr.blog = ((window, undefined) => {

    let init, buildBlogPostBLocks, addClickHandler;

    let bodyElement = document.querySelector('body');

    init = () => {
        buildBlogPostBLocks();
    };

    buildBlogPostBLocks = () => {
        let blogPostsContainer = document.querySelector('.js-blogposts-container');
        let blogPostTemplate = document.querySelector('.js-blog-post-template');

        getAjax('admin/backend/handler.php?property=meta', function(data) {
            let metaData = JSON.parse(data);
            let metaDataArray = [];
            // convert data to Array of objects
            Object.keys(metaData).forEach(function(key) {
                metaDataArray.push(metaData[key + '']);
            });

            metaDataArray.forEach(function(metaData) {
                // create blogpost blocks
                let blogPostPlaceholder = blogPostTemplate.cloneNode(true);
                let titleElement = blogPostPlaceholder.querySelector('.js-blog-post-title');
                let dateElement = blogPostPlaceholder.querySelector('.js-blog-post-date');
                let introElement = blogPostPlaceholder.querySelector('.js-blog-post-intro');

                titleElement.innerHTML = metaData.title + titleElement.innerHTML;
                dateElement.textContent = metaData.date;
                introElement.textContent = metaData.description;

                // add clickhandler to blogpost => content loaded & it expands
                addClickHandler(blogPostPlaceholder.querySelector('.js-blog-post'));

                // remove original template
                blogPostsContainer.appendChild(blogPostPlaceholder);
            });
            blogPostTemplate.parentNode.removeChild(blogPostTemplate);
        });

        function getAjax(url, success) {
            let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('GET', url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
            };
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send();
            return xhr;
        }
    }

    addClickHandler = (blogpost) => {
        blogpost.addEventListener('click', (event) => {
            if (!blogpost.classList.contains('active')) {
                bodyElement.style.overflow = 'hidden';
                // set to position fixed
                let blogPostOffset = blogpost.getBoundingClientRect();
                let blogPostDimensions = {
                    width: blogpost.offsetWidth,
                    height: blogpost.offsetHeight
                }
                blogpost.classList.add('active');
                blogpost.style.width = blogPostDimensions.width + 'px';
                blogpost.style.height = blogpost.parentNode.style.height =  blogPostDimensions.height + 'px';
                blogpost.style.top = blogPostOffset.top + 'px';
                blogpost.style.left = blogPostOffset.left + 'px';

                // make full screen
                window.setTimeout(() => {
                    blogpost.style.top = '0';
                    blogpost.style.left = '0';
                    blogpost.style.width = window.innerWidth + 'px';
                    blogpost.style.height = window.innerHeight + 'px';
                }, 50);

                window.setTimeout(() => {
                    blogpost.classList.add('positioned');
                }, 300);

                let closeElement = blogpost.getElementsByTagName('h1')[0].getElementsByTagName('span')[0];
                closeElement.blogPostOffset = blogPostOffset;
                closeElement.blogPostDimensions = blogPostDimensions;
                closeElement.removeEventListener('click', closeBlogPost);
                closeElement.addEventListener('click', closeBlogPost);
            }
        });

        function closeBlogPost(event) {
            blogpost.style.top = event.target.blogPostOffset.top + 'px';
            blogpost.style.left = event.target.blogPostOffset.left + 'px';
            blogpost.style.width = event.target.blogPostDimensions.width + 'px';
            blogpost.style.height = event.target.blogPostDimensions.height + 'px';
            blogpost.classList.remove('positioned');

            window.setTimeout(() => {
                bodyElement.style.overflow = '';
                blogpost.classList.remove('active');
            }, 300);
            event.stopPropagation();
        }
    }

    return {
        init: init
    };

}(window));

