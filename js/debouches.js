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

//fonction qui ajoute 
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

//fonction pour fermer le live preview
let terminerDeboucheBtn = document.getElementById('terminerD');
terminerDeboucheBtn.addEventListener('click', function terminerDebouche(e) {
    e.preventDefault();
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tdebouche');

    //vide le tableau html
    preview.innerHTML = "";
})

//fonction pour afficher la liste des debouchés
let consulterDeboucheBtn = document.getElementById('consulterD');
consulterDeboucheBtn.addEventListener('click', function consulterDebouche(e) {
    e.preventDefault();
    //affichage de l'aperçu
    previewDebouches(listeDebouches);
})

//fonction pour afficher la liste des parcours dans le bloc parcours
let blocParcours = document.getElementById('v-pills-messages-tab');
blocParcours.addEventListener('click', function afficherListeDebouchesBlocParcours(e) {
    e.preventDefault();

    let debouchesParcours = document.getElementById('debouchesParcours');
    debouchesParcours.innerHTML = "";
    listeDebouches.forEach((debouche) => {
        debouchesParcours.innerHTML += `
        <div class="form-check form-check-inline">
            <input class="form-check-input debouches" type="checkbox" 
                value="${debouche.nomD}">
            <label class="form-check-label">${debouche.nomD}</label>
          </div>
        `;
    });

});


/* Debut Code pour les matieres **************************************************************/
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

//fonction pour afficher la liste des Matieres
let consulterMatiereBtn = document.getElementById('consulterM');
consulterMatiereBtn.addEventListener('click', function consulterMatere(e) {
    e.preventDefault();
    //affichage de l'aperçu
    previewMatieres(listeMatieres);
})

/* Fin Code pour les matieres ****************************************************************/



/*Debut Code Parcours ************************************************************************/
//declaration de la structure parcours
function Parcours(nom, listeDebouchesParcours) {
    this.nomP = nom;
    this.listeDebouchesParcours = listeDebouchesParcours;
}

// creation du tableau qui contiendra la liste des parcours
var listeParcours = new Array();

//fonction qui affiche les elements du tableau de parcours dans un tableau HTML
function previewParcours(listeParcours) {
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
        cellule1.innerText = parcours.nomP;

        let cellule2 = document.createElement('td');
        var listeDebouchesParcours = document.createElement('ul');

        parcours.listeDebouchesParcours.forEach(debouche => {
            listeDebouchesParcours.innerHTML += `<li>${debouche.nomD}</li>`;
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

        btn1.addEventListener('click', function modifierParcours(e) {
            e.preventDefault();
            let modalContent = document.getElementById('modalContent');
            modalContent.innerHTML =
                `<div class="input-group">
                    <span class="input-group-text">Nom parcours</span>
                    <input type="text" id="nouveauNomP" class="form-control"placeholder="${listeParcours[index].nomP}">
                 </div>
                 <div class="mt-2 mb-2">Selectionner les débouchés du parcours</div>`;

            listeDebouches.forEach((debouche) => {
                modalContent.innerHTML += `
                     <div class="form-check form-check-inline">
                         <input class="form-check-input debouches" type="checkbox" 
                             value="${debouche.nomD}">
                         <label class="form-check-label">${debouche.nomD}</label>
                       </div>
                     `;
            });


            let saveModifBtn = document.getElementById('saveModif');
            saveModifBtn.addEventListener('click', function saveModifParcours(e) {
                e.preventDefault();
                listeParcours[index].nomP = document.getElementById('nouveauNomP').value;

                //recupere les Tous les debouches sur la page
                let listeDeTousLesDebouchesSurLaPage = document.querySelectorAll('.debouches');
                listeDeTousLesDebouchesSurLaPage = [...listeDeTousLesDebouchesSurLaPage];
                //cree un tablea contenant laliste de tous les debouches selectionnes
                let listeDebouchesChecked = Array();
                listeDeTousLesDebouchesSurLaPage.forEach(debouche => {
                    if (debouche.checked) {
                        listeDebouchesChecked.push(debouche.value);
                    }
                });
                var listeDebouchesParcours = Array();
                listeDebouchesParcours = Object.values(listeDebouches);
                listeDebouchesParcours.forEach((debouche, index) => {
                    if (listeDebouchesChecked.indexOf(debouche.nomD) == -1) {
                        listeDebouchesParcours.splice(index, 1);
                    }
                })

                listeParcours[index].listeDebouchesParcours = listeDebouchesParcours;
                previewParcours(listeParcours);
            })

        })

        btn2.addEventListener('click', function supprimerParcours(e) {
            e.preventDefault();
            listeParcours.splice(index, 1);
            previewParcours(listeParcours);
        })

    })
}

