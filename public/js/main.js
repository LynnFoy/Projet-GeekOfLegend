//Classe pour les Boss
class Boss {
  constructor(nom, attaque, vie, element) {
    this.nom = nom;
    this.attaque = attaque;
    this.vie = vie;
    this.vieMax = vie;
    this.element = element || ["Feu", "Terre", "Eau"][Math.floor(Math.random() * 3)]; // Attribut élémentaire aléatoire
  }

  estEnVie() {
    return this.vie > 0;
  }

  poserEnigme() {
    const enigmes = [
      { question: "Dans quel jeu de rôle peut-on jouer un personnage nommé Geralt de Riv ?", reponse: "The Witcher" },
      { question: "Quel est le nom du monde dans 'The Elder Scrolls V: Skyrim' ?", reponse: "Tamriel" },
      { question: "Dans quel RPG célèbre incarne-t-on un personnage nommé Cloud Strife ?", reponse: "Final Fantasy VII" },
      { question: "Dans quel RPG se déroule l'histoire de l'Anneau Unique et de la Terre du Milieu ?", reponse: "Le Seigneur des Anneaux" },
    ];

    const enigme = enigmes[Math.floor(Math.random() * enigmes.length)];
    let tentative = 0;
    let reponseCorrecte = false;

    while (tentative < 3 && !reponseCorrecte) {
      const reponse = prompt(enigme.question);
      if (reponse.toLowerCase() === enigme.reponse.toLowerCase()) {
        reponseCorrecte = true;
        console.log("Bravo ! Vous avez répondu correctement !");
        return true;
      } else {
        tentative++;
        console.log("Mauvaise réponse. Essayez encore.");
      }
    }

    console.log("Toutes les tentatives ont échoué. Vous avez perdu !");
    return false;
  }
}

//Classe de base pour les Héros
class Hero {
  constructor(nom, attaque, vie, posture = "attaque") {
    this.nom = nom;
    this.attaque = attaque;
    this.vie = vie;
    this.vieMax = vie;
    this.posture = posture;
    this.peutJouer = true;
  }

  estEnVie() {
    return this.vie > 0;
  }

  attaquer(boss) {
    if (!this.estEnVie() || this.posture === "défense" || !this.peutJouer) {
      return 0; 
    }

    let degats = this.attaque;
    if (this.posture === "attaque") degats *= 1.2;

//Si le Mage a un élément, on applique l'élément contre le boss
    if (this instanceof Mage) {
      degats = this.applyElementalBonus(degats, boss);
    }

//Attaque critique de l'archer
    if (this instanceof Archer && Math.random() < 0.25) {
      degats *= 1.5;
      console.log(`${this.nom} inflige un coup critique !`);
    }

    boss.vie -= degats;
    console.log(`${this.nom} attaque ${boss.nom} et inflige ${degats.toFixed(2)} dégâts.`);
    return degats;
  }

//Appliquer un bonus de dégâts élémentaire si l'élément du Mage domine celui du boss
  applyElementalBonus(degats, boss) {
    const elementalDominance = {
      "Feu": "Terre",
      "Terre": "Eau",
      "Eau": "Feu",
    };

    if (elementalDominance[this.element] === boss.element) {
      degats *= 1.3; 
      console.log(`${this.nom} utilise son élément (${this.element}) et inflige des dégâts supplémentaires.`);
    }
    return degats;
  }

  subirDegats(dmg) {
    if (!this.estEnVie()) return 0;

    const dommages = this.posture === "défense" ? dmg / 2 : dmg;
    this.vie -= dommages;
    console.log(`${this.nom} subit ${dommages.toFixed(2)} dégâts.`);

    if (this.vie <= 0) {
      this.peutJouer = false;
      alert(`${this.nom} est mort et ne peut plus jouer.`);
      console.log(`${this.nom} est mort et ne peut plus jouer.`);
    }

    return dommages;
  }

  changerPosture() {
    if (!this.peutJouer) return;

    const nouvellePosture = prompt(`Posture pour ${this.nom} (attaque/défense) ?`).toLowerCase();
    if (nouvellePosture === "défense" || nouvellePosture === "attaque") {
      this.posture = nouvellePosture;
      alert(`${this.nom} change de posture en ${this.posture}.`);
    } else {
      alert("Posture invalide. Le héros reste en attaque.");
    }
  }
}

//Sous-classes pour les types de héros
class Guerrier extends Hero {
  constructor(nom, attaque, vie, posture) {
    super(nom, attaque, vie, posture);
    this.rage = 0;
  }

  attaquer(boss) {
    if (this.posture === "défense" || !this.peutJouer) return 0;

    let degats = super.attaquer(boss);
    this.rage++;
    if (this.rage >= 4) {
      degats *= 1.25;
      boss.vie -= degats - this.attaque;
      this.rage = 0;
      console.log(`${this.nom} utilise sa rage et inflige des dégâts bonus.`);
    }
    return degats;
  }
}

class Mage extends Hero {
  constructor(nom, attaque, vie, posture, element) {
    super(nom, attaque, vie, posture);
    this.mana = 7;
    this.element = element || "Feu"; 
  }

  attaquer(boss) {
    if (this.posture === "défense" || !this.peutJouer) return 0;

    if (this.mana < 2) {
      console.log(`${this.nom} récupère 7 points de mana.`);
      this.mana = 7;
      return 0;
    }

    this.mana -= 2;
    return super.attaquer(boss);
  }
}

class Archer extends Hero {
  constructor(nom, attaque, vie, posture) {
    super(nom, attaque, vie, posture);
    this.fleches = 6;
  }

