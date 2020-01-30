
// ------------------------------- Hamburger Menu -----------------------------------
var hamburger = document.getElementById('hamburger');
var menu = document.getElementById('myMenu');
var menuClose = document.getElementById('menuClose');

hamburger.addEventListener('click', function() {
	menu.style.left = "0";
});

menuClose.addEventListener('click', function() {
	menu.style.left = "-250px";
});

// ------------------------------- Drop Down -----------------------------------
var list= document.getElementsByClassName("drop-down");

/*An array containing all the country names in the world:*/
var country=["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina",
"Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
"Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands",
"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands",
"Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire",
"Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
"Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji",
"Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar",
"Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras",
"Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica",
"Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
"Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi",
"Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
"Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands",
"Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman",
"Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino",
"Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia",
"Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka",
"St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan",
"Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan",
"Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America",
"Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]

for(var i=0;i<country.length;i++){
	var option=document.createElement("option");
	option.setAttribute("value",country[i]);
	option.appendChild(document.createTextNode(country[i]));
	list[0].appendChild(option);
}

// ------------------------------- Suggestion List for Search -----------------------------------
function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
  	var a, b, i, val = this.value;
	  /*close any already open lists of autocompleted values*/
	  closeAllLists();
	  if (!val) { return false;}
	  currentFocus = -1;
	  /*create a DIV element that will contain the items (values):*/
	  a = document.createElement("DIV");
	  a.setAttribute("id", this.id + "autocomplete-list");
	  a.setAttribute("class", "autocomplete-items");
	  /*append the DIV element as a child of the autocomplete container:*/
	  this.parentNode.appendChild(a);
	 
	  for (i = 0; i < arr.length; i++) {
		
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			  /*create a DIV element for each matching element:*/
			  b = document.createElement("DIV");
			  b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			  b.innerHTML += arr[i].substr(val.length);
			  b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			  /*execute a function when someone clicks on the item value (DIV element):*/
			  b.addEventListener("click", function(e) {
				  /*insert the value for the autocomplete text field:*/
				  inp.value = this.getElementsByTagName("input")[0].value;
				  /*close the list of autocompleted values,
				  (or any other open lists of autocompleted values:*/
				  closeAllLists();
			  });
			  a.appendChild(b);
			}
	  }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
	  var x = document.getElementById(this.id + "autocomplete-list");
	  if (x) x = x.getElementsByTagName("div");
	  if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
	  } else if (e.keyCode == 38) { 
			currentFocus--;
			addActive(x);
	  } else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
			  if (x) x[currentFocus].click();
			}
	  }
  });

  function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) {
			return false;
		}
		removeActive(x);
		if (currentFocus >= x.length) {
			currentFocus = 0;
		}
		if (currentFocus < 0) {
			currentFocus = (x.length - 1);
		}
		x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
		  x[i].classList.remove("autocomplete-active");
		}
  }

  function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
		  if (elmnt != x[i] && elmnt != inp) {
			x[i].parentNode.removeChild(x[i]);
		  }
		}
  }

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
	  closeAllLists(e.target);
	});
}

/*An array containing page data */
var element = document.getElementsByTagName("*");
var searchlist=[];
for(var k=0; k<element.length ; k++){
    var current=element[k];
    if(current.children.length === 0 && current.textContent.replace(/ |\n/g,'') !== '') {
    	searchlist.push(current.textContent);
    }  
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), searchlist);

// ------------------------------- Search Click -----------------------------------
var searchClick = document.getElementById('searchClick');
var searchParent = document.getElementById('searchParent');
var searchClose = document.getElementById('searchClose');

searchClick.addEventListener('click', function() {
	searchParent.style.display = "block";
});

searchClose.addEventListener('click', function() {
	searchParent.style.display = "none";
});

// ------------------------------- Back to Top -----------------------------------
// When the user clicks on the button, scroll to the top of the document
var backToTop = document.getElementById('top');
backToTop.addEventListener('click',function(){
  	window.scrollTo({
	   top: 0,
	   behavior: "smooth"
	});
});

// When the user scrolls down 250px from the top of the document, show the button
window.onscroll = function() {
	scrollFunction()
};

function scrollFunction() {
  	if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        document.getElementById('top').style.display = "block";
    } else {
        document.getElementById('top').style.display = "none";
    }
}

// ------------------------------- Email Validation -----------------------------------
var errorMessage='';
//if user enter invalid data
function emailValidation(emailInput){
  var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(emailInput) ? '' :'Please provide a valid email address';
}

// when user click on sign up
$('#submitData').click( function(e){
	e.preventDefault();
	var emailValue = $('#email').val();

	if(emailValue=='') {
		errorMessage='Please enter email address'
		$('#emailError').text(errorMessage)
	} else {
		if(emailValidation(emailValue)!=''){
			emailValidation(emailValue);
			$('#emailError').text(emailValidation(emailValue))
		} else {
			localStorage.setItem('Email', emailValue);
			$('#emailError').text('');
		}
	}
});

// ------------------------------- Modal for Our core business -----------------------------------

$(document).ready(function(){
	let modalItem = document.getElementsByClassName('mod-img');
	let modalImage = document.getElementsByClassName('modal-img')[0];
	$('#business .business-list li .mod-img').click(function(){
		modalImage.setAttribute('src', this.getAttribute('src'));
		$("#modal-box").fadeIn(1000);
			var scrollPosition = [
			self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
			self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
		];
		var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
		html.data('scroll-position', scrollPosition);
		html.data('previous-overflow', html.css('overflow'));
		html.css('overflow', 'hidden');
		window.scrollTo(scrollPosition[0], scrollPosition[1]);
	})
	$('#modal-box .modal-close').click(function(){
		$("#modal-box").fadeOut(1000);
		var html = jQuery('html');
		var scrollPosition = html.data('scroll-position');
		html.css('overflow', html.data('previous-overflow'));
		window.scrollTo(scrollPosition[0], scrollPosition[1])
	})
})