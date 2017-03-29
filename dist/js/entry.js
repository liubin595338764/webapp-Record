/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 
	 * @authors liubin
	 */
	
	console.info('hello enbrandsUI');
	
	(function(win, page){
	    $('html').css('fontSize', document.body.offsetWidth / 10 + 'px');
	    // FastClick.attach(document.body);
	    var enbrandsActive = __webpack_require__(1);
	    win.router = __webpack_require__(2);
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(window) {
	    var active;
	    window.addEventListener($.EVENT_START, function(event) {
	        var target = event.target;
	        var isCellDisabled = false;
	        for (; target && target !== document; target = target.parentNode) {
	            if (target.classList) {
	                var classList = target.classList;
	                if (classList.contains(CLASS_DISABLED)) { //normal
	                    isCellDisabled = true;
	                } else if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || classList.contains(CLASS_TOGGLE) || classList.contains(CLASS_BTN)) {
	                    isCellDisabled = true;
	                }
	                if (classList.contains(CLASS_TABLE_VIEW_CELL)) {
	                    if (!isCellDisabled) {
	                        active = target;
	                        var link = cell.querySelector('a');
	                        if (link && link.parentNode === cell) { //li>a
	                            active = link;
	                        }
	                    }
	                    break;
	                }
	            }
	        }
	    });
	})(window);
	module.exports = 'enbrands.active.js';

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTRkZjIwOWIzOGI4YTg5ZGQyZjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9lbmJyYW5kcy5hY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VuYnJhbmRzLnJvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsRTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLDhDQUE4QyxHOzs7Ozs7QUN0Qy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLCtCQUErQjtBQUM3QztBQUNBO0FBQ0EsMERBQXlEO0FBQ3pEO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUErRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxFQUFDO0FBQ0QsdUM7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBc0QsK0JBQStCOztBQUVyRixzQztBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTtBQUNBLHlCIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTRkZjIwOWIzOGI4YTg5ZGQyZjciLCIvKipcclxuICogXHJcbiAqIEBhdXRob3JzIGxpdWJpblxyXG4gKi9cclxuXHJcbmNvbnNvbGUuaW5mbygnaGVsbG8gZW5icmFuZHNVSScpO1xyXG5cclxuKGZ1bmN0aW9uKHdpbiwgcGFnZSl7XHJcbiAgICAkKCdodG1sJykuY3NzKCdmb250U2l6ZScsIGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLyAxMCArICdweCcpO1xyXG4gICAgLy8gRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTtcclxuICAgIHZhciBlbmJyYW5kc0FjdGl2ZSA9IHJlcXVpcmUoJy4vZW5icmFuZHMuYWN0aXZlLmpzJyk7XHJcbiAgICB3aW4ucm91dGVyID0gcmVxdWlyZSgnLi9lbmJyYW5kcy5yb3V0ZXIuanMnKTtcclxuICAgIHBhZ2UudG91Y2hBY3RpdmUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBzZWxlY3RvciA9ICcubS1iYXIsIC5tLWJ0biwgbGFiZWwubS1jZWxsJyxcclxuICAgICAgICAgICAgYWN0aXZlQXJlYTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbihcInRvdWNoc3RhcnRcIiwgc2VsZWN0b3IsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYoYWN0aXZlQXJlYSl7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBcmVhLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhY3RpdmVBcmVhID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgYWN0aXZlQXJlYS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9KTsgXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJ0b3VjaGVuZFwiLCBzZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYoYWN0aXZlQXJlYSl7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVBcmVhLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUFyZWEgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBwYWdlLmluaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHBhZ2UudG91Y2hBY3RpdmUoKTtcclxuICAgICAgICByb3V0ZXIuaW5pdCgpO1xyXG4gICAgfTtcclxuICAgIHBhZ2UuaW5pdCgpO1xyXG59KSh3aW5kb3csIHdpbmRvd1sncGFnZSddIHx8ICh3aW5kb3dbJ3BhZ2UnXT17fSkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2VudHJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBhY3RpdmU7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigkLkVWRU5UX1NUQVJULCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGlzQ2VsbERpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICg7IHRhcmdldCAmJiB0YXJnZXQgIT09IGRvY3VtZW50OyB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTGlzdCA9IHRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX0RJU0FCTEVEKSkgeyAvL25vcm1hbFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2VsbERpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcgfHwgdGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nIHx8IGNsYXNzTGlzdC5jb250YWlucyhDTEFTU19UT0dHTEUpIHx8IGNsYXNzTGlzdC5jb250YWlucyhDTEFTU19CVE4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDZWxsRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhDTEFTU19UQUJMRV9WSUVXX0NFTEwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0NlbGxEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rID0gY2VsbC5xdWVyeVNlbGVjdG9yKCdhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5rICYmIGxpbmsucGFyZW50Tm9kZSA9PT0gY2VsbCkgeyAvL2xpPmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGxpbms7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkod2luZG93KTtcclxubW9kdWxlLmV4cG9ydHMgPSAnZW5icmFuZHMuYWN0aXZlLmpzJztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9lbmJyYW5kcy5hY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJvdXRlciA9IHtcclxuICAgIGNvbnRhaW5lciAgICA6ICQoJyNwYWdlQ29udGFpbmVyJyksXHJcbiAgICBfcGFnZVN0YWNrICAgOiBbXSxcclxuICAgIF9jb25maWdzICAgICA6IFtdLFxyXG4gICAgX3BhZ2VBcHBlbmQgIDogZnVuY3Rpb24oKXt9LFxyXG4gICAgX2RlZmF1bHRQYWdlIDogbnVsbCxcclxuICAgIF9wYWdlSW5kZXggICA6IDEsXHJcbiAgICBpbml0IDogZnVuY3Rpb24oY29uZil7XHJcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgc3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgIGlmKCBzdGF0ZSAmJiBzdGF0ZS5fcGFnZUluZGV4ICkgX3NlbGYuX3BhZ2VJbmRleCA9IHN0YXRlLl9wYWdlSW5kZXg7XHJcbiAgICAgICAgX3NlbGYuX2luaXRSb3V0ZXJDb25maWdzKCk7XHJcbiAgICAgICAgd2luZG93Lm9uaGFzaGNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICAgICAgdmFyIHVybCA9IGhhc2guaW5kZXhPZihcIiNcIikgPT09IDAgPyBoYXNoIDogJyMnO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBoaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBpZiggc3RhdGUgJiYgc3RhdGUuX3BhZ2VJbmRleCA8PSBfc2VsZi5fcGFnZUluZGV4ICl7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5fYmFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIF9zZWxmLl9nbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBfc2VsZi5fcGFnZUluZGV4LS07XHJcbiAgICAgICAgX3NlbGYuX2dvKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgX2JhY2s6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgX3NlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBfaGFzaCA9IGxvY2F0aW9uLmhhc2gsXHJcbiAgICAgICAgICAgIF9zdGF0ZSA9IGhpc3Rvcnkuc3RhdGUgfHwge307XHJcbiAgICAgICAgX3NlbGYuX3BhZ2VJbmRleC0tO1xyXG4gICAgICAgIHZhciBwYWdlU25pcHBldCA9IF9zZWxmLmNvbnRhaW5lci5maW5kKCcucGFnZVNuaXBwZXQnKTtcclxuICAgICAgICBpZihwYWdlU25pcHBldC5sZW5ndGg9PT0xICYmIF9oYXNoLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIF9zZWxmLl9hcHBlbmRQYWdlKCk7XHJcbiAgICAgICAgcGFnZVNuaXBwZXQubGFzdCgpLmFkZENsYXNzKCdzbGlkZU91dCcpO1xyXG4gICAgfSxcclxuICAgIF9hcHBlbmRQYWdlOmZ1bmN0aW9uKF9jbGFzcyl7XHJcbiAgICAgICAgdmFyIF9zZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgX2hhc2ggPSBsb2NhdGlvbi5oYXNoLFxyXG4gICAgICAgICAgICBfY2xhID0gX2NsYXNzIHx8ICdqc19zaG93JztcclxuICAgICAgICBpZiggX2hhc2gubGVuZ3RoPjEgKXtcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSAkKF9oYXNoK1wiX2h0bWxcIikuaHRtbCgpO1xyXG4gICAgICAgICAgICB2YXIgbmV3cGFnZSA9ICQoJzxkaXYgY2xhc3M9XCJwYWdlU25pcHBldCAnKyBfY2xhICsnXCI+PC9kaXY+JykuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgbmV3cGFnZS5vbignYW5pbWF0aW9uRW5kIHdlYmtpdEFuaW1hdGlvbkVuZCcsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKCBuZXdwYWdlLmhhc0NsYXNzKCdzbGlkZU91dCcpIClcclxuICAgICAgICAgICAgICAgICAgICBuZXdwYWdlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld3BhZ2UucmVtb3ZlQ2xhc3MoJ3NsaWRlSW4nKS5hZGRDbGFzcygnanNfc2hvdycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgX3NlbGYuY29udGFpbmVyW19jbGE9PT0nanNfc2hvdycgPyAncHJlcGVuZCcgOiAnYXBwZW5kJ10obmV3cGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9nbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIF9oYXNoID0gbG9jYXRpb24uaGFzaCxcclxuICAgICAgICAgICAgX3N0YXRlID0gaGlzdG9yeS5zdGF0ZSB8fCB7fTtcclxuICAgICAgICBfc2VsZi5fcGFnZUluZGV4Kys7XHJcbiAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBfcGFnZUluZGV4OiBfc2VsZi5fcGFnZUluZGV4IH0sICd0aXRsZScsIGxvY2F0aW9uLmhyZWYgKTtcclxuICAgICAgICBcclxuICAgICAgICBfc2VsZi5fYXBwZW5kUGFnZSgnc2xpZGVJbicpOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgX2luaXRSb3V0ZXJDb25maWdzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0bXBsTGlzdCA9ICQoXCJzY3JpcHRbdHlwZT0ndGV4dC9odG1sJ11cIiksXHJcbiAgICAgICAgICAgIF9zZWxmID0gdGhpcztcclxuICAgICAgICB0bXBsTGlzdC5lYWNoKGZ1bmN0aW9uKHYpIHtcclxuICAgICAgICAgICAgdmFyIF9pZCA9IHRoaXMuaWQgfHwgJyc7XHJcbiAgICAgICAgICAgIF9pZCA9IF9pZC5yZXBsYWNlKC9cXF9odG1sLywgJycpO1xyXG4gICAgICAgICAgICBfc2VsZi5fY29uZmlncy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHRtcGxJZDogX2lkICsgJ19odG1sJyxcclxuICAgICAgICAgICAgICAgIHVybDogJyMnICsgX2lkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9lbmJyYW5kcy5yb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==