//fonction pour ajouter un parcours
let addParcoursBtn = document.getElementById('addPbtn');
addParcoursBtn.addEventListener('click', function ajouterParcours(e) {
    e.preventDefault();

    //recuperation des donnees des inputs
    let inputNomParcours = document.getElementById('nomP');
    let nomParcours = inputNomParcours.value;

    //recupere les Tous les debouches sur la page
    let listeDeTousLesDebouchesSurLaPage = document.querySelectorAll('.debouches');
    listeDeTousLesDebouchesSurLaPage = [...listeDeTousLesDebouchesSurLaPage];
    //cree un tablea contenant laliste de tous les debouches selectionnes
    let listeDebouchesChecked = Array();
    listeDeTousLesDebouchesSurLaPage.forEach(debouche => {
        if (debouche.checked) {
            listeDebouchesChecked.push(debouche.value);
        }
    });
    //cree le tableau des debouches du parcours
    var listeDebouchesParcours = Array();
    listeDebouchesParcours = Object.values(listeDebouches);
    listeDebouchesParcours.forEach((debouche, index) => {
        if (listeDebouchesChecked.indexOf(debouche.nomD) == -1) {
            listeDebouchesParcours.splice(index, 1);
        }
    })

    let parcours = new Parcours(nomParcours, listeDebouchesParcours);

    //ajout de l'objet crée à la liste des parcours(tableau)
    listeParcours.push(parcours);
    console.log(listeParcours);

    //reinitialisation des inputs
    inputNomParcours.value = "";
    inputNomParcours.setAttribute('placeholder', 'Nom du parcours');

    //reinitialisation des boutons radio
    listeDeTousLesDebouchesSurLaPage.forEach(input => {
        input.checked = "";
    });

    //affichage de l'aperçu
    previewParcours(listeParcours);


});

//fonction pour fermer le live preview
let terminerParcoursBtn = document.getElementById('terminerP');
terminerParcoursBtn.addEventListener('click', function terminerParcours(e) {
    e.preventDefault();
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tparcours');
    //vide le tableau html
    preview.innerHTML = "";
})

//fonction pour afficher la liste des debouchés
let consulterParcoursBtn = document.getElementById('consulterP');
consulterParcoursBtn.addEventListener('click', function consulterParcours(e) {
    e.preventDefault();
    //affichage de l'aperçu
    previewParcours(listeParcours);
})

/*Fin Code Parcours *************************************************************************/


/*Fin Code Notes *************************************************************************/
//definition de la structure Notes
function Note(note, matiere) {
    this.note = note;
    this.matiere = matiere
}

// creation du tableau qui contiendra la liste des Notes
var listeNotes = new Array();

//fonction qui affiche les elements du tableau de Notes dans un tableau HTML du Live Preview
function previewNotes(listeNotes) {
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tnote');

    //vide le tableau html
    preview.innerHTML = "";

    //ajout des cellules d'entete
    let ligneEntete = document.createElement('tr');
    let celluEntete1 = document.createElement('th');
    celluEntete1.innerText = "Matiere";
    let celluEntete2 = document.createElement('th');
    celluEntete2.innerText = "Note";
    let celluEntete3 = document.createElement('th');
    celluEntete3.innerText = "Actions";
    ligneEntete.appendChild(celluEntete1);
    ligneEntete.appendChild(celluEntete2);
    ligneEntete.appendChild(celluEntete3);
    preview.appendChild(ligneEntete);

    //ajout des elements du tableau d'objet
    listeNotes.forEach((note, index) => {
        let ligne = document.createElement('tr');

        let cellule1 = document.createElement('td');
        cellule1.innerText = note.matiere;

        let cellule2 = document.createElement('td');
        cellule2.innerText = note.note;

        let btn1 = document.createElement('button');
        btn1.innerHTML = '+';
        btn1.setAttribute('data-bs-toggle', 'modal');
        btn1.setAttribute('data-bs-target', '#exampleModal2');
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

        btn1.addEventListener('click', function modifierNote(e) {
            e.preventDefault();
            let modalContent = document.getElementById('modalContent2');
            let selectMatiereContent = `<option selected >${listeNotes[index].matiere}</option>`;
            listeMatieres.forEach(matiere => {
                selectMatiereContent += `<option value="${matiere.nomM}">${matiere.nomM}</option>`;
            });
            console.log(selectMatiereContent);
            modalContent.innerHTML =
                `<div class="input-group">
                    <select class="form-select form-select-sm" id="nouveauSelectMatiere" aria-label=".form-select-sm example"
                        id="parcoursE">
                        ${selectMatiereContent}
                    </select>
                        <span class="input-group-text">Note</span>
                        <input type="text" aria-label="note" id="nouveauNote" class="form-control"
                            placeholder="${listeNotes[index].note}">
                </div>`;
            console.log(modalContent);
            let saveModifBtn = document.getElementById('saveModif2');
            saveModifBtn.addEventListener('click', function saveModifNote(e) {
                e.preventDefault();

                let matieresList = document.getElementById('nouveauSelectMatiere');
                let choice = matieresList.selectedIndex;
                let matiere = matieresList.options[choice].value;
                listeNotes[index].matiere = matiere;
                listeNotes[index].note = document.getElementById('nouveauNote').value;
                previewNotes(listeNotes);
            })
        })

        btn2.addEventListener('click', function supprimerNote(e) {
            e.preventDefault();
            listeNotes.splice(index, 1);
            previewNotes(listeNotes);
        })

    })
}

