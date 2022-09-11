//declaration de la structure
function Matiere(code, nom, volumeHoraire, nomE, assistant, estPratique) {
    this.codeM = code;
    this.nomM = nom;
    this.vH = volumeHoraire;
    this.nomE = nomE;
    this.assistant = assistant;
    this.estPratique = estPratique;
}

// creation du tableau qui contiendra la liste des MATIERES
var listeMatieres = new Array();

//fonction qui affiche les elements du tableau de matieres dans un tableau HTML

function previewMatieres(listeMatieres) {
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tmatiere');

    //vide le tableau html
    preview.innerHTML = "";

    //ajout des cellules d'entete
    let ligneEntete = document.createElement('tr');
    let celluEntete1 = document.createElement('th');
    celluEntete1.innerText = "Code Matiere";
    let celluEntete2 = document.createElement('th');
    celluEntete2.innerText = "Nom matiere";
    let celluEntete3 = document.createElement('th');
    celluEntete3.innerText = "Vol Horaire";
    let celluEntete4 = document.createElement('th');
    celluEntete4.innerText = "Enseignant";
    let celluEntete5 = document.createElement('th');
    celluEntete5.innerText = "Assistant";
    let celluEntete6 = document.createElement('th');
    celluEntete6.innerText = "Pratique";
    let celluEntete7 = document.createElement('th');
    celluEntete7.innerText = "Actions";
    ligneEntete.appendChild(celluEntete1);
    ligneEntete.appendChild(celluEntete2);
    ligneEntete.appendChild(celluEntete3);
    ligneEntete.appendChild(celluEntete4);
    ligneEntete.appendChild(celluEntete5);
    ligneEntete.appendChild(celluEntete6);
    ligneEntete.appendChild(celluEntete7);
    preview.appendChild(ligneEntete);

    //ajout des elements du tableau d'objet
    listeMatieres.forEach((matiere, index) => {
        let ligne = document.createElement('tr');

        let cellule1 = document.createElement('td');
        cellule1.innerText = matiere.codeM;

        let cellule2 = document.createElement('td');
        cellule2.innerText = matiere.nomM;

        let cellule3 = document.createElement('td');
        cellule3.innerText = matiere.vH;

        let cellule4 = document.createElement('td');
        cellule4.innerText = matiere.nomE;

        let cellule5 = document.createElement('td');
        cellule5.innerText = matiere.assistant;

        let cellule6 = document.createElement('td');
        cellule6.innerText = matiere.estPratique;

        let btn1 = document.createElement('button');
        btn1.innerHTML = '+';
        btn1.setAttribute('data-bs-toggle', 'modal');
        btn1.setAttribute('data-bs-target', '#exampleModal');
        btn1.setAttribute('class', 'action-btn');

        let btn2 = document.createElement('button');
        btn2.innerHTML = '-';
        btn2.setAttribute('class', 'action-btn');

        let cellule7 = document.createElement('td');
        cellule7.appendChild(btn1);
        cellule7.appendChild(btn2);

        ligne.appendChild(cellule1);
        ligne.appendChild(cellule2);
        ligne.appendChild(cellule3);
        ligne.appendChild(cellule4);
        ligne.appendChild(cellule5);
        ligne.appendChild(cellule6);
        ligne.appendChild(cellule7);

        preview.appendChild(ligne);

        btn1.addEventListener('click', function modifierDebouche(e) {
            e.preventDefault();
            let modalContent = document.getElementById('modalContent');
            modalContent.innerHTML =
                `<div class="input-group">  
                    <input type="text" id="nouveauCodeM" class="form-control"placeholder="${listeMatieres[index].codeM}">
                    <input type="text"  id="nouveauNomM" class="form-control"placeholder="${listeMatieres[index].nomM}">
                    <input type="text"  id="nouveauVh" class="form-control"placeholder="${listeMatieres[index].vH}">
                 </div>
                 <div class="input-group">
                    <input type="text" id="nouveauNomE" class="form-control"placeholder="${listeMatieres[index].nomE}">
                    <input type="text"  id="nouveauAssistant" class="form-control"placeholder="${listeMatieres[index].assistant}">
                    <input type="text"  id="nouveauPratique" class="form-control"placeholder="${listeMatieres[index].estPratique}">
                 </div>`;

            let saveModifBtn = document.getElementById('saveModif');
            saveModifBtn.addEventListener('click', function saveModifMatiere(e) {
                e.preventDefault();
                listeMatieres[index].codeM = document.getElementById('nouveauCodeM').value;
                listeMatieres[index].nomM = document.getElementById('nouveauNomM').value;
                listeMatieres[index].vH = document.getElementById('nouveauVh').value;
                listeMatieres[index].nomE = document.getElementById('nouveauNomE').value;
                listeMatieres[index].assistant = document.getElementById('nouveauAssistant').value;
                listeMatieres[index].estPratique = document.getElementById('nouveauPratique').value;
                console.log(listeMatieres);
                previewMatieres(listeMatieres);
            })
        })

        btn2.addEventListener('click', function supprimerDebouche(e) {
            e.preventDefault();
            listeMatieres.splice(index, 1);
            previewMatieres(listeMatieres);
        })

    })
}

