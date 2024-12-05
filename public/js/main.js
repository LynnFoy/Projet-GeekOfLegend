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