  attaquer(boss) {
    if (this.posture === "défense" || !this.peutJouer) return 0;

    if (this.fleches < 2) {
      console.log(`${this.nom} récupère 6 flèches.`);
      this.fleches = 6;
      return 0;
    }

    this.fleches -= 2;
    return super.attaquer(boss);
  }
}

//Fonction pour répartir les points entre les héros
function repartirPoints(pointsVieTotal, pointsAttaqueTotal) {
  let vieRestante = pointsVieTotal;
  let attaqueRestante = pointsAttaqueTotal;

  return (nom, type) => {
    let vie;
    let attaque;

//Demander les points de vie en respectant la limite de 100
    do {
      vie = parseInt(prompt(`Attribuez les points de vie pour ${nom} (${vieRestante} restants, maximum 100) :`));
      if (vie < 0 || vie > 100 || vie > vieRestante) {
        alert("Les points de vie doivent être entre 0 et 100 et ne peuvent pas dépasser les points restants.");
      } else if (vie > 100) {
        alert("Les points de vie ne peuvent pas dépasser 100 !");
      }
    } while (vie < 0 || vie > 100 || vie > vieRestante);
    vieRestante -= vie;

//Demander les points d'attaque en respectant la limite de 50
    do {
      attaque = parseInt(prompt(`Attribuez les points d'attaque pour ${nom} (${attaqueRestante} restants, maximum 50) :`));
      if (attaque < 0 || attaque > 50 || attaque > attaqueRestante) {
        alert("Les points d'attaque doivent être entre 0 et 50 et ne peuvent pas dépasser les points restants.");
      } else if (attaque > 50) {
        alert("Les points d'attaque ne peuvent pas dépasser 50 !");
      }
    } while (attaque < 0 || attaque > 50 || attaque > attaqueRestante);
    attaqueRestante -= attaque;

    const posture = prompt(`Choisissez la posture initiale de ${nom} (attaque/défense):`).toLowerCase();

    return new type(nom, attaque, vie, posture);
  };
}

//Fonction pour créer les héros
function creerHeros() {
  const pointsVieTotal = 150;
  const pointsAttaqueTotal = 120;

  console.log("Vous devez répartir les points de vie et d'attaque entre les trois héros.");
  const assignerPoints = repartirPoints(pointsVieTotal, pointsAttaqueTotal);

  const heros = [
    { type: Guerrier, role: "Guerrier" },
    { type: Mage, role: "Mage" },
    { type: Archer, role: "Archer" }
  ].map(({ type, role }) => {
    const nom = prompt(`Choisissez un nom pour le ${role}:`);
    return assignerPoints(nom, type);
  });

  return heros;
}

//Liste des boss
const bossList = [
  new Boss("Lilith", 20, 200),
  new Boss("Sauron", 25, 250),
  new Boss("Chronos", 30, 150),
];

//Jeu principal
function jouer() {
  const heros = creerHeros();
  const boss = bossList[Math.floor(Math.random() * bossList.length)];

  console.log(`Le boss est ${boss.nom} avec ${boss.vie} points de vie !`);

  while (heros.some(h => h.estEnVie() && h.peutJouer) && boss.estEnVie()) {
//Tour des héros
    for (const hero of heros) {
      if (hero.estEnVie() && hero.peutJouer) {
        hero.attaquer(boss);
      }
    }

    if (boss.vie <= 0) {
      console.log(`Vous avez vaincu ${boss.nom} ! Félicitations !`);
      alert(`Vous avez vaincu ${boss.nom} ! Félicitations !`);
      heros.forEach(hero => console.log(`${hero.nom} a gagné 10 points d'expérience.`));
      return;
    }

//Boss pose une énigme si ses points de vie sont en dessous de 20%
    if (boss.vie <= boss.vieMax * 0.2) {
      console.log(`${boss.nom} est affaibli ! Il pose une énigme.`);
      const victoire = boss.poserEnigme();
      if (!victoire) {
        console.log("Tous les héros sont morts. Vous avez perdu !");
        alert("Tous les héros sont morts. Vous avez perdu !");
        return;
      }
    }

//Tour du boss
    const cibles = heros.filter(h => h.estEnVie() && h.peutJouer);
    const cible = cibles[Math.floor(Math.random() * cibles.length)];
    cible.subirDegats(boss.attaque);

//Vérification de l'état
    console.log("\n--- État des héros ---");
    for (const hero of heros) {
      console.log(`${hero.nom}: ${hero.vie}/${hero.vieMax} PV`);
    }
    console.log(`${boss.nom}: ${boss.vie}/${boss.vieMax} PV`);

//Affichage dans une alerte des points de vie restants
    alert(`État des héros : \n${heros.map(hero => `${hero.nom}: ${hero.vie} PV`).join("\n")}\n\n${boss.nom}: ${boss.vie} PV`);

//Changement de posture
    for (const hero of heros) {
      if (hero.estEnVie() && hero.peutJouer) {
        hero.changerPosture();
      }
    }

//Vérifier si tous les héros sont morts et que le boss a gagné
    if (!heros.some(h => h.estEnVie())) {
      console.log("Perdu ! Vous ne pouvez pas battre un dieu ! HAHAHAHAHA");
      alert("Perdu! Vous ne pouvez pas battre un dieu ! HAHAHAHAHA");
      return;
    }
  }

  console.log("Tous les héros sont morts. Vous avez perdu !");
  alert("Tous les héros sont morts. Vous avez perdu !");
}

//Démarrer le jeu
jouer();




