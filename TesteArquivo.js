    
    /** Parte de pegar quantas variaveis e quantas clausulas vao ter na entrada
    let fs = require('fs')
    let text = fs.readFileSync('hole1.cnf').toString().split('\r\n'); // = ...  //  an array containing lines of text extracted from the file. 
    let quantClauses = 0
    let quantVariables = 0
    //let linhas = text.split('\r\n')
    for(i = 0; i < text.length; i++)
    {
      let array = text[i].split(' ')
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
     */
    //------------------------------------------------------------------------------------------------------------------

    /* Parte de pegar as clausulas 
    let fs = require('fs')
    let text = fs.readFileSync('pieceOfHole6.cnf').toString().split('\r\n'); // = ...  //  an array containing lines of text extracted from the file. 
    //faço um array onde cada posição é uma linha do documento
    let linhas = text
    //variavel para verificar se achei o cnf
    let achou = false
    //variavel que indica posição onde m
    let posicao = 0
    let array = [] 
    let clauses = []
    for(i = 0; i < linhas.length; i++)
    {
        linhas[i] = linhas[i].split(' ')
    }
    //console.log(linhas)
    for(i = 0; i < linhas.length; i++)
    {
        //console.log(linhas[i].length)
        for(j = 0; j < linhas[i].length; j++)
        {
            
          //verifico se eu eu achei o cnf
            if(linhas[i][j] == 'cnf' && !achou)
            {
              // se eu achei, quer dizer que a proxima linha ja contem as entradas
                achou = true
                i++
                j = 0
            }
            if(achou)
            {
                //console.log("Meu valor:" + linhas[i][j])
                //verificação se chegou no final da clausula
                if(linhas[i][j] == 0 && linhas[i][j] != '')
                {
                    //console.log("Entrei no if")
                    //só zera a posição quando chegar no fim da causula pois pode ter uma clausula
                    posicao = 0
                }
                else if (linhas[i][j] != 0 && linhas[i][j] != '')
                {
                    //console.log("Entrei no else")
                    array[posicao] = linhas[i][j]
                    posicao++
                }
            }
        }
        //Verifica se ja está na parte de clausula e se chegou no final na clausula, so assim irá inserir
        //no array de clausulas
        if(achou && posicao == 0)
        {
            clauses.push(array)
            array = []
        }
    }
    console.log('Clauses')
    console.log(clauses)
//------------------------------------------------------------------------------------------------------------------------ 
 // Pegar o array de variaveis
    
    let variables = []
    for(i = 0; i < clauses.length; i++)
    {
        for(j = 0; j < clauses[i].length; j++)
        {
            //como cada item da clausula é um valor de 1 a n, entao cada variavel pode ser armazenada no seu valor menos 1
            // exemplo: a variavel de valor 1 vai ser armazenada na posição 0, a de valor 2 vai ser armazenada na posição 1
          variables[Math.abs(clauses[i][j]) - 1] = false
        }
    }
    console.log(variables)
   */
//--------------------------------------------------------------------------------------------------------------

//let fs = require('fs')
//let text = fs.readFileSync('hole1.cnf').toString(); // = ...  //  an array containing lines of text extracted from the file. 

/*
let array = []
array[0] = 2
array[1] = 3
array['5'] = 0
array[2] = 0
console.log(array)

for(i = 0; i < array.length; i++)
{
    if(array[i] == null)
    {
        console.log("opa")
    }
}
array = array.splice(0,array.indexOf(null))
console.log(array)
*/

//let valor = false || true
//console.log(valor);

//------------------------------------------------------------------------------------------------------------------
//metodo nextAssignment
/*
var currentAssignment = [0,0,0,0]
console.log(currentAssignment)
for(i = 0; i < 2 ** currentAssignment.length - 1; i++)
{
    var resposta = nextAssignment(currentAssignment,currentAssignment.length - 1)
    console.log(resposta)
}
function nextAssignment(currentAssignment, i) {
    // implement here the code to produce the next assignment based on currentAssignment. 
    if(currentAssignment[i] == 0)
    {
        currentAssignment[i] = 1
    }
    else
    {
        currentAssignment[i] = 0
        //esse if verifica se ele nao está na ultima casa, pq se estiver, significa que todos do array sao 1
        //ou seja, ja foram todas as possibilidades
        if(i != 0)
        {           
            return nextAssignment(currentAssignment, i - 1)
        }
        
    }
        return currentAssignment
  }
*/


