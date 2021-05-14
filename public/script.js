window.onload = function() {
	Inicio();
}
function Inicio(){
	let text =`<p>Markdown es un lenguaje de marcado que facilita la aplicación de 
	formato a un texto empleando una serie de caracteres de una forma especial. En principio, 
	fue pensado para elaborar textos cuyo destino iba a ser la web con más rapidez y sencillez 
	que si estuviésemos empleando directamente HTML. Y si bien ese suele ser el mejor uso que podemos darle,
	también podemos emplearlo para cualquier tipo de texto, independientemente de cual vaya a ser 
	su destino(<a href="https://www.genbeta.com/autor/ivanlasso">Iván Lasso</a>, 
	<a href="https://www.genbeta.com/guia-de-inicio/que-es-markdown-para-que-sirve-y-como-usarlo">Genbeta</a>)</p>
	<img src="ejemplowiki.png" style="max-width: 90%;">"`
	document.querySelector("#creacion").innerHTML = text	
}
function Crear(){
	document.querySelector("#creacion").innerHTML = "";
	const url = 'http://localhost:3000/Crear';
	fetch(url).then(
		response => response.json()
		).then(
		data => {
			document.querySelector("#creacion").innerHTML = data.text
			document.querySelector("#mostrar").innerHTML = "";
			var form = document.getElementById('form');
			form.addEventListener('submit',function(e){
				var texto = document.getElementById('textoMarkdow').value;
				var titulo = document.getElementById('title').value;
				if (texto && titulo) {
					e.preventDefault();
					markdown(texto);
				}else{
					alert('Ingrese palabras');
				}
			});
		}
		)
	}
function markdown(markupText) {

		const url = 'http://localhost:3000/MarkdownIt'
		const data = {
			text: markupText
		}
		const request = {
		method: 'POST', // Podría ser GET
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	fetch(url, request)
	.then(
		response => response.json()
		).then(
		data => {
			document.querySelector("#htmlCode").innerHTML =data.text
			//const button = document.createElement('button'); 
			//button.type = 'button'; 
			//button.innerText = 'Guardar'; 
			//button.setAttribute('onclick','Guardar();');
			document.querySelector("#save").innerHTML =`<button type="button" 
			onclick="Guardar()">Save</button>`;
			//document.body.appendChild(button);
		}
	) 		
}
function Guardar(){
	var texto = document.getElementById('textoMarkdow').value;
	var title = document.getElementById('title').value;
	const url = 'http://localhost:3000/Guardar'
	const data = {
		text: texto,
		title: title
	}
	const request = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	}
	fetch(url, request)
	.then(
		response => response.json() 
		).then(
		data => {
			alert(data.text);
			location.reload();
		}
	)
}
function Lista(){
	const url = 'http://localhost:3000/Listar';
	fetch(url)
	.then(
		response => response.json() 
		).then(
		data => {
			var lista_archivos = "<h3>Paginas creadas</h3><ul>";
			for(archivos of data){
				console.log(archivos)
				lista_archivos += `<li><label>${archivos}</label><br>
				<input type="button" onclick="Ver('${archivos}')" value="Ver">
				<input type="button" onclick="Editar('${archivos}')" value="Editar">
				<input type="button" onclick="Eliminar('${archivos}')" value="Eliminar">
				</li>`;
				/*lista_archivos += `<li>${archivos} &nbsp
				<input type="hidden" id="titulo" value="${archivos}">
				<button onclick='Editar()'>Editar</button> 
				<button onclick='Ver()'>Ver Pagina</button> 
				<button onclick='Eliminar()'>Eliminar</button></li>`;*/
			}
			lista_archivos += "</ul>";
			document.querySelector("#lista").innerHTML = lista_archivos;
			document.querySelector("#openlista").setAttribute("onclick","Listasoff()");
		}
	)
}
function Listasoff(){
	document.querySelector("#lista").innerHTML = "";
	document.querySelector("#openlista").setAttribute("onclick","Lista()");
	document.querySelector("#mostrar").innerHTML = "";
	Inicio();
	
}

function Ver(titulo){
	/*let title = document.getElementById('titulo').value;*/
	console.log(titulo)
	const url = 'http://localhost:3000/mostrar';
	const data = {
		text: titulo
	}
	const request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	http = fetch(url, request);
	http.then(
		response => response.json()
	).then(
		data => {
			document.querySelector("#creacion").innerHTML = "";
			document.querySelector("#mostrar").innerHTML = data.text;
		}
	)

}

function Editar(titulo){
	const url = 'http://localhost:3000/editar';
	const data = {
		text: titulo
	}
	const request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	http = fetch(url, request);
	http.then(
		response => response.json()
	).then(
		data => {
			document.querySelector("#creacion").innerHTML = "";
			document.querySelector("#mostrar").innerHTML = data.text;
		}
	)

}

function Eliminar(titulo){
	const url = 'http://localhost:3000/eliminar';
	const data = {
		text: titulo
	}
	const request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	http = fetch(url, request);
	http.then(
		response => response.json()
	).then(
		data => {
			Lista();
		}
	)

}
