var imp = require("./node_modules/ProjetoIC-SAT.js")
var resposta = imp.solve("simple0.cnf")
console.log(resposta.isSat)
console.log(resposta.satisfyingAssignment)