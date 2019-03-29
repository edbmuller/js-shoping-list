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

const inputName = document.querySelector('#name').value;
const inputAmount = document.querySelector('#amount').value;
const inputValue = document.querySelector('#value').value;

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

	return list;
}

// Adiciona lista na tabela
const insertList = ( tableID, list ) => {

	document.getElementById(tableID).innerHTML = list;

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

const addData = (evt) => {

	products.unshift({
		'name': inputName.value,
		'amount': inputAmount.value,
		'value': inputValue.value
	});


	let list = createList(products);

	insertList('table-list', list);
}

const setUpdate = (id) => {
	let obj = list[id];

	console.log(obj);
	// inputName.value = obj.name;
	// inputAmount.value = obj.amount;
	// inputValue.value = obj.value;
}

let list = createList(products);

insertList('table-list', list);

