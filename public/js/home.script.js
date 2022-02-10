window.onload =  function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/candidates", true);

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && (this.status >= 200 && this.status < 400)){
            var candidates = JSON.parse(this.responseText);
            if(candidates){
                var rows = Math.ceil((candidates.length)/3);
                var listContainer = document.getElementById("candidates");
                var container = document.getElementById("main");

                candidates.forEach(candidate => {
                    var li = createEltWithClass("li", "navbar-item");
                    li.innerHTML ='<a href="/candidate/'+candidate.prenom+'" >'+candidate.prenom+'</a>';
                    addToparent(listContainer, li);
                });

                // Injection des photos et informations sur les candidats
                for(i=0; i<rows; i++){
                    var columns = createEltWithClass("div", "columns");
                    for(j=0; j<3; j++){
                        let newCard = createCard(candidates[(3*i)+j]);
                    
                        addToparent(columns, newCard);
                        addToparent(container, columns);
                    }
                }
            }
        }
    }

    xhr.send();

    // Check for click events on the navbar burger icon
    document.getElementById("burger").addEventListener("click", function() {
        this.classList.toggle("is-active");
        document.getElementById("menu").classList.toggle("is-active");
    });
}

//we just create an HTML Element and return it
// Exemple: createElement("p") will return P
function createElement(_name){
    return document.createElement(_name);
}

function addClass(_elt, _className){
    _elt.className = _className;
}

function createEltWithClass(_name, _class){
    var elt = createElement(_name);
    addClass(elt, _class);
    return elt;
}

function addToparent(_parent, _child){
    _parent.appendChild(_child);
}

function createCard(props = {}){
    var colunm = createEltWithClass("div", "column is-one-third is-success");
    var card = createEltWithClass("div", "card");

    //Card header
    var cardImage = createEltWithClass("div", "card-image");
    var figure = createEltWithClass("figure", "image is-256x256");

    figure.innerHTML = '<img src="images/'+props.img+'" alt="image">';
    addToparent(cardImage, figure);
    addToparent(card, cardImage);

    //Card content
    var cardContent = createEltWithClass("div", "card-content");
    var cardMedia = createEltWithClass("div", "media");
    var content = createEltWithClass("div", "content");

    var mediaContent = createEltWithClass("div", "media-content");
    var nom = createEltWithClass("p", "title is-5");
    var age = createEltWithClass("p", "title is-4");

    nom.innerHTML = props.prenom+" "+props.nom;
    age.innerHTML = "Age: "+props.age+" ans";

    addToparent(mediaContent, nom);
    addToparent(mediaContent, age);
    addToparent(cardMedia, mediaContent);

    content.innerHTML ="Parti: "+ props.parti;

    addToparent(cardContent, cardMedia);
    addToparent(cardContent, content);
    addToparent(card, cardContent);

     addToparent(colunm, card);

     return colunm;
}