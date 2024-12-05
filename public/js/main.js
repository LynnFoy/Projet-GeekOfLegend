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