//fonction qui sera utilisee par le bouton ajouter note de la fenetre modale modifiant un etudiant
function previewNotes2(listeNotes) {
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('TnewNotes');

    //vide le tableau html
    preview.innerHTML = "";

    //ajout des cellules d'entete
    let ligneEntete = document.createElement('tr');
    let celluEntete1 = document.createElement('th');
    celluEntete1.innerText = "Matiere";
    let celluEntete2 = document.createElement('th');
    celluEntete2.innerText = "Note";
    let celluEntete3 = document.createElement('th');
    celluEntete3.innerText = "Actions";
    ligneEntete.appendChild(celluEntete1);
    ligneEntete.appendChild(celluEntete2);
    ligneEntete.appendChild(celluEntete3);
    preview.appendChild(ligneEntete);

    //ajout des elements du tableau d'objet
    listeNotes.forEach((note, index) => {
        let ligne = document.createElement('tr');

        let cellule1 = document.createElement('td');
        cellule1.innerText = note.matiere;

        let cellule2 = document.createElement('td');
        cellule2.innerText = note.note;

        let btn2 = document.createElement('button');
        btn2.innerHTML = '-';
        btn2.setAttribute('class', 'action-btn');

        let cellule3 = document.createElement('td');
        cellule3.appendChild(btn2);

        ligne.appendChild(cellule1);
        ligne.appendChild(cellule2);
        ligne.appendChild(cellule3);

        preview.appendChild(ligne);


        btn2.addEventListener('click', function supprimerNote(e) {
            e.preventDefault();
            listeNotes.splice(index, 1);
            // previewNotes(listeNotes);
            previewNotes2(listeNotes);
        })

    })
}

//fonction pour ajouter une nouvelle note
let addNoteBtn = document.getElementById('addNoteBtn');
function ajouterNote(e) {
    e.preventDefault();

    //recuperation des donnees
    let matieresList = document.getElementById('selectMatiere');
    let choice = matieresList.selectedIndex;
    let matiere = matieresList.options[choice].value;
    let inputNote = document.getElementById('note');
    let noteValue = inputNote.value;

    //creation de l'objet note
    let note = new Note(noteValue, matiere);

    //ajout de l'objet crée à la liste des notes (tableau)
    listeNotes.push(note);

    //reinitialisation des inputs
    inputNote.value = "";
    inputNote.setAttribute('placeholder', 'Entrer la note');
    let selectedMatiere = document.getElementById('selectedMatiere');
    selectedMatiere.attributes.selected = "selected";

    //affichage de l'aperçu
    previewNotes(listeNotes);

}
//fonction qui sera utilisee par le bouton ajouter note de la fenetre modale modifiant un etudiant
function ajouterNote2(e) {
    e.preventDefault();

    //recuperation des donnees
    let matieresList = document.getElementById('newSelectMatiere');
    let choice = matieresList.selectedIndex;
    let matiere = matieresList.options[choice].value;
    let inputNote = document.getElementById('newNote');
    let noteValue = inputNote.value;

    //creation de l'objet note
    let note = new Note(noteValue, matiere);

    //ajout de l'objet crée à la liste des notes (tableau)
    listeNotes.push(note);

    //reinitialisation des inputs
    inputNote.value = "";
    inputNote.setAttribute('placeholder', 'Entrer la note');
    let selectedMatiere = document.getElementById('newSelectMatiere');
    selectedMatiere.attributes.selected = "selected";

    //affichage de l'aperçu
    previewNotes2(listeNotes)
}
addNoteBtn.addEventListener('click', ajouterNote);

/*Fin Code Notes *************************************************************************/




/*Debut Code Etudiant **********************************************************************/

