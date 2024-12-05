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
  }


