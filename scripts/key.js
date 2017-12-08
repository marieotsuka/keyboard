var synth = new Tone.Synth(
	{	oscillator  : {
			type  : 'triangle'
		},
		envelope  : {
		attack  : 0.2,
		decay  : 1,
		sustain  : 1,
		release  : 0.5
		}
	}).toMaster();

$(document).ready(function(){
	var pressed=false;
	var register = ['1','2','3','4','5'];
	var notes = ['C','D','E','F','G','A','B'];
	var shift = "";
	var reg = 4;
	var allowed = true;
	var animate = true;
	var timer = 0;
	var scale;
	var noteCheck;

	$(document).keydown(function(e) {

		var key = String.fromCharCode(e.keyCode).toUpperCase();
		console.log(e.keyCode);
		console.log(key);

		var registerCheck = $.inArray(key,register);
		console.log(registerCheck);
		noteCheck = $.inArray(key,notes);
	
		if (e.keyCode ===32){
			$('#input').append('<div class="note">&nbsp;</div>');

		}
		else if (e.keyCode ===8){
			$('#input .note:last-child').remove()
		}
		else if (registerCheck>=0){ //set register
			reg = parseInt(key);
			console.log(reg);
			$('#register').html('<div class="reg">'+key+'</div>');
		}
		else if (e.keyCode ===16){ //set chromatics
			shift = "#";
		}
		else if (!pressed && noteCheck>=0){ //play note!
			$('#error').fadeOut();
			console.log('pressed');
			synth.triggerAttack(key + shift + reg);
			
			pressed = true;
			$('<div class="note reg'+reg+'" id="pressed">'+key+shift+'<span class="sup">'+reg+'</span></div>').appendTo('#input');
			scale = setInterval(noteLength, 50);
			
		}else if (!pressed){
			displayError();
		}
	}).keyup(function(e) { 
		clearInterval(scale);
		timer = 0;
		console.log('stop');
		if(pressed = true){ //end note!
			synth.triggerRelease();
			$('.note').stop(true).removeAttr('id');
			console.log('stop');
			shift = "";
			pressed = false;
		}
	});

	function noteLength(){
		timer++;
		console.log(timer/8);
		$('#pressed').css('transform','scale(' + timer/8 +')');
		var left = $(document).outerWidth() - $(window).width()+500;
		$(window).scrollLeft(left);
	}

	function displayError(){
		$('#error').fadeIn();
	}


});
