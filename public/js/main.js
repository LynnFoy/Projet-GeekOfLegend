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

