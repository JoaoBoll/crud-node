const express = require('express');
const res = require('express/lib/response');

const server = express();

server.use(express.json())

//query params = ?nome=NodeJs
//Route params = /curso/id
//request body = { nome:'NodeJs', tipo: 'BackEnd' }

//localhost:3000/curso
//req recebe params   /   res seria a resposta

const cursos = ['Node Js', 'Javascript', 'ReacNative'];

//middleware Global
server.use((req, res, next) => {
    console.log('Requisição chamada')
    return next();
})

function checkIndexCurso(req, res, next) {

    const curso = curso[req.params.index];

    if (!curso) {
        return res.status(404).json({error: "Curso não existe"})
    }

    req.curso = curso;

    return next();
}

function checkCurso(req, res, next) {
    if (!req.body.name) {
        return res.status(404).json({error: "Nome do curso é obrigatório"})
    }
}

//Listando cursos
server.get('/cursos/', (req, res) => {

    return res.json(cursos);
});

 //Criando novo curso
server.post('/cursos', checkCurso, (req, res) => {
    const {name} = req.body;
    cursos.push(name);
    return res.json(cursos);
})

//Buscando Cursos
server.get('/cursos/:index', checkIndexCurso, (req, res) => {

//    const {index} = req.params;
   
    return res.json(req.curso);
});

//Atualizando Cursos
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    cursos[index] = name;

    return res.json(cursos);

})

//Deletando curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const {index} = req.params;
    cursos.splice(index, 1);

    return res.json(cursos);
})

//Define porta que o server vai abrir
server.listen(3000);