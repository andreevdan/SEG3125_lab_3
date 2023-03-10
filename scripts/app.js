var products_produce = [
	{
		name: "Brocoli",
		vegetarian: true,
        organic: false,
        img: "images/broccoli.jpg",
		glutenFree: true,
		price: 1.99,
		quantity: 0
	},
	{
		name: "Cucumber",
		vegetarian: true,
        img: "images/Cucumber.jpg",
		glutenFree: true,
        organic: false,
		price: 2.35,
		quantity: 0
	},
	{
		name: "Organic Bananas",
		vegetarian: true,
		glutenFree: true,
        img: "images/organic-bananas.jpg",
        organic: true,
		price: 3.35,
		quantity: 0
	},
	{
		name: "Organic Apples",
		vegetarian: true,
        organic: true,
        img: "images/organic-apple.jpg",
		glutenFree: true,
		price: 6.50,
		quantity: 0
	},
	{
		name: "Organic Grapes",
		vegetarian: true,
		glutenFree: true,
        img: "images/organic-grapes.jpg",
        organic: true,
		price: 8.85,
		quantity: 0
	}
];



var products_meats = [
	{
		name: "Bologna",
		vegetarian: false,
        organic: false,
        img: "images/bologna.jpg",
		glutenFree: false,
		price: 5.13,
		quantity: 0
	},
    {
		name: "Bacon",
		vegetarian: false,
        organic: true,
        img: "images/bacon.png",
		glutenFree: true,
		price: 6.99,
		quantity: 0
	},
    {
		name: "Hot Dogs",
		vegetarian: false,
        organic: false,
        img: "images/hotdogs.png",
		glutenFree: true,
		price: 10.23,
		quantity: 0
	}
];

var products_bakery = [
	{
		name: "Gluten-free Bread",
		vegetarian: true,
        organic: true,
        img: "images/gluten-free-bread.png",
		glutenFree: true,
		price: 2.44,
		quantity: 0
	},
	{
		name: "Gluten-free Brownies",
		vegetarian: true,
        img: "images/gluten-free-brownies.jpg",
		glutenFree: true,
        organic: false,
		price: 9.88,
		quantity: 0
	}
];




window.onload = defaultPageLoad();

function defaultPageLoad(){
	var r4 = document.getElementById("None").checked = true;
	populateListProductChoices("None", 'displayProduct_produce', 'produce');
	populateListProductChoices("None", 'displayProduct_meats', 'meats');
	populateListProductChoices("None", 'displayProduct_bakery', 'bakery');

}

function containerFunction(id) {
	populateListProductChoices(id, 'displayProduct_produce', 'produce');
	populateListProductChoices(id, 'displayProduct_meats', 'meats');
	populateListProductChoices(id, 'displayProduct_bakery', 'bakery');
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

	for (let i=0; i<optionArray1.length; i+=1) {
		if(document.getElementById(i) != null && document.getElementById(i).value > 0){
			var quantity = document.getElementById(i).value;
			totalPrice += optionArray1[i].price * quantity;
		}
	}

	return totalPrice;
}

