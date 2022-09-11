//declaratio de la structure parcours
function Parcours(nom, Debouche) {
    this.nomP = nom;
    this.Debouche = Debouche;
}

// creation du tableau qui contiendra la liste des parcours
var listeParcours = new Array();

//fonction qui affiche les elements du tableau de parcours dans un tableau HTML
function previewParours(listeParcours) {
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tparcours');

    //vide le tableau html
    preview.innerHTML = "";

    //ajout des cellules d'entete
    let ligneEntete = document.createElement('tr');
    let celluEntete1 = document.createElement('th');
    celluEntete1.innerText = "Nom du Parcours";
    let celluEntete2 = document.createElement('th');
    celluEntete2.innerText = "Liste des debouchés";
    let celluEntete3 = document.createElement('th');
    celluEntete3.innerText = "Actions";
    ligneEntete.appendChild(celluEntete1);
    ligneEntete.appendChild(celluEntete2);
    ligneEntete.appendChild(celluEntete3);
    preview.appendChild(ligneEntete);

    //ajout des elements du tableau d'objet
    listeParcours.forEach((parcours, index) => {
        let ligne = document.createElement('tr');

        let cellule1 = document.createElement('td');
        cellule1.innerText = parcours.nomD;

        let cellule2 = document.createElement('td');
        var listeDebouchesParcours = document.createElement('ol');
        let listeDeTousLesDebouchesSurLaPage = document.getElementsByClassName('debouches');
        listeDeTousLesDebouchesSurLaPage.forEach(debouche => {
            if (debouche.checked) {
                listeDebouchesParcours.innerHTML += `<li>${debouche.value}</li>`;
            }

        });
        cellule2.appendChild(listeDebouchesParcours);

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

let addParcoursBtn = document.getElementById('addDbtn');
addParcoursBtn.addEventListener('click', function ajouterParcours(e) {
    e.preventDefault();

    //recuperation des donnees
    let inputNomParcours = document.getElementById('nomP');
    let nomParcours = inputNomParcours.value;

    let inputCodeDebouche = document.getElementById('codeD');
    let codeDebouche = inputCodeDebouche.value;

    var listeDebouchesParcours=Array();
        let listeDeTousLesDebouchesSurLaPage = document.querySelectorAll('.debouches');
        listeDeTousLesDebouchesSurLaPage =[...listeDeTousLesDebouchesSurLaPage];
        let listeDebouchesChecked = Array();
        listeDeTousLesDebouchesSurLaPage.forEach(debouche => {
            if (debouche.checked) {
               listeDebouchesChecked.push(debouche.value);
            }
        });
        listeDebouchesParcours = listeDebouches.filter(debouche=>{
            listeDebouchesChecked.forEach(elt =>{
                if(debouche.nomD = elt){
                    return debouche;
                };
            })
        });
        console.log(listeDebouchesParcours);
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