//definition de la structure Etudiant
function Etudiant(nomE, prenomE, date, lieuNaissance, sexe, taille, poids, parcours, listeNotes) {
    this.nomE = nomE;
    this.prenomE = prenomE;
    this.date = date;
    this.lieuNaissance = lieuNaissance;
    this.sexe = sexe;
    this.taille = taille;
    this.poids = poids;
    this.parcours = parcours;
    this.listeNotes = listeNotes;
}

// creation du tableau qui contiendra la liste des Etudiants
var listeEtudiants = new Array();

//fonction qui affiche la liste des matieres et des parcours dans le bloc Etudiant
let saveStudentTab = document.getElementById('saveStudent-tab');
saveStudentTab.addEventListener('click', function loadParcoursAndMatieres(e) {
    e.preventDefault();

    let parcoursField = document.getElementById('parcoursE');
    parcoursField.innerHTML = `<option selected disabled id="selectedParcours" >Parcours</option>`;
    listeParcours.forEach(parcours => {
        parcoursField.innerHTML += `<option value="${parcours.nomP}">${parcours.nomP}</option>`
    })

    let matieresField = document.getElementById('selectMatiere');
    matieresField.innerHTML = `<option selected disabled id="selectedMatiere" >Matiere</option>`;
    listeMatieres.forEach(matiere => {
        matieresField.innerHTML += `<option value="${matiere.nomM}">${matiere.nomM}</option>`
    })
})

