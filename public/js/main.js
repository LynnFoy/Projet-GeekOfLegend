//Classe pour les Boss
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


