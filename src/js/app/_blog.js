hsr = hsr || {};

hsr.blog = ((window, undefined) => {

    let init, buildBlogPostBLocks, addClickHandler, getAjax;

    let bodyElement = document.querySelector('body');

    // let urlPrefix = 'http://localhost:8888/';
    // var urlPrefix = 'http://66.147.244.54/~stupidw2/';
    // let urlPrefix = 'http://www.highlight-science-writing.com/';
    let urlPrefix = 'http://www.fredericaerts.com/external/projects/highlight-science-writing/';


    init = () => {
        buildBlogPostBLocks();
    };

    buildBlogPostBLocks = () => {
        let blogPostsContainer = document.querySelector('.js-blogposts-container');
        let blogPostTemplate = document.querySelector('.js-blog-post-template');

        getAjax(urlPrefix + 'blog/backend/handler.php?property=meta', function(data) {
            let metaData = JSON.parse(data);
            let metaDataArray = [];
            // convert data to Array of objects
            Object.keys(metaData).forEach(function(key) {
                metaDataArray.push(metaData[key + '']);
            });

            // make date property a proper Date object
            metaDataArray.map(function(metaData) {
                let dateValues = metaData.date.split('/');
                metaData.date = new Date(dateValues[2], dateValues[1] - 1, dateValues[0]);
                return metaData;
            })

            // sort on date
            metaDataArray.sort(function(a, b) {
                return b.date - a.date;
            });

            metaDataArray.forEach(function(metaData) {
                // create blogpost blocks
                let blogPostPlaceholder = blogPostTemplate.cloneNode(true);
                let titleElement = blogPostPlaceholder.querySelector('.js-blog-post-title');
                let dateElement = blogPostPlaceholder.querySelector('.js-blog-post-date');
                let introElement = blogPostPlaceholder.querySelector('.js-blog-post-description');

                titleElement.innerHTML = metaData.title + titleElement.innerHTML;
                dateElement.textContent = formatDate(metaData.date);
                introElement.textContent = metaData.description;

                // add clickhandler to blogpost => content loaded & it expands
                addClickHandler(blogPostPlaceholder.querySelector('.js-blog-post'), metaData);

                // remove original template
                blogPostsContainer.appendChild(blogPostPlaceholder);
            });
            blogPostTemplate.parentNode.removeChild(blogPostTemplate);
        });

        function formatDate(date) {
            var monthNames = [
              "January", "February", "March",
              "April", "May", "June", "July",
              "August", "September", "October",
              "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return monthNames[monthIndex] + ' ' + day + ', ' + year;
        }
    }

    addClickHandler = (blogpost, metaData) => {
        let blogPostContentElement = blogpost.querySelector('.js-blog-post-content');
        let blogPostIntroElement = blogpost.querySelector('.js-blog-post-intro');
        let blogPostSpinnerElement = blogpost.querySelector('.js-spinner');

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

                blogPostIntroElement.style.display = 'none';
                blogPostSpinnerElement.style.display = 'inline-block';
                setTimeout(function() {
                    blogPostSpinnerElement.style.display = 'inline-block';
                    setTimeout(function() {
                        blogPostSpinnerElement.classList.add('active');
                    }, 50);
                }, 250);
                // get content
                getAjax(urlPrefix + 'blog/backend/handler.php?property=body&folder=' + metaData.folder, function(data) {
                    let bodyHtml = data;
                    blogPostSpinnerElement.classList.remove('active');
                    setTimeout(function() { // wait for spinner fade out
                        blogPostSpinnerElement.style.display = 'none';
                        blogPostContentElement.innerHTML = bodyHtml;
                        blogPostContentElement.classList.add('active');
                    }, 300);
                });
            }
        });

        function closeBlogPost(event) {
            blogPostContentElement.innerHTML = "";
            blogPostIntroElement.style.display = 'block';
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

    getAjax = (url, success) => {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
        return xhr;
    }

    return {
        init: init
    };

}(window));

