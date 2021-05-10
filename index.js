const fs = require('fs');
const path = require('path');
const express = require('express');
const bp = require('body-parser');
const MarkdownIt = require('markdown-it'),
md = new MarkdownIt();
const app = express();
app.use(express.static('public'))
app.use(bp.json())
app.use(bp.urlencoded({
	extended: true
}))
app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000")
})
app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/Crear', (request, response) => {
	fs.readFile(path.resolve(__dirname, 'public/crear.html'), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			response.json({
				text: data
			})
		})
})