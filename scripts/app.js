var products = [
	{
		name: "Brocoli",
		vegetarian: true,
        organic: false,
        img: "images/broccoli.jpg",
		glutenFree: true,
		price: 1.99
	},
	{
		name: "Cucumber",
		vegetarian: true,
        img: "images/Cucumber.jpg",
		glutenFree: true,
        organic: false,
		price: 2.35
	},
	{
		name: "Gluten-free Bread",
		vegetarian: true,
        organic: true,
        img: "images/gluten-free-bread.png",
		glutenFree: true,
		price: 2.44
	},
	{
		name: "Organic Bananas",
		vegetarian: true,
		glutenFree: true,
        img: "images/organic-bananas.jpg",
        organic: true,
		price: 3.35
	},
	{
		name: "Bologna",
		vegetarian: false,
        organic: false,
        img: "images/bologna.jpg",
		glutenFree: false,
		price: 5.13
	},
	{
		name: "Organic Apples",
		vegetarian: true,
        organic: true,
        img: "images/organic-apple.jpg",
		glutenFree: true,
		price: 6.50
	},
    {
		name: "Bacon",
		vegetarian: false,
        organic: true,
        img: "images/bacon.png",
		glutenFree: true,
		price: 6.99
	},
	{
		name: "Organic Grapes",
		vegetarian: true,
		glutenFree: true,
        img: "images/organic-grapes.jpg",
        organic: true,
		price: 8.85
	},
	{
		name: "Gluten-free Brownies",
		vegetarian: true,
        img: "images/gluten-free-brownies.jpg",
		glutenFree: true,
        organic: false,
		price: 9.88
	},
    {
		name: "Hot Dogs",
		vegetarian: false,
        organic: false,
        img: "images/hotdogs.png",
		glutenFree: true,
		price: 10.00
	}
];


window.onload = defaultPageLoad();

function defaultPageLoad(){
	var r4 = document.getElementById("None").checked = true;
	populateListProductChoices("None", 'displayProduct');
}

function restrictListProducts(prods, restrictions) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		var restrict = false;
		for (j=0; j<restrictions.length; j+=1){
			if ((restrictions[j].value == "Vegetarian") 	&& (prods[i].vegetarian == false)) 	restrict = true;
			if ((restrictions[j].value == "GlutenFree") 	&& (prods[i].glutenFree == false)) 	restrict = true;
			if ((restrictions[j].value == "Organic") 		&& (prods[i].organic == false)) 	restrict = true;
		}
		if(restrict == false){
			product_names.push(prods[i]);
		}
	}
	return product_names;
}

function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}

function populateListProductChoices(slct1, slct2) {
    var s1 = document.getElementById(slct1);
    var s2 = document.getElementById(slct2);

	var r1 = document.getElementById("Vegetarian");
	var r2 = document.getElementById("GlutenFree");
	var r3 = document.getElementById("Organic");
	var r4 = document.getElementById("None");
	var rArray = [r1,r2,r3];
	var restrictions = [];

	if(s1.value == "None" && r4.checked == true){
		r1.checked = false;
		r2.checked = false;
		r3.checked = false;
	}
	else{
		r4.checked = false;
	}
	if(r4.checked == false){
		for(x=0;x<3;x+=1){
			if (rArray[x].checked==true){
				restrictions.push(rArray[x]);
			}
		}
	}
    s2.innerHTML = "";
	
    var optionArray = restrictListProducts(products, restrictions);

    for (i = 0; i < optionArray.length; i++) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "product";
        checkbox.value = optionArray[i].name;
        s2.appendChild(checkbox);
        var label = document.createElement('label');
        var labelPrice = document.createElement('label')
        label.htmlFor = optionArray[i].name;
        label.htmlFor = optionArray[i].price;
		label.appendChild(document.createTextNode(optionArray[i].name));
        
		var priceSymbol = "$CAD ";
		var price = optionArray[i].price.toFixed(2);
		var priceString = priceSymbol.concat(price);
		labelPrice.appendChild(document.createTextNode(priceString));
        
		s2.appendChild(label);
        s2.appendChild(document.createElement("br"));
        s2.appendChild(labelPrice);
        s2.appendChild(document.createElement("br"));
		s2.appendChild(document.createElement("br"));
		s2.appendChild(document.createElement("br"));
        var image = document.createElement('img');
        image.src = optionArray[i].img;
		
        image.setAttribute('width', '100px');
        image.setAttribute('height', '100px');
        label.appendChild(image);
        label.classList.add("img-left");
    }
}


function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}