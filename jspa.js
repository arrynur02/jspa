/*!
  * JSPA V1.0 - jQuery Single Page Application's
  * Author (https://github.com/arrynur)
  * Source (https://github.com/arrynur/jspa)
*/

(function(window){
	
	'use strict';

	var $wind = window,
	$doc = document,
	$hash = window.location.hash,
	segment = window.location.href,
	$search = window.location.search,
	$segNumSlash = segment.substring(segment.lastIndexOf($wind.location.pathname) + 1).split('/'),
	$body = $('body');

	var jspa = {

		option_ : {
			app:null,
			baseUrl:null,
			basePath:false,
			routerwithbaseurl:false,
			preload:false,
			preloadDelayTimes:null,
			hashReplace:null,
			routerMode:null,
			firstRouter:null,
			menuNavigation:{
				init_menuNav:null,
	    		ClassNavActive:null,
	    		ClassNav_Li_Active:null,
	    		ClassNav_Li_A_Active:null,
			}
		},

		event_option_ :{
			path:null,
			router:null,
			title:null
		},

		init:function(option_) {
				
			$.extend(jspa.option_, option_);

			var el = $(jspa.option_.menuNavigation.init_menuNav);

			if (option_.app === null) {
			
				console.log('first initialize app, for object content!');
				alert('first initialize app, for object content!');
			
			} else {

				if (segment.substring(segment.lastIndexOf(jspa.option_.baseUrl) + 1) || $wind.location.pathname) {

					if ($hash){

					jspa.MenuAttribute(ReGexp($hash));

					} else if ($search){

					jspa.MenuAttribute(ReGexp($search));

					} else if (checkSegment($segNumSlash[2])){

						jspa.MenuAttribute(ReGexp($segNumSlash[2]));

					} else if (checkSegment($segNumSlash[1])){

						jspa.MenuAttribute(ReGexp($segNumSlash[1]));

					} else if (checkSegment($segNumSlash[0])){

						jspa.MenuAttribute(ReGexp($segNumSlash[0]));

					} else {

						jspa.MenuAttribute(ReGexp(el.attr('router')));

					}

				}else{
					console.log('pathname not found!');
				}
			}	
		},
		RouterMode:function(route){

			if (jspa.option_.routerMode === 'hash') {
			
				var router = '#/' + ReGexp(route);
			
			}
			else if (jspa.option_.routerMode === 'slash') { 
			
				var router = '/' + ReGexp(route);
			
			}
			else if (jspa.option_.routerMode === 'search') { 
			
				var router = '?' + ReGexp(route);
			
			}
			else { var router = '' }

			return router;
		},
		MenuAttribute:function(route) {

			if (jspa.option_.menuNavigation.init_menuNav !== null) {

				$(jspa.option_.menuNavigation.init_menuNav).each(function(){

					if (route === ReGexp($(this).attr('router'))){
							
						jspa.event_({
							path:$(this).attr('href'),
							router:jspa.RouterMode($(this).attr('router')),
							title:$(this).attr('title_page')
						});

						jspa.NavigationMenuActive(ReGexp($(this).attr('router')));

					}

				});
			}
		},
		NavigationMenuActive:function(route){

			if (jspa.option_.menuNavigation.init_menuNav !== null){

				$(jspa.option_.menuNavigation.init_menuNav).each(function(){
					
					$(this).removeClass(jspa.option_.menuNavigation.ClassNav_Li_A_Active);
					$(this).parent().removeClass(jspa.option_.menuNavigation.ClassNav_Li_Active);
					$(this).parent().parent().removeClass(jspa.option_.menuNavigation.ClassNavActive);


					if (ReGexp($(this).attr('router')) === route){

						$doc.title = $(this).attr('title_page');

						$(this).addClass(jspa.option_.menuNavigation.ClassNav_Li_A_Active);
						$(this).parent().addClass(jspa.option_.menuNavigation.ClassNav_Li_Active);
						$(this).parent().parent().addClass(jspa.option_.menuNavigation.ClassNavActive);
					
					}
				});
			}else{
					console.log('menu Navigation not initialize!');
			}
			return route;
		},
		event_:function(event_option_) {
			
			$.extend(jspa.event_option_, event_option_);

			if (jspa.option_.app === null && jspa.option_.baseUrl === null){

				console.log('first initialize app & baseUrl, for object content!');
			
			} else {

				if (jspa.option_.basePath === true) {
					var url_ = jspa.option_.baseUrl + event_option_.path;
				} 
				else{
					var url_ = event_option_.path;
				}

				var app = $(jspa.option_.app);
			
				var router = this.RouterMode(event_option_.router);

				if (url_) {

					this.router(router);

					var xhr_option = {
						type:'get',
						url:url_,
						dataType:'html',
						cache:false
					};
					
					var ajax = $.ajax(xhr_option)

					ajax.pipe(results_ => {
						if (jspa.option_.preload === true) {
							$(jspa.option_.preloadObject).show();
						}
					});
					ajax.done(results_ => {
						
						if (jspa.option_.app === null || jspa.option_.app === '') {

							console.log('status:',505);
							console.log('error load content, set your initialize app!');
							app.html('');	
						
						}else{

							console.log('status:',ajax.status);
							console.log('success load content.');
							app.html(results_);
						
						}

						if (jspa.option_.preloadDelayTimes !== null || jspa.option_.preloadDelayTimes !== '' || jspa.option_.preloadDelayTimes !== undefined) {

							setTimeout(function() {
							
								if (jspa.option_.preload === true) {
									$(jspa.option_.preloadObject).hide();
								}

							}, parseInt(jspa.option_.preloadDelayTimes));

						}

					});
					ajax.fail(err => {
					
						console.log('status:',err.status);
						if (err.status === 404) {
							console.log('not found load content!');
						}

						app.html('');
					
					});

				
				}else{ console.log('your path not found!'); }

			}
		},
		router:function(routes) {

			if ($wind.location.search === routes){
			
				if (this.option_.routerwithbaseurl === true && this.option_.baseUrl !== null || this.option_.baseUrl !== ''){
			
					var history_State = history.pushState(null, null, this.option_.baseUrl + routes);
			
				}else{
			
					var history_State = history.pushState(null, null, routes);
			
				}
			
			} 
			else if ($hash === routes) {
			
				if (this.option_.routerwithbaseurl === true && this.option_.baseUrl !== null || this.option_.baseUrl !== ''){

					var history_State = history.pushState(null, null, this.option_.baseUrl + routes);
				
				}else{
					var history_State = history.pushState(null, null, routes);
				}
			
			}else{
			
				if (this.option_.routerwithbaseurl === true && this.option_.baseUrl !== null || this.option_.baseUrl !== ''){

					var history_State = history.replaceState(null, null, this.option_.baseUrl + routes);

				}else{

					var history_State = history.replaceState(null, null, routes);
				
				}
			
			}

			return history_State;

		},
		MenuEventActive:function(initEvent) {


			if (jspa.option_.menuNavigation.init_menuNav === null) {

				console.log('initialize menu not found, create object menu from init function!');
			
			}else{
				
				$(jspa.option_.menuNavigation.init_menuNav).click(function(event){
					
					event.preventDefault();

					initEvent.path = $(this).attr('href') ?? null;
					initEvent.router = $(this).attr('router') ?? null;
					initEvent.title = $(this).attr('title_page') ?? null;

					jspa.NavigationMenuActive(ReGexp(initEvent.router));
					
					jspa.event_(initEvent);

				});

			}
		},
		MenuEvent:function(event){
			this.NavigationMenuActive(ReGexp(event.router));
			this.event_(event);
		}
	}

	function ReGexp(pattern) {
		return pattern.replace(/[^\w\s]/gi, '');
	}

	function checkSegment(segment) {

		if (jspa.option_.menuNavigation.init_menuNav !== null) {
				
			var arr=[];
			var status = false;

			$(jspa.option_.menuNavigation.init_menuNav).each(function(e) {

				arr.push(ReGexp($(this).attr('router')));
				
			})

			for (var i = 0; i < arr.length; i++) {
				if (arr[i] === segment) {
					status = true;
					break;
				}
			}
			
			return status;
				
		}else{
			
			console.log('menu navigation null!');
		
		}	
	}

if (typeof define === 'function' && define.amd) {
	define( function() { return jspa; } );
} 
else if (typeof module === 'object' && module.exports) {
	module.exports = jspa;
} 
else {
	window.jspa = jspa;
}

}(window));