var MYAPP = {};

MYAPP.article = {};
MYAPP.navigation = {};
MYAPP.navigation.hidden = true;



MYAPP.navigation.createNavigation = function() {
	var navList = document.getElementById("navList"),
		allH2 = document.getElementsByTagName("h2"),
		i;

	for ( i = 0 ; i < allH2.length ; i += 1) {
		var li = document.createElement("li"),
			text = document.createTextNode(allH2[i].lastChild.innerHTML),
			a = document.createElement("a");

		a.appendChild(text);
		a.setAttribute("href", "#myId"+i);
		li.appendChild(a);
		navList.appendChild(li);
	}
};

MYAPP.article.createAnchors = function() {
	var allH2 = document.getElementsByTagName("h2"),
		i;


	for (i = 0 ; i < allH2.length ; i += 1) {
	    var inner = allH2[i].innerHTML,
	        a = document.createElement("a");

	    a.innerHTML = inner;
	    a.setAttribute('id', "myId" + i);
	    allH2[i].innerHTML = '';
	    allH2[i].appendChild(a);

	}
}


MYAPP.navigation.quad = function(progress) {
  return Math.pow(progress, 6)
}

MYAPP.navigation.moveLeft = function(elem) {
   var duration=1000; 
   var start = new Date; 
   function frame(){
      var progress = (new Date - start)/duration;
      if (progress > 1) {progress = 1;}
      elem.style.marginLeft=MYAPP.navigation.quad(progress)*(-50)+'%';
      if(progress == 1){
         clearInterval(timer);
      }
   }
   var timer=setInterval(frame,10);
}

MYAPP.navigation.moveRight = function(elem) {
   var duration=1000; 
   var start = new Date; 
   function frame(){
      var progress = (new Date - start)/duration;
      if (progress > 1) {progress = 1;}
      elem.style.marginLeft=(1-MYAPP.navigation.quad(progress))*(-50)+'%';
      if(progress == 1){
         clearInterval(timer);
      }
   }
   var timer=setInterval(frame,10);
}

MYAPP.navigation.moveNavigation = function(elem) {
	if(MYAPP.navigation.hidden) {
		MYAPP.navigation.hidden = false;
		MYAPP.navigation.moveRight(elem);
	}
	else {
	    MYAPP.navigation.hidden = true;
	    MYAPP.navigation.moveLeft(elem);
	}
}

MYAPP.navigation.moveFromBody = function(elem) {
	if(MYAPP.navigation.hidden === false) {
		MYAPP.navigation.hidden = true;
	    MYAPP.navigation.moveLeft(elem);
	}
}

MYAPP.article.createAnchors();
MYAPP.navigation.createNavigation();