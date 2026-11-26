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

Le filtre chronologique affiche les documents enregistrés jusqu’à la fin du trimestre choisi. Il représente la chronologie de la base à date de publication ou d’annonce. La reconstitution juridique dépend de la complétude des dates, des versions et des mesures abrogées. Un champ manquant signifie que la veille n’a pas renseigné ce point. Le comparateur ne décompte que les critères documentés pour tous les pays sélectionnés.

## Interface V2

Quatre modes cartographiques et radar autonome. Le curseur représente les documents connus à la fin du trimestre, pas une reconstruction juridique exhaustive. Le fil européen suit le thème et la date indépendamment du pays. Un projet n'est pas nécessairement contesté.

Le classement national exclut le socle UE, les données manquantes et les mesures suspendues. Les couleurs distinguent une concordance de plusieurs concordances, pas des niveaux de sévérité. Les convergences calculées sont sourcées, mais n'établissent aucune causalité. Les relations explicites exigent une preuve distincte. Le graphe matérialise le cadre ou la campagne commune.

Le champ facultatif milestoneDate (ISO) indique une échéance dont le jour est connu ; milestone conserve la formulation et les réserves. Les consultations anciennes restent à vérifier. Modules indépendants : js/views/network.js, radar.js, feed.js ; styles css/observatory.css.

## Interface V3 — lecture visuelle

La feuille css/visual-atlas.css contient la nouvelle identité graphique. La carte distingue les stades documentés, non une mesure de restrictivité. Les arcs de similarité relient les pays comparés ; les campagnes et le cadre UE sont représentés par un nœud commun, sans inventer de liens bilatéraux. Une seule relation est tracée à la fois pour limiter l’encombrement. Les drapeaux utilisent les petites images de FlagCDN (avec code pays de secours) et peuvent être masqués sur la carte. Les repères nationaux ne localisent pas des projets précis. Les micro-États non dessinés restent accessibles depuis le sélecteur.

## V3.1 — statuts coexistants

La couleur de fond conserve le statut principal, les hachures indiquent le premier statut complémentaire, les points sous les drapeaux indiquent les autres statuts. L’infobulle liste tous les statuts recensés ; les drapeaux et les surfaces sont cliquables. Le gris signifie absence de donnée correspondant aux filtres, non absence de réglementation. « Évolutions à venir » remplace « radar réglementaire » dans l’interface.

## V3.2 — consultation progressive

Le bandeau des compteurs globaux est retiré de la page principale. Les cartes documentaires utilisent désormais un composant commun natif `details/summary` : titre, statut, date, aperçu et nombre de sources restent visibles ; le texte complet, les échéances, impacts et liens restent disponibles au dépliage. Le fil européen conserve les douze entrées habituelles ; ses cartes s'ouvrent indépendamment et gardent leur état lors d'un changement de filtre si l'entrée reste affichée. Dans les fiches pays, deux entrées sont visibles par groupe avant un accordéon des entrées restantes ; les cadres secondaires et sources de contexte sont accessibles sur demande. Les données JSON et le modèle documentaire ne sont pas modifiés.

## V3.3 — chronologie trimestrielle

La frise reste cumulative : chaque position correspond au 31 mars, 30 juin, 30 septembre ou 31 décembre, puis à la dernière révision réelle de la base (position « Base actuelle »). Aucun trimestre futur n’est créé. Les boutons précédent/suivant et le clavier permettent de parcourir les trimestres. La carte, les fiches pays, le comparateur, les relations, le radar et le fil européen utilisent une date de coupure commune. Les entrées datées seulement à l’année sont retenues à partir du 31 décembre en vue historique et restent visibles dans la base actuelle ; cette convention n’attribue aucune date fictive aux documents. Les statuts et résumés proviennent des documents actuels : la frise n’est pas une reconstitution exhaustive de leurs versions historiques.

## V4 — extension mondiale, base partagée

La vue Europe reste la page par défaut, avec ses 47 fiches d'origine et son fond détaillé. La vue Monde est accessible via `?view=world` (liens directs : `?view=world#US`). Les deux vues lisent les mêmes collections JSON ; `data/countries.json` comporte désormais un booléen `europe` qui détermine l'appartenance au périmètre historique de la vue Europe. Les nouvelles fiches sans sources restent vides et grises : cela ne signifie pas une absence de réglementation. La réglementation de l'Union ne s'applique qu'aux États membres (`euMember`). Le fond `geo/world.json` est généré à partir du jeu Natural Earth Admin 0 Countries à 1:110m, en projection Equal Earth ; les géométries non associées aux fiches sont représentées en fond neutre. Les petites entités absentes du tracé sont accessibles par le sélecteur. Ce choix cartographique ne constitue pas une position sur les frontières ni la souveraineté. Les repères mondiaux sont masqués en cas de collision pour préserver la lisibilité. Les URL européennes historiques restent valides. La frise trimestrielle, les comparaisons et les autres modes utilisent le modèle commun.

## V4.1 — États-Unis, États fédérés et cadre fédéral

La page `usa.html` (lien direct `usa.html#TX`) utilise les mêmes collections de textes, événements et sources que la vue Monde. Le fond `geo/usa.json` provient de Natural Earth Admin 1, 1:110m, en projection Albers pour les 48 États contigus, avec encarts Alaska/Hawaï et repères pour les petits États et le district de Columbia. `data/us-jurisdictions.json` associe les identifiants des documents US aux niveaux `state`, `local`, `regional`, `federal` ou `context` et à des codes postaux d’États explicites. Les textes ne sont pas dupliqués. Pour les futurs deltas, renseigner cet index ; tout nouveau document US non classé reste visible dans le contexte national. Ne pas déduire une restriction étatique d’un acte municipal ou régional. Le tableau NCSL (ligne 96 de l’export collecté le 7 mai 2026) est conservé comme photographie historique séparée, jamais comme statut actuel présumé. Les filtres temporels restent cumulatifs ; les textes actuels ne fournissent pas toutes les versions historiques.

## V4.2 — mémoire de veille cumulative (LLM Wiki)

La carte conserve les mêmes collections et le même rendu. [AGENTS.md](AGENTS.md) définit les règles permanentes d'ingestion, de vérification, de capitalisation et de maintenance pour les agents. Le [wiki de connaissances](knowledge/index.md) propose six fiches transversales et neuf index thématiques générés à partir des JSON, avec liens sources et références stables. Les fiches de concepts sont configurées dans `knowledge/concepts.json` ; les analyses éditoriales publiques sont conservées séparément dans `knowledge/analyses/`. Les pages dérivées ne doivent pas être éditées à la main.

```sh
npm run knowledge:build   # après modification des données ou des concepts
npm run knowledge:check   # vérification de la synchronisation
npm run audit             # file de vérification documentaire, sans modification
npm run validate          # validation historique + tests audit + synchronisation + audit non bloquant
```

Le [protocole de maintenance](docs/maintenance/audit-semantique.md) distingue l'audit automatique (dates, statuts, doublons possibles et couverture) de la revue sémantique avec sources, menée par un agent autorisé. Les alertes ne sont pas des erreurs confirmées et ne modifient pas la carte. La validation GitHub existante les affiche à chaque PR et push main ; aucune API LLM ni recherche externe n'est exécutée automatiquement. Les exports et documents internes ne doivent pas être déposés dans ce dépôt public. Le changelog des données reste réservé aux évolutions documentaires, sans modifier la date de coupure pour cette évolution d'architecture.
