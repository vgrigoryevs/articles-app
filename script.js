var MYAPP = {};

MYAPP.article = {};
MYAPP.navigation = {};
MYAPP.navigation.hidden = true;
MYAPP.navigation.able =true;


MYAPP.article.includeHtmlDoc = function(article, source) {  //загружаем статью через AJAX (куда, источник)
	var xmlhttp;
	
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp = new XMLHttpRequest();
	}
	else {// code for IE6, IE5
    	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	xmlhttp.onreadystatechange = function() {
  		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	    document.getElementById(article).innerHTML = xmlhttp.responseText;

    		MYAPP.article.createAnchors();
			MYAPP.navigation.createNavigation();
    	}
  	}
	
	xmlhttp.open("GET",source, true);
	xmlhttp.send();
}

MYAPP.article.includeJsonDoc = function(target, source) {  //загружаем статью через AJAX (куда, источник)
	var xmlhttp;
	
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp = new XMLHttpRequest();
	}
	else {// code for IE6, IE5
    	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	xmlhttp.onreadystatechange = function() {
  		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var obj = JSON.parse(xmlhttp.responseText),
				max = obj.article.length,
				article = document.getElementById(target),
				backLink = document.getElementById("goBack"),
				h1 = document.createElement("h1"),
				i;
				
				h1.innerHTML = obj.article[0].h1;
				article.insertBefore(h1, backLink);

				for (i = 1; i < max; i++) {
					var h2 = document.createElement("h2"),
						p = document.createElement("p");

					h2.innerHTML = obj.article[i].h2;
					p.innerHTML = obj.article[i].p;
					article.insertBefore(h2, backLink);
					article.insertBefore(p, backLink);
				}

    		MYAPP.article.createAnchors();
			MYAPP.navigation.createNavigation();
    	}
  	}
	
	xmlhttp.open("GET",source, true);
	xmlhttp.send();
}

MYAPP.navigation.createNavigation = function() {
	var navList = document.getElementById("navList"),
		allH2 = document.getElementsByTagName("h2"),
		navButton = document.getElementById('navButton'),
		i;



		navList.onselectstart = navList.onmousedown= function() {
			return false;
		};

		navButton.onselectstart = navButton.onmousedown= function() {
			return false;
		};
		

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
   MYAPP.navigation.able =false;
   var duration=1000; 
   var start = new Date; 
   function frame(){
      var progress = (new Date - start)/duration;
      if (progress > 1) {progress = 1;}
      elem.style.marginLeft=MYAPP.navigation.quad(progress)*(-50)+'%';
      if(progress == 1){
      	 MYAPP.navigation.able =true;
         clearInterval(timer);
      }
   }
   var timer=setInterval(frame,10);
}

MYAPP.navigation.moveRight = function(elem) {
   MYAPP.navigation.able =false;
   var duration=1000; 
   var start = new Date; 
   function frame(){
      var progress = (new Date - start)/duration;
      if (progress > 1) {progress = 1;}
      elem.style.marginLeft=(1-MYAPP.navigation.quad(progress))*(-50)+'%';
      if(progress == 1){
      	 MYAPP.navigation.able = true;
         clearInterval(timer);
      }
   }
   var timer=setInterval(frame,10);
}

MYAPP.navigation.moveNavigation = function(elem) {
	if(MYAPP.navigation.hidden && MYAPP.navigation.able) {
		MYAPP.navigation.hidden = false;
		MYAPP.navigation.moveRight(elem);
	}
	else if(MYAPP.navigation.hidden === false && MYAPP.navigation.able) {
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

MYAPP.navigation.moveNavigationWithCss = function(elem, source) {
	elem.className = "transition";

	if(MYAPP.navigation.hidden && source.tagName != "ARTICLE") {
		MYAPP.navigation.hidden = false;
		elem.style.setProperty("margin-left", "0%");
		elem.style.backgroundColor='azure';
		elem.style.boxShadow = "0px 3px 5px #444444";
		
	}
	else {
	    MYAPP.navigation.hidden = true;
	    elem.style.setProperty("margin-left", "-50%");
	    elem.style.backgroundColor='floralwhite';
	    elem.style.boxShadow = "none";
	}
}