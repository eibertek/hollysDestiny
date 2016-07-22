/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvasClass = function(canvasId){
    this.container = document.getElementById('canvas_ppg');
    this.ctx = null;
    this.vector = function(x,y){
        this.x=0;
        this.y=0;
        this.__construct = function(x,y){
            this.x = x;
            this.y = y;
        }
        this.__construct(x,y);
        return this;
    };
    this.init = function(canvasId){
        this.container = document.getElementById(canvasId),
        this.ctx = this.container.getContext('2d');
        return this;
    };

    this.drawLine = function(origin, destiny, options){
        this.ctx.beginPath();
        if(origin instanceof this.vector){
            this.ctx.moveTo(origin.x,origin.y);
            this.ctx.lineTo(destiny.x,destiny.y);
            if( typeof(options) != "undefined" ){
                this.ctx.strokeStyle=options.color;
            }else{
                this.ctx.strokeStyle="#000";
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }else{
            throw new Error('los objetos deben ser vectores');
        };        
    };    
    this.drawRect = function(origin, height, width, options){
        if(origin instanceof this.vector){
            this.ctx.beginPath();
    //        this.ctx.globalCompositeOperation='destination-over';
            this.ctx.rect(origin.x,origin.y,width,height);
            this.ctx.strokeStyle=options.color;
            this.ctx.stroke();
            this.ctx.font = '10px Arial';
            this.ctx.strokeText(options.name,origin.x,origin.y+height+10);
            this.ctx.closePath();
        }
    };
    this.fillRect = function(origin, height, width, options){
        if(origin instanceof this.vector){
            this.ctx.fillStyle=options.color;
            this.ctx.fillRect(origin.x,origin.y,width,height);
        }
    };
    this.drawImage = function(img, posx, posy, width, height, options){
        if(img===null || img=="") return false;
        if( typeof(options.repeatX) != "undefined" ){
            totalwidth = width;
            this.ctx.drawImage(img, posx, posy, img.width, height);
            drawedWidth=img.width;
            while(totalwidth>0){
                this.ctx.drawImage(img, drawedWidth-6 + posx, posy, img.width, height);
                totalwidth-=img.width;
                drawedWidth+=img.width;
            }
         }else{
            this.ctx.drawImage(img, posx, posy, width, height);
         }
    };
    this.drawSpriteImage = function(img, sx, sy, sw, sh, x, y, w, h){
        if(img===null || img=="") return false;
        this.ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    };      
    this.drawChar = function(origin, imgOptions, options){
        if(origin instanceof this.vector){
            this.ctx.drawImage(imgOptions.img, 
                               origin.x, 
                               origin.y, 
                               imgOptions.srcwdth, 
                               imgOptions.srchght,
                               0,
                               0,
                               imgOptions.srcwdth, 
                               imgOptions.srchght                               
                               );
            this.ctx.beginPath();
            this.ctx.strokeStyle=options.color;
            this.ctx.stroke();
            this.ctx.font = '10px Arial';
            this.ctx.strokeText(options.name,origin.x,origin.y+imgOptions.srchght+10);
            this.ctx.closePath();
        }
    };
    this.drawSprite= function(imgOptions, options){
        if(origin instanceof this.vector){
            this.ctx.drawImage(imgOptions.img, 
                               imgOptions.srcx, 
                               imgOptions.srcy, 
                               imgOptions.srcwdth, 
                               imgOptions.srchght,
                               imgOptions.destX, 
                               imgOptions.destY,
                               imgOptions.destwdth, 
                               imgOptions.desthght                               
                               );
            if( imgOptions.text ){                
                this.ctx.beginPath();
                this.ctx.strokeStyle=options.color;
                this.ctx.stroke();
                this.ctx.font = '10px Arial';
                this.ctx.strokeText(options.name,origin.x,origin.y+imgOptions.srchght+10);
                this.ctx.closePath();
            }
        }
    };
    this.drawText =  function(text, options){
            this.ctx.beginPath();
            this.ctx.strokeStyle='#000';
           if(typeof(options.font)!= "undefined"){
                this.ctx.font = options.font;
            }else{
                this.ctx.font = '50px Arial';                
            }   
            positionX = this.container.width/2-50;
            positionY = this.container.height/2;
            if(typeof(options.color)!= "undefined"){
                this.ctx.fillStyle = options.color;
            }
            if(typeof(options.x)!= "undefined"){
                positionX = options.x;
            }
            if(typeof(options.y)!= "undefined"){
                positionY = options.y;
            }            
            this.ctx.fillText(text,positionX, positionY);
            this.ctx.closePath();
    };
    this.setImgOptions = function(img, originX, originY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight, textEnabled){
        return {
            img: img, 
            srcx: originX, 
            srcy: originY, 
            srcwdth: sourceWidth, 
            srchght: sourceHeight,
            destX: destinationX, 
            destY: destinationY,
            destwdth: destinationWidth, 
            desthght: destinationHeight,
            text: textEnabled
        }
        
    };
    return this.init(canvasId);
}