//fonction qui affiche les elements du tableau d'etudiants dans un tableau HTML
function previewUnEtudiant(listeEtudiants, index) {
    //recupere le tableau en html grace au DOM
    var preview = document.getElementById('Tetudiant');
    //vide le tableau html
    preview.innerHTML = "";
    let previewOfNotes = document.getElementById('Tnote');
    //vide le tableau html
    previewOfNotes.innerHTML = "";

    let ligne1 = document.createElement('tr');
    let ligne1Cell1 = document.createElement('td');
    // ligne1Cell1.setAttribute('colspan', '2');
    ligne1Cell1.innerHTML = "<h6>Information de l'étudiant</h6>";
    ligne1Cell1.setAttribute('class', 'table-center');
    let ligne1Cell2 = document.createElement('td');
    let divBtn = document.createElement('div');
    let btn1 = document.createElement('button');
    btn1.innerHTML = '+';
    btn1.setAttribute('data-bs-toggle', 'modal');
    btn1.setAttribute('data-bs-target', '#exampleModal2');
    btn1.setAttribute('class', 'action-btn');

    let btn2 = document.createElement('button');
    btn2.innerHTML = '-';
    btn2.setAttribute('class', 'action-btn');

    divBtn.appendChild(btn1);
    divBtn.appendChild(btn2);
    ligne1Cell2.appendChild(divBtn);

    ligne1.appendChild(ligne1Cell1);
    ligne1.appendChild(ligne1Cell2);

    let ligne2 = document.createElement('tr');
    let ligne2cell1 = document.createElement('th');
    ligne2cell1.innerText = "Nom :";
    let ligne2cell2 = document.createElement('td');
    ligne2cell2.innerText = `${listeEtudiants[index].nomE}`;
    ligne2.appendChild(ligne2cell1);
    ligne2.appendChild(ligne2cell2);

    let ligne3 = document.createElement('tr');
    let ligne3cell1 = document.createElement('th');
    ligne3cell1.innerText = "Date de Naissance :";
    let ligne3cell2 = document.createElement('td');
    ligne3cell2.innerText = `${listeEtudiants[index].date}`;
    ligne3.appendChild(ligne3cell1);
    ligne3.appendChild(ligne3cell2);

    let ligne4 = document.createElement('tr');
    let ligne4cell1 = document.createElement('th');
    ligne4cell1.innerText = "Lieu de Naissance :";
    let ligne4cell2 = document.createElement('td');
    ligne4cell2.innerText = `${listeEtudiants[index].lieuNaissance}`;
    ligne4.appendChild(ligne4cell1);
    ligne4.appendChild(ligne4cell2);

    let ligne5 = document.createElement('tr');
    let ligne5cell1 = document.createElement('th');
    ligne5cell1.innerText = "Sexe :";
    let ligne5cell2 = document.createElement('td');
    ligne5cell2.innerText = `${listeEtudiants[index].sexe}`;
    ligne5.appendChild(ligne5cell1);
    ligne5.appendChild(ligne5cell2);

    let ligne6 = document.createElement('tr');
    let ligne6cell1 = document.createElement('th');
    ligne6cell1.innerText = "Taille :";
    let ligne6cell2 = document.createElement('td');
    ligne6cell2.innerText = `${listeEtudiants[index].taille}`;
    ligne6.appendChild(ligne6cell1);
    ligne6.appendChild(ligne6cell2);

    let ligne7 = document.createElement('tr');
    let ligne7cell1 = document.createElement('th');
    ligne7cell1.innerText = "Poids :";
    let ligne7cell2 = document.createElement('td');
    ligne7cell2.innerText = `${listeEtudiants[index].poids}`;
    ligne7.appendChild(ligne7cell1);
    ligne7.appendChild(ligne7cell2);

    let ligne8 = document.createElement('tr');
    let ligne8cell2 = document.createElement('td');
    ligne8cell2.setAttribute('colspan', '2');
    //on recupere les notes
    let notelist = document.createElement('ul');
    notelist.innerHTML = "<h5>Liste des notes</h5>";
    listeNotes.forEach(note => {
        notelist.innerHTML += `<li><b>${note.matiere}</b>: ${note.note}</li>`;
    });
    ligne8cell2.appendChild(notelist);
    ligne8.appendChild(ligne8cell2);

    //on ajoute les lignes dans le tableau
    preview.appendChild(ligne1);
    preview.appendChild(ligne2);
    preview.appendChild(ligne3);
    preview.appendChild(ligne4);
    preview.appendChild(ligne5);
    preview.appendChild(ligne6);
    preview.appendChild(ligne7);
    preview.appendChild(ligne8);

    btn1.addEventListener('click', function modifierEtudiant(e) {
        e.preventDefault();


        let modalContent = document.getElementById('modalContent2');
        modalContent.innerHTML =
            `<div class="input-group mb-3">

            <input type="text" aria-label="First name" id="newNomE" class="form-control"
                placeholder="${listeEtudiants[index].nomE}">

            <input type="text" aria-label="Last name" id="newPrenomE" class="form-control"
                placeholder="${listeEtudiants[index].prenomE}">

            <input type="date" aria-label="date" id="newDate" class="form-control" placeholder="${listeEtudiants[index].date}">
        </div>
        <div class="input-group mb-3">

            <input type="text" aria-label="lieuNaissance" id="newLieuNaissance" Class="form-control"
                placeholder="${listeEtudiants[index].lieuNaissance}">

            <input type="text" aria-label="taille" id="newTaille" class="form-control"
                placeholder="${listeEtudiants[index].taille}">

            <input type="text" aria-label="poids" id="newPoids" class="form-control" placeholder="${listeEtudiants[index].poids}">
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <Span class="mx-2">Sexe</Span>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                            id="newHomme" value="Homme">
                        <label class="form-check-label" for="inlineRadio1">Homme</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                            id="newFemme" value="Femme">
                        <label class="form-check-label" for="inlineRadio1">Femme</label>
                    </div>

                </div>
                <div class="col-6">
                    <div class="form-check form-check-inline d-flex justify-content-end ">
                        <label class="form-check-label mx-2" for="inlineRadio1">Parcours: </label>
                        <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                        id="newParcoursE">
                            <option selected disabled>Parcours</option>

                        </select>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <Span class="mb-2">Entrer les notes de l'etudiant</Span>
                <div class="input-group">
                    <select class="form-select form-select-sm" id="newSelectMatiere"
                        aria-label=".form-select-sm example" >
                        <option selected disabled id="newSelectedMatiere">Matiere</option>

                    </select>
                    <span class="input-group-text">Note</span>
                    <input type="text" aria-label="First name" id="newNote" class="form-control"
                        placeholder="Entrer la note">
                    <button class="input-group-text" id="addNewNoteBtn">Ajouter</button>
                </div>
            </div>
            <div class="row mt-4">
                <table id="TnewNotes">
                ..
                </table>
            </div>
        </div>
            `;
        let addNewNoteBtn = document.getElementById('addNewNoteBtn');
        addNewNoteBtn.addEventListener('click', ajouterNote2);
        let parcoursField = document.getElementById('newParcoursE');
        parcoursField.innerHTML = `<option selected disabled id="selectedParcours" >Parcours</option>`;
        listeParcours.forEach(parcours => {
            parcoursField.innerHTML += `<option value="${parcours.nomP}">${parcours.nomP}</option>`
        })

        let matieresField = document.getElementById('newSelectMatiere');
        matieresField.innerHTML = `<option selected disabled id="selectedMatiere" >Matiere</option>`;
        listeMatieres.forEach(matiere => {
            matieresField.innerHTML += `<option value="${matiere.nomM}">${matiere.nomM}</option>`
        })

        let saveModifBtn = document.getElementById('saveModif2');
        saveModifBtn.addEventListener('click', function saveModifEtudiant(e) {
            e.preventDefault();
            listeEtudiants[index].nomE = document.getElementById('newNomE').value;
            listeEtudiants[index].prenomE = document.getElementById('newPrenomE').value;
            listeEtudiants[index].date = document.getElementById('newDate').value;
            listeEtudiants[index].lieuNaissance = document.getElementById('newLieuNaissance').value;
            listeEtudiants[index].taille = document.getElementById('newTaille').value;
            listeEtudiants[index].poids = document.getElementById('newPoids').value;

            let sexe;
            if (document.getElementById('newHomme').checked) {
                listeEtudiants[index].sexe = document.getElementById('newHomme').value;
            }
            if (document.getElementById('newFemme').checked) {
                listeEtudiants[index].sexe = document.getElementById('newFemme').value;
            }

            let parcoursList = document.getElementById('newParcoursE');
            let choice = parcoursList.selectedIndex;
            listeEtudiants[index].parcours = parcoursList.options[choice].value;

            previewUnEtudiant(listeEtudiants, index);
        })
    });

    btn2.addEventListener('click', function supprimerEtudiant(e) {
        e.preventDefault();
        listeEtudiants.splice(index, 1);
        preview.innerHTML = "";
    })
};


