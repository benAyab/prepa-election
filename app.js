const express = require('express');
const join = require('path').join;
const app = express()

const port = 3000
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'public'));
app.disable('x-powered-by');
app.use(express.static(join(__dirname, 'public')));


let listCandidates = ["Emmanuel", "Valerie", "Marine", "Jean-Luc", "Yannick", "Anne"];

//affichage de la liste des prenoms des candidats
console.log("\n Parcourt de liste des prenoms des candidats\n")
listCandidates.forEach(element => {
  console.log(element);
});


//Ajout du candidat Eric  Zemmour 
listCandidates.push("Eric");

console.log("\n Liste candidat après ajout de Eric:\n")
listCandidates.forEach(element => {
  console.log(element);
});

// Suppresion de Anne Hidalgot
removeCandidate("Anne", listCandidates);

console.log("\n Liste candidat après suppression de Anne:\n")
listCandidates.forEach(element => {
  console.log(element);
});


//Nouvelle structure de listeCandidates

listCandidates = [
  {
    prenom: "Emmanuel",
    nom: "Macron",
    age: 44,
    parti: "La République En Marche",
    budget: 16_578_781,
    img: "emmanuel.jpg"
  },
  {
    prenom: "Valerie",
    nom: "Pécresse",
    age: 54,
    parti: "Soyons libres",
    budget: 11_542_000,
    img: "valerie.jpg"
  },
  {
    prenom: "Marine",
    nom: "Le Pen",
    age: 53,
    parti: "Rassemblement National",
    budget: 11_542_991,
    img: "marine.jpg"
  },
  {
    prenom: "Jean-Luc",
    nom: "Mélenchon",
    age: 70,
    parti: "La France insoumise",
    budget: 10_241_760,
    img: "jean-luc.jpg"
  },
  {
    prenom: "Yannick",
    nom: "Jadot",
    age: 54,
    parti: "Groupe des Verts/Alliance libre européenne",
    budget: 14_000_760,
    img: "yannick.jpg"
  },
  {
    prenom: "Eric",
    nom: " Zemmour",
    age: 63,
    parti: "Reconquête!",
    budget: 13_452_102,
    img: "eric.jpeg"
  }
]

console.log("\n Noms et prenoms des candidats:\n");
console.log("##########################################");
listCandidates.forEach(element => {
  console.log(element.prenom +" "+element.nom);
  console.log("------------------------------------------");
});

//Appel de la fonction dispInfos
console.log("\n Test de la fonction dispInfos:\n");
console.log(dispInfos(listCandidates, "Emmanuel"));


app.get('/', (req, res) => {
  res.status(200)
  .sendFile(join(__dirname, "public/index.html"));
});

app.get("/candidates", (req, res) =>{
  res.status(200)
  .send(JSON.stringify(listCandidates));
});

app.get("/candidate/:prenom", (req, res) =>{
  let prenom = req.params.prenom;
  let index = listCandidates.findIndex((elt) => elt.prenom === prenom);

  if(index !== -1){
    res.status(200)
    .render("detail", {candidate: listCandidates[index]});
  }else{
    res.redirect("/");
  }
})

function dispInfos(_array, _prenom){
  let index = _array.findIndex((elt) => elt.prenom === _prenom);

  if(index !== -1){
    return ` Nom et prenom: ${_array[index].prenom} ${_array[index].nom}\n Age: ${_array[index].age} ans \n parti: ${_array[index].parti}`
  }else{
    return "";
  }
}


//Fonction de suppression du prenom d'un candidat
function removeCandidate(prenom, _array = []){
  let index = _array.findIndex((elt) => elt === prenom);

  if(index !== -1){
    _array.splice(index, 1);
  }
}
app.listen(port, () => {
  //console.log(`Example app listening on port ${port}`)
})