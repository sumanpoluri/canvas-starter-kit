(function(window) {
    'use strict';

    var resizeTimeout;

    initializeSfCanvas();

    function initializeSfCanvas() {
        //initialize our canvas library, this will resize the canvas app and force a resize
        cnvService.initialize(confirmInitialization);

        function confirmInitialization(result) {
            var firstName = result.context.user.firstName;
            var sfContext = JSON.stringify(result.context, null, 2);
            localStorage.setItem('sfContext', sfContext);
        }

        function windowResize(e) {
            //Compare this to event target to make sure this isn't an event that has bubbled up
            if (this == e.target) {
                // ignore resize events as long as an actualResizeHandler execution is in the queue
                if ( !resizeTimeout ) {
                    resizeTimeout = setTimeout(function() {
                        resizeTimeout = null;
                        resizeSfCanvasBody();
                        // The actualResizeHandler will execute at a rate of 15fps
                    }, 200);
                }
            }
        }

        //On window resize => resize the app
        window.onresize = windowResize;

    }

    function sizeSfCanvasContent() {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !resizeTimeout ) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                resizeSfCanvasBody();
                // The actualResizeHandler will execute at a rate of 15fps
            }, 200);
        }
    }

    window.sizeSfCanvasContent = sizeSfCanvasContent;

    function resizeSfCanvasBody() {
        var cnvAppDiv = document.getElementById('app');
        var height = window.height;
        var width = cnvAppDiv.offsetWidth;
        var sideBarWidth = document.getElementById('sidebar').offsetWidth;
        document.body.style.height = height + "px";
        document.getElementById('content').style.width = width - sideBarWidth + "px";
    }

    window.resizeSfCanvasBody = resizeSfCanvasBody;

})(window);
