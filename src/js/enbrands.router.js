var router = {
    container    : $('#pageContainer'),
    _pageStack   : [],
    _configs     : [],
    _pageAppend  : function(){},
    _defaultPage : null,
    _pageIndex   : 1,
    init : function(conf){
        var _self = this,
            state = history.state;
        if( state && state._pageIndex ) _self._pageIndex = state._pageIndex;
        _self._initRouterConfigs();
        window.onhashchange = function(){
            var hash = location.hash;
            var url = hash.indexOf("#") === 0 ? hash : '#';
            var state = history.state;
            if( state && state._pageIndex <= _self._pageIndex ){
                _self._back();
            }else{
                _self._go();
            }
        };
        _self._pageIndex--;
        _self._go();
        return this;
    },
    _back:function(){
        var _self = this,
            _hash = location.hash,
            _state = history.state || {};
        _self._pageIndex--;
        var pageSnippet = _self.container.find('.pageSnippet');
        if(pageSnippet.length===1 && _hash.length > 1)
            _self._appendPage();
        pageSnippet.last().addClass('slideOut');
    },
    _appendPage:function(_class){
        var _self = this,
            _hash = location.hash,
            _cla = _class || 'js_show';
        if( _hash.length>1 ){
            var html = $(_hash+"_html").html();
            var newpage = $('<div class="pageSnippet '+ _cla +'"></div>').html(html);
            newpage.on('animationEnd webkitAnimationEnd',function(){
                if( newpage.hasClass('slideOut') )
                    newpage.remove();
                else
                    newpage.removeClass('slideIn').addClass('js_show');
            });
            _self.container[_cla==='js_show' ? 'prepend' : 'append'](newpage);
        }
    },
    _go: function () {
        var _self = this,
            _hash = location.hash,
            _state = history.state || {};
        _self._pageIndex++;
        history.replaceState && history.replaceState({ _pageIndex: _self._pageIndex }, 'title', location.href );
        
        _self._appendPage('slideIn');        
        return this;
    },
    _initRouterConfigs: function(){
        var tmplList = $("script[type='text/html']"),
            _self = this;
        tmplList.each(function(v) {
            var _id = this.id || '';
            _id = _id.replace(/\_html/, '');
            _self._configs.push({
                tmplId: _id + '_html',
                url: '#' + _id
            });
        });
    }
};
module.exports = router;