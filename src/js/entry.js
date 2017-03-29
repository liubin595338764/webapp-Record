/**
 * 
 * @authors liubin
 */

console.info('hello enbrandsUI');

(function(win, page){
    $('html').css('fontSize', document.body.offsetWidth / 10 + 'px');
    // FastClick.attach(document.body);
    var enbrandsActive = require('./enbrands.active.js');
    win.router = require('./enbrands.router.js');
    page.touchActive = function(){
        var selector = '.m-bar, .m-btn, label.m-cell',
            activeArea;
        $(document).on("touchstart", selector, function (e) {
            if( this.classList.contains('disabled') ) return false;
            if(activeArea){
                activeArea.removeClass('active');
            }
            activeArea = $(this);
            activeArea.addClass("active");
            e.stopPropagation();
        }); 
        $(document).on("touchend", selector, function (e) {
            if(activeArea){
                activeArea.removeClass('active');
                activeArea = null;
            }
        });

    };

    page.init = function(){
        page.touchActive();
        router.init();
    };
    page.init();
})(window, window['page'] || (window['page']={}));