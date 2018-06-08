/**
var fs = require('fs')
var conteudo = fs.readFileSync("hole1.cnf").toString().split('\r\n')
console.log(conteudo[0])
var clausulas = []
var achou = false
for(i = 0; i< conteudo.length; i++)
{
    var array = conteudo[i].split(' ')
    for(j = 0; j < array.length && !achou; j++)
    {
        if(array[j] == 'cnf')
        {
            achou = true
            array = [array[2],array[3]]
            clausulas.push(array)
        }
    }
    if(achou)
    {
        array.pop()
        clausulas.push(array)   
    }
}
console.log(clausulas) */
    let fs = require('fs')
    let text = fs.readFileSync('hole1.cnf').toString(); // = ...  //  an array containing lines of text extracted from the file. 
    let quantClauses = 0
    let quantVariables = 0
    let linhas = text.split('\r\n')
    for(i = 0; i < linhas.length; i++)
    {
      let array = linhas[i].split(' ')
      for(j = 0; j < array.length; j++)
      {
        if(array[j] == 'cnf')
        {
          quantVariables = array[j+1]
          quantClauses = array[j+2]
        }
      }
    }
    console.log(quantVariables,quantClauses)