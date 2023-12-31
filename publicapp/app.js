const meth = math.create(null);

const intx = document.getElementById("input");
const outx = document.getElementById("output");

const clr = document.getElementById("btn-num-clear");
const meval = document.getElementById("Equal");

math.import({
  'import':     function () { throw new Error('Function import is disabled') },
  'createUnit': function () { throw new Error('Function createUnit is disabled') },
  'evaluate':   function () { throw new Error('Function evaluate is disabled') },
  'simplify':   function () { throw new Error('Function simplify is disabled') },
  'derivative': function () { throw new Error('Function derivative is disabled') }
}, { override: true });


{
	let nbtnsnode = document.querySelectorAll("[id^='btn-num-']");
	let nbtns = Array.from(nbtnsnode);
	nbtns = nbtns.filter(function(nbtn){
		let identity = nbtn.id;
		identity = identity.replace("btn-num-", "");
		return /^\d+$/.test(identity);
	});
	
	for(var i = 0; i < nbtns.length; i++){
		let nbtn = nbtns[i];
		let identity = nbtn.id;
		identity = identity.replace("btn-num-", "");
		nbtn.onclick = function(){
			intx.value = `${intx.value}${identity}`;
		}
	}
}


{
	let funs = [
	"+", "-", "*", 
	"/", "(", ")", 
	"!", "^", "e",
	"sin(", "cos(", "tan(",
	"sqrt(", "cbrt(", "abs("
	];
	let fbtnsnode = document.querySelectorAll("[id^='btn-fun-']");
	let fbtns = Array.from(fbtnsnode);
	fbtns = fbtns.filter(function(fbtn){
		let identity = fbtn.id;
		identity = identity.replace("btn-fun-", "");
		return funs.includes(identity);
	});
	
	for(var i = 0; i < fbtns.length; i++){
		let fbtn = fbtns[i];
		let identity = fbtn.id;
		identity = identity.replace("btn-fun-", "");
		fbtn.onclick = function(){
			intx.value = `${intx.value}${identity}`;
		}
	}
}



clr.onclick = function() { outx.value = ""; intx.value = ""; }

const mev = function(){
	output.disabled = false;
	try{
		let mevalres = meth.evaluate(intx.value);
		output.value = ((Array.isArray(mevalres) || typeof mevalres === 'object') ? mevalres.entries[0] : mevalres);
	}
	catch(e){
		var emgs = `Math Eval Error: ${e}`;
		console.error(emgs);
		window.alert(emgs);
	}
	output.disabled = true;
}

meval.onclick = mev;

intx.onkeypress = function(evt){
	if(evt.keyCode == 13){
		evt.preventDefault();
		mev();
	}
}

function resizeWin() {
	const allBtn = document.getElementsByTagName("button");
    if (window.innerHeight > window.innerWidth) {
        console.log("The page is in portrait orientation.");
		for(const btn of allBtn){
			btn.style.width = "";
		}
    } else {
        console.log("The page is in landscape orientation.");
		for(const btn of allBtn){
			btn.style.width = "4vw";
		}
    }
}
resizeWin();
window.addEventListener('resize', resizeWin);