//fonction pour ajouter un etudiant
let addEtudiantBtn = document.getElementById('addEbtn');
addEtudiantBtn.addEventListener('click', function ajouterEtudiant(e) {
    e.preventDefault();

    //recuperation des donnees
    let inputNomEtudiant = document.getElementById('nomEtu');
    let nomEtudiant = inputNomEtudiant.value;

    let inputPrenomEtudiant = document.getElementById('prenomE');
    let prenomEtudiant = inputPrenomEtudiant.value;

    let inputDateNaissance = document.getElementById('date');
    let dateNaissance = inputDateNaissance.value;

    let inputLieuNaissance = document.getElementById('lieuNaissance');
    let lieuNaissance = inputLieuNaissance.value;

    let inputTailleEtudiant = document.getElementById('taille');
    let taille = inputTailleEtudiant.value;

    let inputPoidsEtudiant = document.getElementById('poids');
    let poids = inputPoidsEtudiant.value;

    let sexe;
    if (document.getElementById('Homme').checked) {
        sexe = document.getElementById('Homme').value;
    }
    if (document.getElementById('Femme').checked) {
        sexe = document.getElementById('Femme').value;
    }

    let parcoursList = document.getElementById('parcoursE');
    let choice = parcoursList.selectedIndex;
    let parcours = parcoursList.options[choice].value;

    //creation de l'objet Etudiant
    let etudiant = new Etudiant(nomEtudiant, prenomEtudiant, dateNaissance, lieuNaissance, sexe, taille, poids, parcours, listeNotes);

    //ajout de l'objet crée à la liste des debouches (tableau)
    listeEtudiants.push(etudiant);
    let index = listeEtudiants.indexOf(etudiant);

    //reinitialisation des inputs
    inputNomEtudiant.value = "";
    inputNomEtudiant.setAttribute('placeholder', "Nom de l'étudiant");
    inputPrenomEtudiant.value = "";
    inputPrenomEtudiant.setAttribute('placeholder', "Prenom de l'étudiant");
    inputDateNaissance.value = "";
    inputDateNaissance.setAttribute('placeholder', 'date de Naissance')
    inputLieuNaissance.value = "";
    inputLieuNaissance.setAttribute('placeholder', "Lieu de Naissance");
    inputTailleEtudiant.value = "";
    inputTailleEtudiant.setAttribute('placeholder', "Taille");
    inputPoidsEtudiant.value = "";
    inputPoidsEtudiant.setAttribute('placeholder', 'poids');
    document.getElementById('Homme').checked = "";
    document.getElementById('Femme').checked = "";
    document.getElementById('selectedParcours').selected = 'selected';

    //affichage de l'aperçu
    previewUnEtudiant(listeEtudiants, index);
});

