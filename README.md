# Atlas européen des data centers

Observatoire statique du raccordement, de l’implantation, de l’acceptabilité et des relations entre acteurs. Les fiches conservent leurs URL, par exemple [Pologne](https://zoruohorse.github.io/atlas_data_centers/#PL).

## Lancer et publier

```sh
python3 -m http.server 8000
node scripts/validate-data.mjs
```

Ouvrir http://localhost:8000. Le site lit des fichiers JSON via HTTP. GitHub Pages sert la racine du dépôt. Les chemins relatifs prennent en charge le sous-dossier du projet. L’interface réutilise le fond SVG projeté de la première version, sans dépendance externe ni compilation.

## Organisation

| Emplacement | Contenu |
|---|---|
| `index.html`, `css/` | Structure de la page et présentation |
| `js/app.js`, `js/model.js`, `js/ui.js` | Navigation, chargement et requêtes documentaires, composants DOM |
| `js/views/` | Carte, fiche pays et comparaison |
| `geo/europe.json` | Tracés, coordonnées des libellés et attribution Natural Earth |
| `data/countries.json` | Codes ISO, appartenance à l’UE, priorité, synthèse et références de contexte facultatives |
| `data/regulations.json` | Textes et mesures, stades, dates d’effet, échéances et impacts |
| `data/events.json`, `data/campaigns.json` | Événements structurants et campagnes transnationales |
| `data/actors.json`, `data/relations.json` | Organisations et liens documentés |
| `data/sources.json` | Références dédupliquées et qualifiées |
| `data/taxonomy.json`, `data/assessments.json` | Thèmes, statuts, critères et évaluations comparables |
| `data/changelog.json` | Journal des mises à jour |
| `scripts/validate-data.mjs` | Contrôles de structure et d’intégrité des références |
| `.github/workflows/validate.yml` | Validation à chaque mise à jour de main et dans les pull requests |

## Ajouter une évolution

1. Identifier le changement à partir de la veille, vérifier le document primaire et rechercher un commentaire utile. Réutiliser les identifiants des sources déjà présentes. Une source officielle suffit pour intégrer une décision récente.
2. Ajouter un identifiant stable, une date documentaire et une synthèse factuelle. Utiliser `AAAA-MM-JJ` quand la date est connue et `AAAA` si seule l’année est établie. Préciser le stade, le périmètre et, s’ils sont connus, `effectiveFrom`, `effectiveUntil` ou l’échéance textuelle `milestone`. Renseigner `impacts.operator` et `impacts.grid` selon les éléments étayés. Employer `scope: "eu"` avec une liste `countries` vide pour un texte de l’Union, ou `scope: "national"` et le code du pays. Pour une règle locale, utiliser `scope: "territorial"` et nommer le territoire dans `territory`.
3. Associer les acteurs existants par `actorIds`. Pour une mobilisation transfrontalière, créer la campagne, nommer les pays étayés puis référencer son identifiant dans la relation. Pour un lien direct, préciser le type, les pays, les thèmes, la date et les sources. Une coordination, une convergence, une harmonisation et une influence explicite correspondent à des preuves différentes.
4. Pour alimenter le comparateur, ajouter une évaluation par critère et par référence réglementaire. Réutiliser une valeur `mechanism` quand le mécanisme est de même nature. Le champ `detail` explicite les seuils et le périmètre. Les données communes de l’UE apparaissent dans le tableau. La mise en lumière des pays similaires sur la carte s’appuie sur les mesures nationales.
5. Mettre à jour le journal, lancer le validateur et vérifier l’affichage du pays concerné. Conserver les entrées historiques et indiquer la fin d’application si elle est documentée. Pour une modification régulière, utiliser une pull request avec le delta et ses sources.

Le filtre chronologique affiche les documents enregistrés jusqu’à l’année choisie. Il représente la chronologie de la base à date de publication ou d’annonce. La reconstitution juridique dépend de la complétude des dates, des versions et des mesures abrogées. Un champ manquant signifie que la veille n’a pas renseigné ce point. Le comparateur ne décompte que les critères documentés pour tous les pays sélectionnés.

## Interface V2

Quatre modes cartographiques et radar autonome. Le curseur représente les documents connus à la fin de l’année, pas une reconstruction juridique exhaustive. Le fil européen suit le thème et la date indépendamment du pays. Un projet n'est pas nécessairement contesté.

Le classement national exclut le socle UE, les données manquantes et les mesures suspendues. Les couleurs distinguent une concordance de plusieurs concordances, pas des niveaux de sévérité. Les convergences calculées sont sourcées, mais n'établissent aucune causalité. Les relations explicites exigent une preuve distincte. Le graphe matérialise le cadre ou la campagne commune.

Le champ facultatif milestoneDate (ISO) indique une échéance dont le jour est connu ; milestone conserve la formulation et les réserves. Les consultations anciennes restent à vérifier. Modules indépendants : js/views/network.js, radar.js, feed.js ; styles css/observatory.css.
