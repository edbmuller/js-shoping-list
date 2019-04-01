/*
		O usuário poderá adicionar products a uma lista com as seguintes categorias:
		Name, Amount, Value

		Por fim o app irá calcular o Value unitário de cada produto * Amount + outros products * Amount. 
*/

// Array com objeto de products
let products = [
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
const $alert = document.querySelector('.alert');
const $total = document.querySelector('#total-value');


// Values * Amount
const getTotal = products => {
	var total = 0;

	for(var i in products) {
		total += products[i].value * products[i].amount;
	}

	$total.innerHTML = formatFloat(total);
}

// Create linhas da tabela com as propriedades do produto
const createList = products => {
	let table = 
		`<thead class="thead-dark">
			<tr>
				<th scope="col" style="padding-right: 0;">#</th>
				<th scope="col">Name</th>
				<th scope="col">Amount</th>
				<th scope="col">Value</th>
				<th scope="col">Ação</th>
			</tr>
		</thead>
			<tbody>`;
	
	for(var i in products) {

		table += `
			<tr>
				<th scope="row" class="pr-0">${ (i*1+1) }</th>
				<td>${ formatUppercase(products[i].name) }</td>
				<td class="text-center">${ formatInt(products[i].amount) }</td>
				<td>${ formatFloat(products[i].value) }</td>
				<td>
					<button onclick="setUpdate(${ i });" class="btn btn-dark px-2 py-1">
						<img src="img/edit.png" width="18" height="18" alt="Edit Line" title="Edit Line">
					</button>
					<button onclick="deleteData(${ i });" class="btn btn-dark px-2 py-1">
						<img src="img/delete_outline.png" width="18" height="18" alt="Delete Line" title="Delete Line">
					</button>
				</td>
			</tr>`;
	}

	table += `</tbody>`;

	getTotal(products);
	$alert.style.display = 'none';
	saveListStorage(products);
	insertList(table);
	return;
}


// Adiciona lista na tabela
const insertList = list => {
	$tableProducts.innerHTML = list;

	return;
}


const formatUppercase = value => {
	let str = value.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1) + '';

	return str;
}


const formatInt = value => parseInt(value);


const formatFloat = value => {
	let float = parseFloat(value).toFixed(2) + '';
	float.replace('.', ',');
	float = `R$ ${ float }`;

	return float;
}


const addData = () => {
	
	if ( !validation() ) {
		return;
	}

	products.unshift({
		'name': $inputName.value,
		'amount': $inputAmount.value,
		'value': $inputValue.value
	});

	validation();
	resetForm();

	createList(products);
}


const setUpdate = id => {
	let list = products[id];

	$inputName.value = list.name;
	$inputAmount.value = list.amount;
	$inputValue.value = list.value;

	$btnsUpdate.style.display = "inline-block";
	$btnAdd.style.display = "none";
	$idUpdate.value = id;
}


const resetForm = () => {
	$inputName.value = '';
	$inputAmount.value = '';
	$inputValue.value = '';

	$btnsUpdate.style.display = "none";
	$btnAdd.style.display = "inline-block";
	$idUpdate.value = '';
}


const updateData = () => {
	if ( !validation() ) {
		return;
	}

	let id = $idUpdate.value;

	products[id] = {
		'name': $inputName.value,
		'amount': $inputAmount.value,
		'value': $inputValue.value
	}

	$btnsUpdate.style.display = "none";
	$btnAdd.style.display = "inline-block";
	$idUpdate.value = '';

	createList(products);
	resetForm();
}


const deleteData = id => {

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

const validation = () => {

	let name = $inputName.value;
	let amount = $inputAmount.value;
	let value = $inputValue.value;
	let errors = '';

	if ( name === '' ) {
		errors += '<p>Fill out description</p>';
	} 
	if ( amount === '' || amount != parseInt(amount) ) {
		errors += '<p>Fill out a valid quantity</p>';
	}
	if ( value === '' || value != parseFloat(value) ) {
		errors += '<p class="mb-0">Fill out a valid Value</p>';
	}
	if ( errors != '' ) {
		errors = '<h4>Errors</h4>' + errors;
		$alert.style.display = 'block';
		$alert.innerHTML =errors;
		return 0;
	} else {
		return 1;
	}
}

const deleteList = list => {
	if( confirm("Delete this list?") ) {
		products.length = 0;
		createList(products);
	}
	return;
}

const saveListStorage = list => {
	let jsonStr = JSON.stringify(list);
	localStorage.setItem('list', jsonStr);
	return;
}

const initListStorage = () => {
	let testList = localStorage.getItem('list');

	if ( testList ) {
		products = JSON.parse(testList);
	}

	createList(products);
}


initListStorage();


