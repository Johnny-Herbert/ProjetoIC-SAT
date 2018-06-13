/**
 * This file should be placed at the node_modules sub-directory of the directory where you're 
 * executing it.
 * 
 * Written by Fernando Castor in November/2017. 
 */
 let res = prog("hole4.cnf")
console.log(res.isSat)
console.log(res.satisfyingAssignment)

/*exports.solve = */function prog(fileName) {
    let formula = /*propsat.*/readFormula(fileName)
    let result = doSolve(formula.clauses, formula.variables)
    return result // two fields: isSat and satisfyingAssignment
  }
  
  // Receives the current assignment and produces the next one
  function nextAssignment(currentAssignment) {
    // implement here the code to produce the next assignment based on currentAssignment. 
    let newAssignment = nextAssignmentAux(currentAssignment, currentAssignment.length - 1)
    return newAssignment
  }
  function nextAssignmentAux(currentAssignment, i) {
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
            return nextAssignmentAux(currentAssignment, i - 1)
        } 
    }
        return currentAssignment
  }
  
  function doSolve(clauses, assignment) {

    let isSat = false
    let i = 0
    let arraySituacaoClauses = []
    let situacaoClauses = false
    //must check whether this is the last assignment or not
    //o maximo de possibilidades é 2^(tamanho do array)
    while ((!isSat) && i < 2 ** assignment.length - 1) {
      //Esses 2 fors percorrem todos os itens das clausulas
        for(j = 0; j < clauses.length; j++)
        {
            //console.log(clauses1[j])
            for(k = 0; k < clauses[j].length; k++)
            {
                if(clauses[j][k] < 0)
                {
                    //Muda estado da variavel de acordo com o seu valor e o valor do item da clausula
                    //Eu uso o Math.abs(clauses[j][k]) - 1 para pegar a posição em que a variavel está e em seguida pegar o valor dela
                    situacaoClauses = situacaoClauses || !assignment[Math.abs(clauses[j][k]) - 1]
                }
                else
                {
                    //Muda estado da variavel de acordo com o seu valor e o valor do item da clausula
                    //Eu uso o clauses[j][k] - 1 para pegar a posição em que a variavel está e em seguida pegar o valor dela
                    situacaoClauses = situacaoClauses || assignment[clauses[j][k] - 1]
                }
            }
            //Aqui eu insiro qual foi o resultado da situação de cada clausula
            arraySituacaoClauses.push(situacaoClauses)
            situacaoClauses = false
        }
        //Eu botei a variavel isSat = true, pois o valor true nao vai interferir na verificação &&
        isSat = true
        // does this assignment satisfy the formula? If so, make isSat true. 
        //Aqui eu vou verificar qual o resultado final da operações entre as clausulas
        for(j = 0; j < arraySituacaoClauses.length; j++)
        {
            isSat = isSat && arraySituacaoClauses[j]
        }
        //Zero o array, pois ele pode ser usado para o proximo teste, se o atual ainda nao tiver sido satisfeito
        arraySituacaoClauses = []
        // if not, get the next assignment and try again. 
        if(!isSat)
        {
            assignment = nextAssignment(assignment,assignment.length - 1)
        }
        i++
    }
    
    let result = {'isSat': isSat, satisfyingAssignment: null}
    if (isSat) {
      result.satisfyingAssignment = assignment
    }
    return result
  }
    
  function readFormula(fileName) {
    
    // To read the file, it is possible to use the 'fs' module. 
    // Use function readFileSync and not readFile. 
    // First read the lines of text of the file and only afterward use the auxiliary functions.
    let fs = require('fs')
    let text = fs.readFileSync(fileName).toString().split('\r\n'); // = ...  //  an array containing lines of text extracted from the file.  
    let clauses = readClauses(text)
    let variables = readVariables(clauses)
    
    // In the following line, text is passed as an argument so that the function
    // is able to extract the problem specification.
    let specOk = checkProblemSpecification(text, clauses, variables)
  
    let result = { 'clauses': [], 'variables': [] }
    if (specOk) {
      result.clauses = clauses
      result.variables = variables
    }
    return result
  }

  function checkProblemSpecification(text,clauses,variables)
  {
    let quantClauses = 0
    let quantVariables = 0
    //Procurando o cnf
    for(i = 0; i < text.length; i++)
    {
        //console.log(text[i])
      let array = text[i]/*.split(' ')*/
      for(j = 0; j < array.length; j++)
      {
        //Quando eu achar o cnf, significa que os proximos 2 elementos do array sao as quantidades de
        //variaveis e clausulas respectivamente
        if(array[j] == 'cnf')
        {
          quantVariables = array[j+1]
          quantClauses = array[j+2]
        }
      }
    }
    //aqui, vou verificar se estao com as quantidades certas
    if(quantVariables == variables.length && quantClauses == clauses.length)
    {
      return true
    }
    else
    {
      return false
    }
  }

  function readClauses(text)
  {
    //armazenando o array text em outro array, mas com um nome mais facil de identificar que operações vou fazer nele
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
    for(i = 0; i < linhas.length; i++)
    {
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
                //verificação se chegou no final da clausula
                if(linhas[i][j] == 0 && linhas[i][j] != '')
                {
                    //só zera a posição quando chegar no fim da causula pois pode ter uma clausula
                    posicao = 0
                }
                else if (linhas[i][j] != 0 && linhas[i][j] != '')
                {
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
    return clauses
  }

  function readVariables(clauses)
  {
    let variables = []
    for(i = 0; i < clauses.length; i++)
    {
        for(j = 0; j < clauses[i].length; j++)
        {
            //como cada item da clausula é um valor de 1 a n, entao cada variavel pode ser armazenada no seu valor menos 1
            // exemplo: a variavel de valor 1 vai ser armazenada na posição 0, a de valor 2 vai ser armazenada na posição 1
          variables[Math.abs(clauses[i][j]) - 1] = 0
        }
    }
    return variables
  }