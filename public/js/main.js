// Classe pour les Boss
class Boss {
  constructor(nom, attaque, vie) {
      this.nom = nom;
      this.attaque = attaque;
      this.vie = vie;
      this.vieMax = vie;
  }

  estEnVie() {
      return this.vie > 0;
  }

  poserEnigme() {
      const enigmes = [
          { question: "Dans quel jeu de rôle peut-on jouer un personnage nommé Geralt de Riv ?", reponse: "The Witcher" },
          { question: "Quel est le nom du monde dans 'The Elder Scrolls V: Skyrim' ?", reponse: "Tamriel" },
          { question: "Dans quel RPG célèbre incarne-t-on un personnage nommé Cloud Strife ?", reponse: "Final Fantasy VII" },
          { question: "Qui est le créateur de la série 'Final Fantasy' ?", reponse: "Hironobu Sakaguchi" },
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

// Classe de base pour les Héros
class Hero {
  constructor(nom, attaque, vie, posture = "attaque") {
      this.nom = nom;
      this.attaque = attaque;
      this.vie = vie;
      this.vieMax = vie;
      this.posture = posture;
  }

  estEnVie() {
      return this.vie > 0;
  }

  attaquer(boss) {
      if (!this.estEnVie()) return 0;

      let degats = this.attaque;
      if (this.posture === "attaque") degats *= 1.2;

      boss.vie -= degats;
      console.log(`${this.nom} attaque ${boss.nom} et inflige ${degats.toFixed(2)} dégâts.`);
      return degats;
  }

  subirDegats(dmg) {
      if (!this.estEnVie()) return 0;

      const dommages = this.posture === "défense" ? dmg / 2 : dmg;
      this.vie -= dommages;
      console.log(`${this.nom} subit ${dommages.toFixed(2)} dégâts.`);
      return dommages;
  }

  changerPosture() {
      const nouvellePosture = prompt(`Posture pour ${this.nom} (attaque/défense) ?`).toLowerCase();
      this.posture = nouvellePosture === "défense" ? "défense" : "attaque";
  }
}

// Sous-classes pour les types de héros
class Guerrier extends Hero {
  constructor(nom, attaque, vie, posture) {
      super(nom, attaque, vie, posture);
      this.rage = 0;
  }

  attaquer(boss) {
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
  constructor(nom, attaque, vie, posture) {
      super(nom, attaque, vie, posture);
      this.mana = 7;
  }

  attaquer(boss) {
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
      if (this.fleches < 2) {
          console.log(`${this.nom} récupère 6 flèches.`);
          this.fleches = 6;
          return 0;
      }

      this.fleches -= 2;
      return super.attaquer(boss);
  }
}

// Fonction pour répartir les points entre les héros
function repartirPoints(pointsVieTotal, pointsAttaqueTotal) {
  let vieRestante = pointsVieTotal;
  let attaqueRestante = pointsAttaqueTotal;

  return (nom, type) => {
      const vie = parseInt(prompt(`Attribuez les points de vie pour ${nom} (${vieRestante} restants):`));
      vieRestante -= vie;

      const attaque = parseInt(prompt(`Attribuez les points d'attaque pour ${nom} (${attaqueRestante} restants):`));
      attaqueRestante -= attaque;

      const posture = prompt(`Choisissez la posture initiale de ${nom} (attaque/défense):`).toLowerCase();

      return new type(nom, attaque, vie, posture);
  };
}

// Fonction pour créer les héros
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

