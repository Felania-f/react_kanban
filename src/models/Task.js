export const TaskStatus = {
  TODO: "A faire",
  IN_PROGRESS: "En cours",
  DONE: "Fini",
};

export default class Task {
  constructor(titre, auteur, attribution, date_debut, date_fin, status, id = null) {
    this.titre = titre;
    this.auteur = auteur;
    this.attribution = attribution;
    this.date_debut = date_debut;
    this.date_fin = date_fin;
    this.status = status || "TODO";
    this.id = id || new Date().getTime().toString();
  }

  getId() {
    return this.id;
  }

  getStatus() {
    return this.status;
  }
  setStatus(status) {
    this.status = status;
  }
  getTitre() {
    return this.titre;
  }
  setTitre(titre) {
    this.titre = titre;
  }
  getAuteur() {
    return this.auteur;
  }
  setAuteur(auteur) {
    this.auteur = auteur;
  }
  getAttribution() {
    return this.attribution;
  }
  setAttribution(attribution) {
    this.attribution = attribution;
  }
  getDateDebut() {
    return this.date_debut;
  }
  setDateDebut(date_debut) {
    this.date_debut = date_debut;
  }
  getDateFin() {
    return this.date_fin;
  }
  setDateFin(date_fin) {
    this.date_fin = date_fin;
  }
  toString() {
    return `Titre: ${this.titre}, Auteur: ${this.auteur}, Attribution: ${this.attribution}, Date de début: ${this.date_debut}, Date de fin: ${this.date_fin}, Status: ${this.status}, ID: ${this.id}`;
  }

  toJSON() {
    return {
      id: this.id,
      titre: this.titre,
      auteur: this.auteur,
      attribution: this.attribution,
      date_debut: this.date_debut,
      date_fin: this.date_fin,
      status: this.status,
    };
  }

  static fromJSON(json) {
    return new Task(
      json.titre,
      json.auteur,
      json.attribution,
      json.date_debut,
      json.date_fin,
      json.status,
      json.id
    );
  }
}