//declaration de la structure de données
function Debouche(code, nom) {
    this.codeD = code;
    this.nomD = nom;
}

// creation du tableau qui contiendra la liste des debouches
var listeDebouches = new Array();

//fonction qui affiche les elements du tableau de debouché dans un tableau HTML

function previewDebouches(listeDebouches) {
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tdebouche');

    //vide le tableau html
    preview.innerHTML = "";

    //ajout des cellules d'entete
    let ligneEntete = document.createElement('tr');
    let celluEntete1 = document.createElement('th');
    celluEntete1.innerText = "Nom du Débouché";
    let celluEntete2 = document.createElement('th');
    celluEntete2.innerText = "Code du Débouché";
    let celluEntete3 = document.createElement('th');
    celluEntete3.innerText = "Actions";
    ligneEntete.appendChild(celluEntete1);
    ligneEntete.appendChild(celluEntete2);
    ligneEntete.appendChild(celluEntete3);
    preview.appendChild(ligneEntete);

    //ajout des elements du tableau d'objet
    listeDebouches.forEach((debouche, index) => {
        let ligne = document.createElement('tr');

        let cellule1 = document.createElement('td');
        cellule1.innerText = debouche.nomD;

        let cellule2 = document.createElement('td');
        cellule2.innerText = debouche.codeD;

        let btn1 = document.createElement('button');
        btn1.innerHTML = '+';
        btn1.setAttribute('data-bs-toggle', 'modal');
        btn1.setAttribute('data-bs-target', '#exampleModal');
        btn1.setAttribute('class', 'action-btn');

        let btn2 = document.createElement('button');
        btn2.innerHTML = '-';
        btn2.setAttribute('class', 'action-btn');

        let cellule3 = document.createElement('td');
        cellule3.appendChild(btn1);
        cellule3.appendChild(btn2);

        ligne.appendChild(cellule1);
        ligne.appendChild(cellule2);
        ligne.appendChild(cellule3);

        preview.appendChild(ligne);

        btn1.addEventListener('click', function modifierDebouche(e) {
            e.preventDefault();
            let modalContent = document.getElementById('modalContent');
            modalContent.innerHTML =
                `<div class="input-group">
                    <span class="input-group-text">Nom</span>
                    <input type="text" id="nouveauNomD" class="form-control"placeholder="${listeDebouches[index].nomD}">
                    <span class="input-group-text">Code</span>
                    <input type="text"  id="nouveauCodeD" class="form-control"placeholder="${listeDebouches[index].codeD}">
                 </div>`;

            let saveModifBtn = document.getElementById('saveModif');
            saveModifBtn.addEventListener('click', function saveModifDebouche(e) {
                e.preventDefault();
                listeDebouches[index].nomD = document.getElementById('nouveauNomD').value;
                listeDebouches[index].codeD = document.getElementById('nouveauCodeD').value;
                previewDebouches(listeDebouches);
            })
        })

        btn2.addEventListener('click', function supprimerDebouche(e) {
            e.preventDefault();
            listeDebouches.splice(index, 1);
            previewDebouches(listeDebouches);
        })

    })
}

let addDeboucheBtn = document.getElementById('addDbtn');
addDeboucheBtn.addEventListener('click', function ajouterDebouche(e) {
    e.preventDefault();

    //recuperation des donnees
    let inputNomDebouche = document.getElementById('nomD');
    let nomDebouche = inputNomDebouche.value;
    let inputCodeDebouche = document.getElementById('codeD');
    let codeDebouche = inputCodeDebouche.value

    //creation de l'objet debouché
    let debouche = new Debouche(nomDebouche, codeDebouche);

    //ajout de l'objet crée à la liste des debouches (tableau)
    listeDebouches.push(debouche);

    //reinitialisation des inputs
    inputNomDebouche.value = "";
    inputNomDebouche.setAttribute('placeholder', 'Nom du débouché');
    inputCodeDebouche.value = "";
    inputCodeDebouche.setAttribute('placeholder', 'code du debouché');

    //affichage de l'aperçu
    previewDebouches(listeDebouches);
});
