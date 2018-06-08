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
console.log(clausulas)