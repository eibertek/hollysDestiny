/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var input = { 
        key_a:65,
        key_b:66,
        key_c:67,
        key_d:68,
        key_e:69,
        key_f:70,
        key_g:71,
        key_h:72,
        key_i:73,
        key_j:74,        
        key_k:75,        
        key_l:76,        
        key_m:77,        
        key_n:78,        
        key_o:79,        
        key_p:80,        
        key_q:81,        
        key_r:82,        
        key_s:83,        
        key_t:84,        
        key_u:85,        
        key_v:86,        
        key_w:87,        
        key_x:88,        
        key_y:89,        
        key_z:90,        
        key_left:37,        
        key_up:38,        
        key_right:39,        
        key_down:40,        
        key_space:32,        
        key_enter:13,
        key_backspace:8,
        key_F3: 114,
        key_F4: 115,
        key_F5: 116,
        prevent_default:false,
        key_code:[],
        key_press:[],
        mouse: {
            x: 0,
            y: 0,
            clicked: false,
            down: false
        },
        move:{left:false, up:false, right:false, down:false, attack:false},
        actions:{btnStart:false},
		// Areas (objects) on the screen that can be touched
		touchableAreas: [],
		touchableAreasCount: 0,
		// Multi-touch
		touches: [],
		// Canvas offset on page (for coverting touch coordinates)
		offsetX: 0,
		offsetY: 0,
		mobile: false,
		movingKeyMappingDown:function(){
		    if (input.key_code[38]===true || input.key_code[87]===true) this.move.up = true;
		    if (input.key_code[input.key_down]===true || input.key_code[input.key_s]===true) this.move.down = true;                    
		    if (input.key_code[39]===true || input.key_code[68]===true) this.move.right = true;
                    if (input.key_code[37]===true || input.key_code[65]===true) this.move.left = true;
                    if (input.key_code[input.key_c]===true ) this.move.attack = true;
		},
		movingKeyMappingUp:function(){
		    if (input.key_code[38]===false || input.key_code[87]===false) this.move.up = false;
		    if (input.key_code[input.key_down]===false || input.key_code[input.key_s]===false) this.move.down = false;                                        
		    if (input.key_code[39]===false || input.key_code[68]===false) this.move.right = false;
                    if (input.key_code[37]===false || input.key_code[65]===false) this.move.left = false;
                    if (input.key_code[input.key_c]===false ) this.move.attack = false;
		},
		movingTouchMappingDown:function(){
	            var topy=game.canvas.container.height;
                    var topx=game.canvas.container.width;
                    if (this.touchSection(0,150,topy-90, topy-45)) this.move.up = true;
                    if (this.touchSection(0,75,topy-40, topy)) this.move.left = true;
                    if (this.touchSection(76,150,topy-39, topy)) this.move.right = true;
                    if (this.touchSection(topx-100,topx,topy-90, topy)) this.move.attack = true;
    	},
		movingTouchMappingUp:function(){
            var topy=game.canvas.container.height;
	        var topx=game.canvas.container.width;
            if (!this.touchSection(0,90,topy-60, topy-40)) this.move.up = false;
		    if (!this.touchSection(0,50,topy-39, topy)) this.move.left = false;
            if (!this.touchSection(60,90,topy-39, topy)) this.move.right = false;
            if (!this.touchSection(topx-100,topx,topy-60, topy)) this.move.attack = false;
         },
        actionTouchMappingDown: function(){
            var btnStart = {x1:0, y1:0, x2:game.canvas.container.width, y2:game.canvas.container.height};
            if (this.touchSection(btnStart.x1,btnStart.x2,btnStart.y1, btnStart.y2)) this.actions.btnStart = true;
        },
        actionTouchMappingUp: function(){
            var btnStart = {x1:0, y1:0, x2:game.canvas.container.width, y2:game.canvas.container.height};
           if (!this.touchSection(btnStart.x1,btnStart.x2,btnStart.y1, btnStart.y2)) this.actions.btnStart = false;
        },
        cinematicsTouchMappingDown: function(){
           var topy=game.canvas.container.height;
           var topx=game.canvas.container.width;
           if (this.touchSection(0,180,topy-100, topy-50)) this.move.up = true;
           if (this.touchSection(0,180,topy-49, topy)){
                this.move.down = true;
           }
           if (this.touchSection(topx-100,topx,topy-60, topy)) this.move.attack = true;
        },
        cinematicsTouchMappingUp: function(){
           var topy=game.canvas.container.height;
	       var topx=game.canvas.container.width;
           if (!this.touchSection(0,180,topy-100, topy-50)) this.move.up = false;
           if (!this.touchSection(0,180,topy-49, topy)){
                       this.move.down = false;
           }
           if (!this.touchSection(topx-100,topx,topy-60, topy)) this.move.attack = false;
        },
        onKeyDown: function(event, preventDefault){
            this.prevent_default = preventDefault ? true : false;
            this.key_code[event.keyCode]=true;
            this.movingKeyMappingDown();
            if(this.prevent_default && this.key_code[114] )   event.preventDefault();
            return true;
        },
        onKeyUp: function(event){
            this.key_code[event.keyCode] = false;
            this.movingKeyMappingUp();
            return true;
        }, 
        mouseMove: function(event, preventDefault){
            this.mouse.x = event.offsetX;
            this.mouse.y = event.offsetY;
            this.mouse.clicked = (event.which == 1 && !this.mouse.down);
            this.mouse.down = ( event.which == 1 );
        },
        mouseDown: function(event, preventDefault){
            this.mouse.clicked = !this.mouse.down;
            this.mouse.down = true;
        },
        mouseUp: function(event, preventDefault){
            this.mouse.clicked = false;
            this.mouse.down = false;
        },
        touchSection: function(x1,x2,y1,y2){
            for(var c=0; c < this.touches.length; c++){
                var actualx = this.touches[c].clientX;
                var actualy = this.touches[c].clientY;
                if( actualx >=x1 && actualx <=x2
                    && actualy >=y1 && actualy <=y2 ) {
                        return true;
                    }
            }
        },
        clearKeys: function(){
            this.key_code=[];
            this.key_press=[];
            this.touches=[];
            this.cinematicsTouchMappingUp();
            this.movingTouchMappingUp();
        },
        isTouching: function(x, y, shapeA) {
            // get the vectors to check against
         var vX = (shapeA.position.x + (shapeA.width / 2)) - x,
             vY = (shapeA.position.y + (shapeA.height / 2)) - y,
                 // add the half widths and half heights of the objects
                 hWidths = (shapeA.width / 2),
                 hHeights = (shapeA.height / 2),
                 colDir = null;
            // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
            if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                // figures out on which side we are colliding (top, bottom, left, or right)
                var oX = hWidths - Math.abs(vX),
                    oY = hHeights - Math.abs(vY);
                if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "t";
                    } else {
                        colDir = "b";
                    }
                } else {
                    if (vX > 0) {
                        colDir = "l";
                    } else {
                        colDir = "r";
                    }
                }
            }
            return colDir;
        },
		setTouchEvents: function() {
			var _this = this;

			var setTouches = function(e){
				// Microsoft always has to have their own stuff...
				if( window.navigator.msPointerEnabled &&
					!! e.clientX &&
					e.pointerType === e.MSPOINTER_TYPE_TOUCH
					){
					_this.touches[ e.pointerId ] = {
						clientX: e.clientX,
						clientY: e.clientY
					};
				} else _this.touches = e.touches || [];
                if(game.isMobile()){
                    if(game.titleScreen===true){
                        _this.actionTouchMappingDown();
                    }else if(game.cinematics===true){
                        _this.cinematicsTouchMappingDown();
                    }else{
                        _this.movingTouchMappingDown();
                    }
                }
            };

			var touchStart = function( e ) {
				if( _this.paused ) _this.paused = false;
				e.preventDefault();
				setTouches(e);
			};
			var touchEnd = function( e ) {
				e.preventDefault();
                 _this.move.attack = false;
				if( window.navigator.msPointerEnabled &&
					e.pointerType === e.MSPOINTER_TYPE_TOUCH ) {
					delete _this.touches[ e.pointerId ];
				} else _this.touches = e.touches || [];
                if(game.isMobile()){
                    if(game.titleScreen===true){
                        _this.actionTouchMappingUp();
                    }else if(game.cinematics===true){
                        _this.cinematicsTouchMappingUp();
                    }else{
                        _this.movingTouchMappingUp();
                    }
                }
			};

			var touchMove = function( e ) {
				e.preventDefault();
				setTouches(e);
			};

			document.body.addEventListener('touchstart', touchStart, false);
			document.body.addEventListener('touchend', touchEnd);
			document.body.addEventListener('touchmove', touchMove);

			if( window.navigator.msPointerEnabled ) {
				document.body.addEventListener('MSPointerDown', touchStart);
				document.body.addEventListener('MSPointerUp', touchEnd);
				document.body.addEventListener('MSPointerMove', touchMove);
			}
		},
        toKeyString: function(keycode){
            switch(keycode){
                case this.key_left:
                        return 'LEFT';
                case this.key_up:
                        return 'UP';
                case this.key_down:
                        return 'DOWN';
                case this.key_right:
                        return 'RIGHT';
                case this.key_space:
                        return 'SPACE';
                case this.key_enter:
                        return 'ENTER';
                case this.key_backspace:
                        return 'BACKSPACE';                        
                default:   
                        return String.fromCharCode(this.key_code);
            }
        }
}



