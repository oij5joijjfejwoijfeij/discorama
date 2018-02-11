function postmycontent(e) {
	console.log("Trying to PUT content from " + getXPath(e.target || e.srcElement));
	var body = "";
	body += "xpath=" + getXPath(e.target || e.srcElement);
	body += "&";
	body += "payload=" + btoa(e.target.innerHTML); 
	
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xhr.readyState === 4 && xhr.status !== 200) {
			console.log("Error: failed to PUT");
		}
	}
	xmlhttp.open('PUT', document.location.href, true);
	xmlhttp.send(body);
}

function log(e) {
	
	console.log(e);
}

function prepare () {
	var all = document.getElementsByClassName("avsnitt");
	for (i in all) {
		var x = all[i];
		if (x instanceof Element) {
			x.setAttribute("contenteditable", "true");
			x.addEventListener("blur", postmycontent);
		}
	}
}


// Stjålet herfra: https://stackoverflow.com/questions/3454526/how-to-calculate-the-xpath-position-of-an-element-using-javascript
function getXPath(element) {
    var paths = []; 
    // so namespace prefix is included (if any).
    for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode) {
        var index = 0;
        var hasFollowingSiblings = false;
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                continue;

            if (sibling.nodeName == element.nodeName)
                ++index;
        }

        for (var sibling = element.nextSibling; sibling && !hasFollowingSiblings; sibling = sibling.nextSibling) {
            if (sibling.nodeName == element.nodeName)
                hasFollowingSiblings = true;
        }

        var tagName = (element.prefix ? element.prefix + ":" : "") + element.localName;
        var pathIndex = (index || hasFollowingSiblings ? "[" + (index + 1) + "]" : ""); 
        paths.splice(0, 0, tagName + pathIndex);
    }
    return paths.length ? "/" + paths.join("/") : null;
}