let addMatiereBtn = document.getElementById('addMbtn');
addMatiereBtn.addEventListener('click', function ajouterMatiere(e) {
    e.preventDefault();

    //recuperation des donnees
    let inputCodeMatiere = document.getElementById('codeM');
    let codeMatiere = inputCodeMatiere.value;
    let inputNomMatiere = document.getElementById('nomM');
    let nomMatiere = inputNomMatiere.value;
    let inputVolumeHoraire = document.getElementById('volumeH');
    let volumeHoraire = inputVolumeHoraire.value;
    let inputNomEnseignant = document.getElementById('nomE');
    let nomEnseignant = inputNomEnseignant.value;
    let inputNomAssistant = document.getElementById('assistant');
    let nomAssistant = inputNomAssistant.value;

    let estPratique;
    if (document.getElementById('oui').checked) {
        estPratique = document.getElementById('oui').value;
    }
    if (document.getElementById('non').checked) {
        estPratique = document.getElementById('non').value;
    }


    //creation de l'objet Matiere
    let matiere = new Matiere(codeMatiere, nomMatiere, volumeHoraire, nomEnseignant, nomAssistant, estPratique);

    //ajout de l'objet crée à la liste des debouches (tableau)
    listeMatieres.push(matiere);
    console.log(listeMatieres);

    //reinitialisation des inputs
    inputCodeMatiere.value = "";
    inputCodeMatiere.setAttribute('placeholder', 'Code Matiere');
    inputNomMatiere.value = "";
    inputNomMatiere.setAttribute('placeholder', 'Nom Matiere');
    inputVolumeHoraire.value = "";
    inputVolumeHoraire.setAttribute('placeholder', 'VolumeHoraire');
    inputNomEnseignant.value = "";
    inputNomEnseignant.setAttribute('placeholder', 'Enseigant');
    inputNomAssistant.value = "";
    inputNomAssistant.setAttribute('placeholder', 'Asistant');

    //affichage de l'aperçu
    previewMatieres(listeMatieres);
});

//fonction pour fermer le live preview
let terminerMatiereBtn = document.getElementById('terminerM');
terminerMatiereBtn.addEventListener('click', function terminerDebouche(e) {
    e.preventDefault();
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tmatiere');

    //vide le tableau html
    preview.innerHTML = "";
})

//fonction pour afficher la liste des debouchés
let consulterMatiereBtn = document.getElementById('consulterM');
consulterMatiereBtn.addEventListener('click', function consulterMatere(e) {
    e.preventDefault();
    //affichage de l'aperçu
    previewMatieres(listeMatieres);
})


