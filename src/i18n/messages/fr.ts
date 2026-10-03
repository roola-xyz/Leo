import type { LeoMessages } from "./en";

const fr: LeoMessages = {
  "menu.account": "Compte",
  "menu.appearance": "Apparence",
  "menu.language": "Langue",
  "menu.manageAccount": "Gérer votre compte Roola",
  "menu.signOut": "Se déconnecter",
  "menu.back": "Retour",
  "menu.close": "Fermer",
  "menu.managedBy": "Géré par {organisation}",
  "menu.privacy": "Politique de confidentialité",
  "menu.terms": "Conditions d’utilisation",

  "theme.system": "Comme le système",
  "theme.light": "Clair",
  "theme.dark": "Sombre",

  "apps.label": "Applications Roola",
  "apps.loading": "Chargement…",
  "apps.favourites": "Vos favoris",
  "apps.edit": "Modifier les favoris",
  "apps.done": "Terminé",
  "apps.add": "Ajouter {app} aux favoris",
  "apps.remove": "Retirer {app} des favoris",
  "apps.reorder": "Faites glisser une tuile pour réordonner, ou utilisez les flèches.",

  "report.done": "Merci",
  "report.note": "Autre chose ? (facultatif)",
  "report.submit": "Signaler",
  "report.failed": "L’envoi a échoué. Veuillez réessayer.",
  "report.close": "Fermer",
  "report.ok": "Terminé",
  "report.loading": "Chargement…",
  "report.cancel": "Annuler",

  "verification.title": "Vérification d’identité demandée",
  "verification.body": "<b>{agent}</b>, de l’assistance Roola, vous demande de confirmer que c’est bien vous.",
  "verification.reason": "Motif indiqué",
  "verification.challenge": "L’agent doit vous lire ce numéro",
  "verification.mismatch": "S’il ne correspond pas à ce qu’on vous dit, appuyez sur Refuser.",
  "verification.expires": "Expire dans {seconds} s",
  "verification.deny": "Refuser",
  "verification.approve": "C’est moi",

  "waiting.joined": "Vous êtes sur la liste",
  "waiting.joinedBody":
    "Nous écrirons à <strong>{email}</strong> le jour où {name} ouvrira. Rien d’autre, et rien avant.",
  "waiting.closed": "{name} n’est pas encore ouvert",
  "waiting.tagline": "Laissez votre adresse et nous vous préviendrons dès que ce sera le cas.",
  "waiting.email": "Adresse e-mail",
  "waiting.name": "Votre nom (facultatif)",
  "waiting.join": "Rejoindre la liste d’attente",
  "waiting.open": "La liste d’attente est ouverte",
  "waiting.promise": "Un seul e-mail à l’ouverture. Vous pouvez nous demander d’oublier votre adresse à tout moment.",
  "waiting.failed": "Cela n’a pas fonctionné. Réessayez dans une minute.",
};

export default fr;
