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
			var form = document.getElementById('form');
			form.addEventListener('submit',function(e){
				var texto = document.getElementById('textoMarkdow').value;
				if (texto) {
					e.preventDefault();
					console.log(texto);
				}else{
					alert('Ingrese palabras');
				}
			});
		}
		)
	}