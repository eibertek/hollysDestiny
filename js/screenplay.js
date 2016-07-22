/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var screenPlay = {
	name:'',
	title:'',
	levels:{},
	init: function(){

	},
	addLevel: function(){},
	removeLevel: function(){},
};

var level = {
	title:'',
	subtitle:'',
	init: function(){},
	addEvent: function(){},
	removeEvent:function(){}
}

var levelEvent = {
	name: '',
	id: '',
	status:'',
	setStatus: function(status){},
	getStatus: function(){},
	spawnCreature: function(){},
	removeCreature: function(){},
	addAction: function(title, subtitle, consoleInfo, ActivatePoint){
		this.actions.push(title, subtitle, consoleInfo, ActivatePoint);
	},
	actions:[]
}

var action = {
	id: Math.random().toString(36).substr(2),
	title:'',
	subtitle:'',
	consoleInfo:'',
	ActivatePoint:0
}

