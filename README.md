# Atlas européen des data centers

Carte statique de veille sur l’implantation, le raccordement et les exigences d’efficacité. Couverture pilote au 24 novembre 2026.

## Ouvrir et publier

Ouvrir `index.html` dans un navigateur après avoir extrait l’archive. Pour GitHub Pages, placer les fichiers à la racine du dépôt et choisir **Settings → Pages → Deploy from a branch → main / (root)**. Les liens relatifs permettent de servir le site depuis un sous-chemin. Une fiche peut être partagée avec un fragment tel que `#ES`.

## Mettre à jour

Les entrées sont dans `data.js`. Chaque ligne contient le code ISO du pays, la date au format AAAA-MM-JJ, le thème principal, le statut, le titre, une synthèse, la liste des sources et, si utile, les thèmes secondaires.

- Thèmes disponibles — Implantation, Raccordement, Efficacité, Territoires.
- Statuts disponibles — Publie, Temporaire, Annonce, Projet.
- Ajouter la source officielle et une analyse ou une reprise de presse pour chaque changement. Préciser dans la synthèse le périmètre, la date d’application, les dispositions transitoires ou les seuils quand ils changent l’effet sur les projets. Qualifier les annonces selon le stade connu.
- Retirer le statut temporaire de la carte après la fin de la mesure en archivant l’entrée avec le statut Publie et en précisant les dates dans le résumé.
- Actualiser le pied de page dans `index.html` après une révision du jeu de données. Ajouter les rapprochements motivés dans `window.similar`.
- Utiliser les alertes de veille comme pistes. Vérifier le texte officiel et proposer une modification de `data.js` dans une pull request. Conserver les entrées antérieures pour lire la chronologie.

L’absence de signal saisi correspond à une couverture non renseignée. Elle ne permet pas de conclure à l’absence de règles. Le fond provient de Natural Earth, Admin 0 Countries, 1:110m, domaine public. Les micro-États absents du fond restent accessibles dans la liste de pays.
