// Liste patients
const patients = [
  { nom: "Marcus", maladie: "mal indenté", argent: 100, poche: "vide", etatSante: "malade" },
  { nom: "Optimus", maladie: "unsave", argent: 200, poche: "vide", etatSante: "malade" },
  { nom: "Sangoku", maladie: "404", argent: 80, poche: "vide", etatSante: "malade" },
  { nom: "DarthVader", maladie: "azmatique", argent: 110, poche: "vide", etatSante: "malade" },
  { nom: "Semicolon", maladie: "syntaxError", argent: 60, poche: "vide", etatSante: "malade" }
];

//Docteur/cabinet
const docteur = {
  nom: "Debugger",
  argent: 0,
  cabinet: ["chat"], 
  consultationPrix: 50,
  diagnostiques: {
    "mal indenté": "ctrl+maj+f",
    "unsave": "saveOnFocusChange",
    "404": "CheckLinkRelation",
    "azmatique": "Ventoline",
    "syntaxError": "f12+doc"
  },

  accueillirPatient(patient) {
    console.log(`${patient.nom} entre dans le cabinet.`);
    this.cabinet.push(patient);
    miauler(); 
  },

  diagnostiquer(patient) {
    const traitement = this.diagnostiques[patient.maladie];
    console.log(`${patient.nom} est diagnostiqué avec "${patient.maladie}". Traitement prescrit : ${traitement}`);
    patient.poche = traitement;
  },

  facturer(patient) {
    console.log(`Facturation de ${this.consultationPrix}€ pour ${patient.nom}.`);
    if (patient.argent >= this.consultationPrix) {
      patient.argent -= this.consultationPrix;
      this.argent += this.consultationPrix;
      console.log(`${patient.nom} a payé. Il lui reste ${patient.argent}€.`);
    } else {
      console.log(`${patient.nom} n'a pas assez d'argent pour payer la consultation.`);
    }
  },

  libererPatient(patient) {
    console.log(`${patient.nom} quitte le cabinet.`);
    this.cabinet.pop();
    miauler(); 
  }
};

//Pharmacie
const pharmacie = {
  traitements: {
    "ctrl+maj+f": 60,
    "saveOnFocusChange": 100,
    "CheckLinkRelation": 35,
    "Ventoline": 40,
    "f12+doc": 20
  },

  accueillirPatient(patient) {
    console.log(`Bienvenue à la pharmacie, ${patient.nom}.`);
  },

  vendreMedicament(patient) {
    const prix = this.traitements[patient.poche];
    if (patient.argent >= prix) {
      patient.argent -= prix;
      patient.etatSante = "guéri";
      console.log(`${patient.nom} a acheté ${patient.poche} pour ${prix}€. Il est maintenant guéri.`);
      return true;
    } else {
      console.log(`${patient.nom} n'a pas assez d'argent pour acheter ${patient.poche}.`);
      return false;
    }
  }
};

//Cimetière
const cimetiere = {
  decedes: [],
  accueillir(patient) {
    console.log(`Triste nouvelle : ${patient.nom} est décédé faute de traitement.`);
    this.decedes.push(patient);
  }
};

//Fonction miaulement
function miauler() {
  console.log("%cLe chat miaule...", "color: blue;");
}

//Début
patients.forEach(patient => {
  console.log(`\n--- Début du parcours pour ${patient.nom} ---`);

//Etape 1 => Consultation
console.log(`${patient.nom} se déplace vers le cabinet du docteur.`);
docteur.accueillirPatient(patient);
docteur.diagnostiquer(patient);
docteur.facturer(patient);
docteur.libererPatient(patient);

//Etape 2 => Pharmacie
console.log(`${patient.nom} se déplace vers la pharmacie.`);
pharmacie.accueillirPatient(patient);
if (!pharmacie.vendreMedicament(patient)) {

//Etape 3 => Cimetière
cimetiere.accueillir(patient);
}

console.log(`--- Fin du parcours pour ${patient.nom} ---\n`);
});

//Résumé
console.log("--- Résumé ---");
console.log(`Patients décédés : %c${cimetiere.decedes.map(p => p.nom).join(", ") || "Aucun"}`, "color: red;");
console.log(`Patients guéris : %c${patients.filter(p => p.etatSante === "guéri").map(p => p.nom).join(", ")}`, "color: green;");
