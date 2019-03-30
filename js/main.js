/*
		O usuário poderá adicionar products a uma lista com as seguintes categorias:
		Name, Amount, Value

		Por fim o app irá calcular o Value unitário de cada produto * Amount + outros products * Amount. 
*/

// Arrey com objeto de products
const products = [
	{'name': 'rice', 'amount': '1', 'value': '5.40'},
	{'name': 'bEer', 'amount': '12', 'value': '3.99'},
	{'name': 'meat', 'amount': '1', 'value': '15.00'}
];
 
const $tableProducts = document.querySelector('#table-list');
const $inputName = document.querySelector('#name');
const $inputAmount = document.querySelector('#amount');
const $inputValue = document.querySelector('#value');
const $btnsUpdate = document.querySelector('#btns-update');
const $btnAdd = document.querySelector('#btn-add');
const $idUpdate = document.querySelector('#id-update');

// Values * Amount
const getTotal = (products) => {
	let total = 0;

	for(var i in products) {
		total += products[i].value * products[i].amount;
	}
	return total;
}

// Create linhas da tabela com as propriedades do produto
const createList = (products) => {
	let list = 
		`<thead class="thead-dark">
			<tr>
				<th scope="col">#</th>
				<th scope="col">Name</th>
				<th scope="col">Amount</th>
				<th scope="col">Value</th>
				<th scope="col">Ação</th>
			</tr>
		</thead>
			<tbody>`;
	
	for(var i in products) {

		list += `
			<tr>
				<th scope="row">${ (i*1+1) }</th>
				<td>${ formatUppercase(products[i].name) }</td>
				<td>${ products[i].amount }</td>
				<td>${ formatFloat(products[i].value) }</td>
				<td>
					<button onclick="setUpdate(${ i });" class="btn btn-dark">Edit</button>
					<button onclick="deleteData(${ i });" class="btn btn-dark">Delete</button>
				</td>
			</tr>`;
	}

	list += `</tbody>`;

	insertList(list);
	return list;
}


// Adiciona lista na tabela
const insertList = (list) => {
	$tableProducts.innerHTML = list;

	return;
}


const formatUppercase = (value) => {
	let str = value.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1) + '';

	return str;
}


const formatFloat = (value) => {
	let float = parseFloat(value).toFixed(2) + '';
	float.replace('.', ',');
	float = `R$ ${ float }`;

	return float;
}


const addData = () => {
	products.unshift({
		'name': $inputName.value,
		'amount': $inputAmount.value,
		'value': $inputValue.value
	});

	createList(products);
}


const setUpdate = (id) => {
	let list = products[id];

	$inputName.value = list.name;
	$inputAmount.value = list.amount;
	$inputValue.value = list.value;

	$btnsUpdate.style.display = "inline-block";
	$btnAdd.style.display = "none";
	$idUpdate.value = id;
}


const resetForm = () => {
	$inputName.value = "";
	$inputAmount.value = "";
	$inputValue.value = "";

	$btnsUpdate.style.display = "none";
	$btnAdd.style.display = "inline-block";
	$idUpdate.value = "";
}


const updateData = () => {
	let id = $idUpdate.value;

	products[id] = {
		'name': $inputName.value,
		'amount': $inputAmount.value,
		'value': $inputValue.value
	}

	$btnsUpdate.style.display = "none";
	$btnAdd.style.display = "inline-block";
	$idUpdate.value = "";

	createList(products);
	resetForm();
}


const deleteData = (id) => {

	if ( confirm("Delete this item?") ) {
		if ( id === products.length - 1 ) {
			products.pop();
		} else if ( id === 0 ) {
			products.shift();
	} else {
		products.splice(id, 1);
	}
	
		createList(products);
	}
}

createList(products);