//fonction qui affiche la liste des etudiants
let studentListTab = document.getElementById('studentList-tab');
studentListTab.addEventListener('click', previewListeEtudiants)
function previewListeEtudiants(e) {
    e.preventDefault();
    let listeEtudiantsContent = document.getElementById('listeEtudiantsContent');
    listeEtudiantsContent.innerHTML = "";
    listeEtudiants.forEach((etudiant, index) => {
        let ligne = document.createElement('tr');
        let cellule1 = document.createElement('td');
        cellule1.innerText = index + 1;
        let cellule2 = document.createElement('td');
        cellule2.innerText = etudiant.nomE;
        let cellule3 = document.createElement('td');
        cellule3.innerText = etudiant.prenomE;
        let cellule4 = document.createElement('td');
        cellule4.innerText = etudiant.date;

        let cellule5 = document.createElement('td');
        let btn1 = document.createElement('button');
        btn1.innerHTML = 'details';
        btn1.setAttribute('data-bs-toggle', 'modal');
        btn1.setAttribute('data-bs-target', '#exampleModal3');
        btn1.setAttribute('class', 'action-btn2');
        let btn2 = document.createElement('button');
        btn2.innerHTML = '+';
        btn2.setAttribute('data-bs-toggle', 'modal');
        btn2.setAttribute('data-bs-target', '#exampleModal4');
        btn2.setAttribute('class', 'action-btn');
        let btn3 = document.createElement('button');
        btn3.innerHTML = '-';
        btn3.setAttribute('class', 'action-btn');

        cellule5.appendChild(btn1);
        cellule5.appendChild(btn2);
        cellule5.appendChild(btn3);

        ligne.appendChild(cellule1);
        ligne.appendChild(cellule2);
        ligne.appendChild(cellule3);
        ligne.appendChild(cellule4);
        ligne.appendChild(cellule5);

        listeEtudiantsContent.appendChild(ligne);

        btn1.addEventListener('click', function afficherDetailsEtudiant(e) {
            e.preventDefault();

            //recupere le contenu du modal grace au DOM
            var preview = document.getElementById('modalContent3');
            //vide le tableau html
            preview.innerHTML = "";

            let ligne1 = document.createElement('tr');
            let ligne1Cell1 = document.createElement('td');
            ligne1Cell1.innerHTML = "<h6>Information de l'étudiant</h6>";
            // ligne1Cell1.setAttribute('class', 'table-center');
            ligne1Cell1.setAttribute('colspan', '2');
            ligne1.appendChild(ligne1Cell1);

            let ligne2 = document.createElement('tr');
            let ligne2cell1 = document.createElement('th');
            ligne2cell1.innerText = "Nom :";
            let ligne2cell2 = document.createElement('td');
            ligne2cell2.innerText = `${listeEtudiants[index].nomE}`;
            ligne2.appendChild(ligne2cell1);
            ligne2.appendChild(ligne2cell2);

            let ligne3 = document.createElement('tr');
            let ligne3cell1 = document.createElement('th');
            ligne3cell1.innerText = "Date de Naissance :";
            let ligne3cell2 = document.createElement('td');
            ligne3cell2.innerText = `${listeEtudiants[index].date}`;
            ligne3.appendChild(ligne3cell1);
            ligne3.appendChild(ligne3cell2);

            let ligne4 = document.createElement('tr');
            let ligne4cell1 = document.createElement('th');
            ligne4cell1.innerText = "Lieu de Naissance :";
            let ligne4cell2 = document.createElement('td');
            ligne4cell2.innerText = `${listeEtudiants[index].lieuNaissance}`;
            ligne4.appendChild(ligne4cell1);
            ligne4.appendChild(ligne4cell2);

            let ligne5 = document.createElement('tr');
            let ligne5cell1 = document.createElement('th');
            ligne5cell1.innerText = "Sexe :";
            let ligne5cell2 = document.createElement('td');
            ligne5cell2.innerText = `${listeEtudiants[index].sexe}`;
            ligne5.appendChild(ligne5cell1);
            ligne5.appendChild(ligne5cell2);

            let ligne6 = document.createElement('tr');
            let ligne6cell1 = document.createElement('th');
            ligne6cell1.innerText = "Taille :";
            let ligne6cell2 = document.createElement('td');
            ligne6cell2.innerText = `${listeEtudiants[index].taille}`;
            ligne6.appendChild(ligne6cell1);
            ligne6.appendChild(ligne6cell2);

            let ligne7 = document.createElement('tr');
            let ligne7cell1 = document.createElement('th');
            ligne7cell1.innerText = "Poids :";
            let ligne7cell2 = document.createElement('td');
            ligne7cell2.innerText = `${listeEtudiants[index].poids}`;
            ligne7.appendChild(ligne7cell1);
            ligne7.appendChild(ligne7cell2);

            let ligne8 = document.createElement('tr');
            let ligne8cell2 = document.createElement('td');
            ligne8cell2.setAttribute('colspan', '2');
            //on recupere les notes
            let notelist = document.createElement('ul');
            notelist.innerHTML = "<h5>Liste des notes</h5>";
            listeNotes.forEach(note => {
                notelist.innerHTML += `<li><b>${note.matiere}</b>: ${note.note}</li>`;
            });
            ligne8cell2.appendChild(notelist);
            ligne8.appendChild(ligne8cell2);

            //on ajoute les lignes dans le tableau
            preview.appendChild(ligne1);
            preview.appendChild(ligne2);
            preview.appendChild(ligne3);
            preview.appendChild(ligne4);
            preview.appendChild(ligne5);
            preview.appendChild(ligne6);
            preview.appendChild(ligne7);
            preview.appendChild(ligne8);
        })

        btn2.addEventListener('click', function modifierEtudiant(e) {
            e.preventDefault();


            let modalContent = document.getElementById('modalContent4');
            modalContent.innerHTML =
                `<div class="input-group mb-3">
    
                <input type="text" aria-label="First name" id="newNomE" class="form-control"
                    placeholder="${listeEtudiants[index].nomE}">
    
                <input type="text" aria-label="Last name" id="newPrenomE" class="form-control"
                    placeholder="${listeEtudiants[index].prenomE}">
    
                <input type="date" aria-label="date" id="newDate" class="form-control" placeholder="${listeEtudiants[index].date}">
            </div>
            <div class="input-group mb-3">
    
                <input type="text" aria-label="lieuNaissance" id="newLieuNaissance" Class="form-control"
                    placeholder="${listeEtudiants[index].lieuNaissance}">
    
                <input type="text" aria-label="taille" id="newTaille" class="form-control"
                    placeholder="${listeEtudiants[index].taille}">
    
                <input type="text" aria-label="poids" id="newPoids" class="form-control" placeholder="${listeEtudiants[index].poids}">
            </div>
    
            <div class="container-fluid">
                <div class="row">
                    <div class="col-6">
                        <Span class="mx-2">Sexe</Span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                id="newHomme" value="Homme">
                            <label class="form-check-label" for="inlineRadio1">Homme</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                id="newFemme" value="Femme">
                            <label class="form-check-label" for="inlineRadio1">Femme</label>
                        </div>
    
                    </div>
                    <div class="col-6">
                        <div class="form-check form-check-inline d-flex justify-content-end ">
                            <label class="form-check-label mx-2" for="inlineRadio1">Parcours: </label>
                            <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                            id="newParcoursE">
                                <option selected disabled>Parcours</option>
    
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <Span class="mb-2">Entrer les notes de l'etudiant</Span>
                    <div class="input-group">
                        <select class="form-select form-select-sm" id="newSelectMatiere"
                            aria-label=".form-select-sm example" >
                            <option selected disabled id="newSelectedMatiere">Matiere</option>
    
                        </select>
                        <span class="input-group-text">Note</span>
                        <input type="text" aria-label="First name" id="newNote" class="form-control"
                            placeholder="Entrer la note">
                        <button class="input-group-text" id="addNewNoteBtn">Ajouter</button>
                    </div>
                </div>
                <div class="row mt-4">
                    <table id="TnewNotes">
                    ..
                    </table>
                </div>
            </div>
                `;
            let addNewNoteBtn = document.getElementById('addNewNoteBtn');
            addNewNoteBtn.addEventListener('click', ajouterNote2);
            let parcoursField = document.getElementById('newParcoursE');
            parcoursField.innerHTML = `<option selected disabled id="selectedParcours" >Parcours</option>`;
            listeParcours.forEach(parcours => {
                parcoursField.innerHTML += `<option value="${parcours.nomP}">${parcours.nomP}</option>`
            })

            let matieresField = document.getElementById('newSelectMatiere');
            matieresField.innerHTML = `<option selected disabled id="selectedMatiere" >Matiere</option>`;
            listeMatieres.forEach(matiere => {
                matieresField.innerHTML += `<option value="${matiere.nomM}">${matiere.nomM}</option>`
            })

            let saveModifBtn = document.getElementById('saveModif4');
            saveModifBtn.addEventListener('click', function saveModifEtudiant(e) {
                e.preventDefault();
                listeEtudiants[index].nomE = document.getElementById('newNomE').value;
                listeEtudiants[index].prenomE = document.getElementById('newPrenomE').value;
                listeEtudiants[index].date = document.getElementById('newDate').value;
                listeEtudiants[index].lieuNaissance = document.getElementById('newLieuNaissance').value;
                listeEtudiants[index].taille = document.getElementById('newTaille').value;
                listeEtudiants[index].poids = document.getElementById('newPoids').value;

                if (document.getElementById('newHomme').checked) {
                    listeEtudiants[index].sexe = document.getElementById('newHomme').value;
                }
                if (document.getElementById('newFemme').checked) {
                    listeEtudiants[index].sexe = document.getElementById('newFemme').value;
                }

                let parcoursList = document.getElementById('newParcoursE');
                let choice = parcoursList.selectedIndex;
                listeEtudiants[index].parcours = parcoursList.options[choice].value;
                previewListeEtudiants(e);
            })
        })
        btn3.addEventListener('click', function supprimerEtudiant(e) {
            e.preventDefault();
            listeEtudiants.splice(index, 1);
            previewListeEtudiants(e);
        })
    })
}

/*Fin Code Etudiant **********************************************************************/