function populateListProductChoices(slct1, slct2,type_prod) {
    var s1 = document.getElementById(slct1);
    var s2 = document.getElementById(slct2);
	
	var cat_prod;
	var count = 0;

	if(type_prod == 'produce'){
		cat_prod = products_produce;
	}
	else if (type_prod == 'meats'){
		cat_prod = products_meats;
		count += 5;
	}
	else if (type_prod == 'bakery')
	{
		cat_prod = products_bakery;
		count += 8;
	}

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
	optionArray1 = restrictListProducts(cat_prod, restrictions);
	
    for (i = 0; i < optionArray1.length; i++) {
		var quantity = document.createElement("INPUT");
		quantity.setAttribute("type", "number");
		quantity.setAttribute("name", optionArray1[i].name);
		quantity.setAttribute("id", count);
		quantity.setAttribute("value", optionArray1[i].quantity);

		var quantityValue = parseInt(quantity.value);
		console.log("Quantity Before: "+optionArray1[i].quantity);
		console.log("The value is: "+ quantityValue);
		optionArray1[i].quantity = quantityValue;
		console.log("Quantity After: "+optionArray1[i].quantity);
		s2.appendChild(quantity);

        var label = document.createElement('label');
        var labelPrice = document.createElement('label')
        label.htmlFor = optionArray1[i].name;
        label.htmlFor = optionArray1[i].price;
		label.name = s2;
		label.appendChild(document.createTextNode(optionArray1[i].name));
        
		var priceSymbol = "$CAD ";
		var price = optionArray1[i].price.toFixed(2);
		var priceString = priceSymbol.concat(price);
		labelPrice.appendChild(document.createTextNode(priceString));
        
		s2.appendChild(label);
        s2.appendChild(document.createElement("br"));
        s2.appendChild(labelPrice);
        s2.appendChild(document.createElement("br"));
		s2.appendChild(document.createElement("br"));
		s2.appendChild(document.createElement("br"));
        var image = document.createElement('img');
        image.src = optionArray1[i].img;
		
        image.setAttribute('width', '130px');
        image.setAttribute('height', '130px');
		image.setAttribute('align','left');
		image.setAttribute('margin','100px');
        label.appendChild(image);
		label.appendChild(document.createElement("br"));
		label.appendChild(document.createElement("br"));
		label.appendChild(document.createElement("br"));
		label.appendChild(document.createElement("br"));
        label.classList.add("img-left");
    }

	selectedItems();

	
}

var optionArray1 = products_produce;

var optionArray3 = products_bakery;

function selectedItems(){
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	console.log("The length is: "+optionArray1.length);
	//console.log("Function called on the following items: "+optionArray1[0].name + " and the quantity is: "+ optionArray1[0].quantity);
	var para = document.createElement("P");
	para.innerHTML = "You selected: ";
	para.appendChild(document.createElement("br"));
	count = -1;
	for (i = 0; i < optionArray1.length; i++) {
		count++;
		if(document.getElementById(count) != null && document.getElementById(count).value > 0){
			console.log("Item name: "+ optionArray1[i].name);
			console.log(document.getElementById(count));
			console.log(document.getElementById(count).value);
			optionArray1[i].quantity = document.getElementById(count).value;
			console.log(optionArray1[i].quantity);

			para.appendChild(document.createTextNode("$"+(document.getElementById(count).value) * optionArray1[i].price + " - "));
			para.appendChild(document.createTextNode(optionArray1[i].name));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(optionArray1[i].name);
		}
		
	}

	optionArray1 = products_meats;

	for (i = 0; i < optionArray1.length; i++) {
		count++;
		if(document.getElementById(count) != null && document.getElementById(count).value > 0){
			console.log("Item name: "+ optionArray1[i].name);
			console.log(document.getElementById(count));
			console.log(document.getElementById(count).value);
			optionArray1[i].quantity = document.getElementById(count).value;
			console.log(optionArray1[i].quantity);

			para.appendChild(document.createTextNode("$"+(document.getElementById(count).value) * optionArray1[i].price + " - "));
			para.appendChild(document.createTextNode(optionArray1[i].name));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(optionArray1[i].name);
		}
	}

	optionArray1 = products_bakery;

	for (i = 0; i < optionArray1.length; i++) {
		count++;
		if(document.getElementById(count) != null && document.getElementById(count).value > 0){
			console.log("Item name: "+ optionArray1[i].name);
			console.log(document.getElementById(count));
			console.log(document.getElementById(count).value);
			optionArray1[i].quantity = document.getElementById(count).value;
			console.log(optionArray1[i].quantity);

			para.appendChild(document.createTextNode("$"+(document.getElementById(count).value) * optionArray1[i].price + " - "));
			para.appendChild(document.createTextNode(optionArray1[i].name));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(optionArray1[i].name);
		}
	}

	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts).toFixed(2)));
}

