/*
    O usuário poderá adicionar products a uma lista com as seguintes categorias:
    Nome, Quantidade, Valor

    Por fim o app irá calcular o valor unitário de cada produto * quantidade + outros products * quantidade. 
*/

// Arrey com objeto de products
const products = [
  {'name': 'rice', 'amount': '1', 'value': '5.40'},
  {'name': 'bEer', 'amount': '12', 'value': '3.99'},
  {'name': 'meat', 'amount': '1', 'value': '15.00'}
];

// Todos valores * a quantidade
function getTotal(products) {
  var total = 0;

  for(var i in products) {
    total += products[i].value * products[i].amount;
    // console.log(
    //   `Nome: ${products[i].name} | Valor: ${products[i].value} * ${products[i].amount}` );
  }
  return total;
}

// Create linhas da tabela com as propriedades do produto
function createList(products) {

  var list = `
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Quantidade</th>
        <th scope="col">Valor</th>
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
    <td>Editar | Deletar</td>
  </tr>`;
  }

  list += `</tbody>`;

  return list;
}

// Adiciona lista na tabela
function insertList( tableID, list ) {

  document.getElementById(tableID).innerHTML = list;

  return;
}

function formatUppercase(value) {

  var str = value.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1) + '';
  return str;
}

function formatFloat(value) {
  var float = parseFloat(value).toFixed(2) + '';
  float.replace('.', ',');
  float = `R$ ${ float }`;

  return float;
}

function addData() {

  var inputName = document.querySelector('#name').value;
  var inputAmount = document.querySelector('#amount').value;
  var inputValue = document.querySelector('#value').value;

  var produto = [];
  produto.unshift({
    'nome': inputName,
    'amount': inputAmount,
    'value': inputValue
  });

  insertList('table-list', list);
}


formatFloat(products[1].valor);
list = createList(products);
insertList('table-list', list);

console.log(document.getElementById('add'));
document.getElementById('add').addEventListener( 'click', addData() );
