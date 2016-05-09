hsr = hsr || {};

hsr.blog = ((window, undefined) => {

    let init, addClickHandlers;

    let blogPostsArray = [].slice.call(document.querySelectorAll('.js-blog-post'));

    init = () => {
        addClickHandlers();
    };

    addClickHandlers = () => {
        let bodyElement = document.querySelector('body');
        blogPostsArray.forEach((blogpost) => {
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
        });
    }

    return {
        init: init
    };

}(window));

