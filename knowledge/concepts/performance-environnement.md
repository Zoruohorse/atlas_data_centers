# Performance environnementale, chaleur, eau et reporting

> Vue dérivée automatiquement des JSON du dépôt. Révision documentaire : 2026-11-27. Les statuts reflètent la base, pas une vérification juridique en temps réel. Les sources originales restent la référence. Ne pas modifier cette page à la main.

[Retour à l'index](../index.md)

## Grille de lecture

Comparer les indicateurs avec leurs unités, seuils et périmètres : PUE, WUE, ERF et puissance informatique ou électrique. Une obligation de déclaration ne constitue pas à elle seule une norme minimale de performance ; un projet de norme ne vaut pas norme applicable.

## Questions à approfondir

- Quels sites et quelles dates de mise en service sont visés ?
- Les indicateurs sont-ils publiés, agrégés ou confidentiels ?
- Quels seuils, exceptions et transitions rendent la comparaison pertinente ?

## Comparaison des mécanismes déjà évalués

Les évaluations existantes sont reproduites sans créer de nouvelle qualification. Le stade et le périmètre restent déterminants.

| Critère | Périmètre | Stade | Nature | Détail | Référence |
|---|---|---|---|---|---|
| Plafond de PUE | ES | Application | Obligation | PUE transitoire de 1,25 au plus dans le régime général, sous réserve des délais et régimes spécifiques. | `es-1032-2026` · [Texte officiel · BOE](<https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-24439>) (primaire) |
| Plafond de PUE | DE | Application | Obligation | PUE de 1,2 au plus pour les centres entrant en service à compter du 1ᵉʳ juillet 2026, selon le § 11. | `de-enefg-2026` · [Texte officiel · § 11 EnEfG](<https://www.gesetze-im-internet.de/enefg/__11.html>) (primaire) |
| Efficacité hydrique | ES | Application | Obligation | Plafond de WUE avec modalités transitoires et régimes spécifiques. | `es-1032-2026` · [Texte officiel · BOE](<https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-24439>) (primaire) |
| Réutilisation de chaleur | DE | Application | Obligation | Premier palier de réutilisation de 10 % pour les nouveaux sites concernés, avec exceptions. | `de-enefg-2026` · [Texte officiel · § 11 EnEfG](<https://www.gesetze-im-internet.de/enefg/__11.html>) (primaire) |
| Reporting de performance | Union européenne | Application | Obligation | Déclaration harmonisée à partir de 500 kW de puissance informatique installée. | `eu-reporting-2024` · [Texte officiel · EUR-Lex](<https://eur-lex.europa.eu/eli/reg_del/2024/1364/oj>) (primaire) |
| Réutilisation de chaleur | FR | Publication | Obligation | Principe de valorisation à partir de 1 MW de puissance installée, avec modalités et dérogations réglementaires. | `fr-heat-2025` · [Code de l’énergie · Légifrance](<https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051560826/2026-05-25>) (primaire) |
| Réutilisation de chaleur | FR | Application | Obligation | À partir de 1 MW installé par SIRET, ERF d’au moins 0,20 pour satisfaire le critère, hors dérogation. | `fr-heat-decree-2025` · [Article R.237-4 · Légifrance](<https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000053214974/2026-03-08>) (primaire) |

## Cas documentés

Sélection de lecture, complétée automatiquement par les évaluations existantes. Les résumés ci-dessous sont ceux du référentiel, sans nouvelle interprétation juridique.

### Décret royal 1032/2026

- Identifiant : `es-1032-2026` · 2026-11-21 · ES · Application
- Fiche cartographique : [ES](https://zoruohorse.github.io/atlas_data_centers/#ES)
- Date d'effet renseignée : 2026-11-22

Le décret royal 1032/2026 du 20 novembre, publié le 21 et applicable le 22 novembre, fixe des exigences de durabilité et de souveraineté. Les obligations générales visent les demandes de raccordement d’au moins 10 MW de puissance d’accès (agrégation des sites de même titulaire et localisation), non 10 MW IT. Les articles 7 et 8 prévoient respectivement une couverture de 80 % de la consommation par des capacités renouvelables additionnelles et une corrélation horaire de 80 %, avec exceptions et voie transitoire de cinq ans liée à la réduction automatique de puissance. L’article 13 concerne les sites d’au moins 500 kW IT ; l’article 5 s’applique indépendamment de la puissance aux systèmes publics de catégorie ALTA, sous ses conditions propres. Les exceptions de l’article 2 doivent être vérifiées. Le projet de reporting de l’été 2025 est un jalon antérieur ; ne pas appliquer ses seuils au décret final de novembre 2026. SpainDC indique le 25 novembre avoir saisi le Tribunal suprême le 24 novembre avec une demande de suspension provisoire. Aucun octroi de suspension n’est établi ; le stade enregistré est maintenu. Voir es-spaindc-rd1032-appeal-2026.

**Opérateurs :** Distinguer puissance d’accès et puissance IT. Vérifier les dispositions transitoires, les engagements de production renouvelable et les critères énergétiques et hydriques, ainsi que le champ des obligations de souveraineté.

**Réseau :** Les demandes suspendues pour concours de capacité doivent justifier leur conformité dans les trois mois, sous réserve de la procédure de régularisation et d’audition (DT4). Pour les permis délivrés mais sites non raccordés, six mois pour justifier les exigences hors article 5, sinon caducité (DT5). Les gestionnaires interviennent dans la vérification documentaire et la facturation des compensations pour écarts.

Sources : [Texte officiel · BOE](<https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-24439>) (primaire) · [EnergyTag — modélisation du projet de décret](<https://energytag.org/wp-content/uploads/2026/10/20261029-FINAL-Getting-Spain-Data-Center-Decree-Right_-Hourly-Matching-That-Cuts-Emissions-and-Costs-v4-1.pdf>) (primaire) · [MITECO — approbation du décret final](<https://www.miteco.gob.es/es/prensa/ultimas-noticias/2026/noviembre/el-gobierno-aprueba-el-real-decreto-para-la-sostenibilidad-energ.html>) (primaire). Autres références : voir `es-1032-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Premier palier du § 11 de l’EnEfG pour les nouveaux sites

- Identifiant : `de-enefg-2026` · 2026-07-01 · DE · Application
- Fiche cartographique : [DE](https://zoruohorse.github.io/atlas_data_centers/#DE)
- Date d'effet renseignée : 2026-07-01

Pour les centres entrant en service à compter du 1ᵉʳ juillet 2026, le § 11 fixe un PUE maximal de 1,2 et un premier objectif de réutilisation d’énergie de 10 %, avec des paliers ultérieurs et des exceptions précisées par le texte.

Sources : [Texte officiel · § 11 EnEfG](<https://www.gesetze-im-internet.de/enefg/__11.html>) (primaire) · [FAQ · Ministère fédéral de l’Économie](<https://www.bundeswirtschaftsministerium.de/RZReg/Downloads/faq-requirements-for-data-centres-act-enefg.pdf?__blob=publicationFile&v=1>) (analyse). Autres références : voir `de-enefg-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Valorisation de la chaleur fatale à partir de 1 MW

- Identifiant : `fr-heat-2025` · 2025 · FR · Publication
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)

L’article L.236-2 du code de l’énergie prévoit la valorisation de la chaleur fatale des data centers d’au moins 1 MW de puissance installée. Le texte renvoie à un décret pour les exigences précises et les dérogations, dont la justification d’une impossibilité technique ou économique selon le cadre européen.

**Opérateurs :** Étudier les débouchés de chaleur et l’applicabilité des dérogations.

Sources : [Code de l’énergie · Légifrance](<https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051560826/2026-05-25>) (primaire) · [Guide d’implantation · Direction générale des entreprises](<https://www.entreprises.gouv.fr/files/files/Publications/2025/Guide/25112025__Guide%20Datacenters.pdf?trk=article-ssr-frontend-pulse_little-text-block>) (primaire) · [Ministère de la Transition écologique — efficacité énergétique des centres de données](<https://www.ecologie.gouv.fr/politiques-publiques/efficacite-energetique-centres-donnees-datacenters>) (primaire). Autres références : voir `fr-heat-2025` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Le décret fixe le seuil de réutilisation de chaleur

- Identifiant : `fr-heat-decree-2025` · 2025-12-29 · FR · Application
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)
- Date d'effet renseignée : 2026-01-01

Le décret 2025-1382 applique le principe de valorisation prévu à partir de 1 MW de puissance installée. Depuis le 1ᵉʳ janvier 2026, l’exigence est réputée satisfaite si le facteur de réutilisation de l’énergie (ERF) atteint au moins 0,20, sous réserve des dispositions de dérogation.

**Opérateurs :** Calculer le seuil à l’échelle du SIRET et étudier les débouchés de chaleur.

Sources : [Article R.237-4 · Légifrance](<https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000053214974/2026-03-08>) (primaire) · [Code de l’énergie · Légifrance](<https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051560826/2026-05-25>) (primaire) · [Sciences Po médialab — rapport de Loup Cellard sur la chaleur fatale](<https://medialab.sciencespo.fr/productions/2026-10-12-la-chaleur-des-data-centers-un-dechet-qui-voulait-devenir-une-ressource/>) (primaire). Autres références : voir `fr-heat-decree-2025` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Directive européenne sur l’efficacité énergétique

- Identifiant : `eu-efficiency-2023` · 2023-09-20 · Union européenne · Publication
- Fiche cartographique : [Europe](https://zoruohorse.github.io/atlas_data_centers/)

L’article 12 prévoit un cadre de transparence et de suivi de la performance énergétique des centres de données concernés.

Sources : [Directive 2023/1791 · EUR-Lex](<https://eur-lex.europa.eu/eli/dir/2023/1791/oj>) (primaire) · [Synthèse · Commission européenne](<https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive/energy-performance-data-centres_en>) (primaire). Autres références : voir `eu-efficiency-2023` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Règlement délégué (UE) 2024/1364

- Identifiant : `eu-reporting-2024` · 2024-05-17 · Union européenne · Application
- Fiche cartographique : [Europe](https://zoruohorse.github.io/atlas_data_centers/)
- Date d'effet renseignée : 2024-06-06

Le règlement harmonise les indicateurs et les modalités de déclaration à la base européenne pour les centres de données dont la puissance informatique installée atteint au moins 500 kW. Les informations individualisées relèvent de règles de confidentialité ; la publication prévue porte notamment sur les résultats agrégés. Leur accessibilité fait l’objet d’une contestation distincte devant le comité d’Aarhus.

**Opérateurs :** Déclarer les données et les indicateurs requis selon la méthodologie commune.

Sources : [Texte officiel · EUR-Lex](<https://eur-lex.europa.eu/eli/reg_del/2024/1364/oj>) (primaire) · [Synthèse · Commission européenne](<https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive/energy-performance-data-centres_en>) (primaire) · [Lighthouse Reports — Data Centre Silence](<https://www.lighthousereports.com/investigation/data-centre-silence/>) (primaire). Autres références : voir `eu-reporting-2024` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Consultation européenne sur les normes minimales de performance

- Identifiant : `eu-minimum-standards-consultation-2026` · 2026-09-21 · Union européenne · Consultation
- Fiche cartographique : [Europe](https://zoruohorse.github.io/atlas_data_centers/)
- Échéance : Clôture de la consultation le 14 décembre 2026.

La Commission consulte sur des normes minimales de performance pour les centres de données. La consultation alimente les travaux préparatoires d’une proposition législative annoncée pour le deuxième trimestre 2027.

**Opérateurs :** Suivre les métriques et seuils envisagés.

Sources : [Avis de consultation · Commission européenne](<https://energy.ec.europa.eu/news/minimum-performance-standards-data-centres-europe-public-consultation-launched-2026-09-21_en?prefLang=fr>) (primaire) · [Étude préparatoire · Commission européenne](<https://energy.ec.europa.eu/resources/preparatory-studies/minimum-performance-standards-eu-data-centres_en>) (primaire) · [De nouvelles règles vertes et labels européens pour encadrer les data centres](<https://fr.euronews.com/2026/11/26/de-nouvelles-regles-vertes-et-labels-europeens-pour-encadrer-les-data-centres>) (analyse). Autres références : voir `eu-minimum-standards-consultation-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Étiquetage européen — acte délégué C(2026) 3472

- Identifiant : `eu-rating-2026` · 2026-09-21 · Union européenne · Adoption
- Fiche cartographique : [Europe](https://zoruohorse.github.io/atlas_data_centers/)
- Échéance : Premières étiquettes prévues en 2027 ; vérifier la publication au JOUE et le calendrier d’application.

La Commission a adopté un second acte délégué établissant un système commun de notation, sur la base du reporting prévu par le règlement 2024/1364. Il distingue efficacité énergétique et hydrique, avec étiquettes électroniques générées à partir des données déclarées. Les premières étiquettes sont prévues en 2027. Le classement est distinct des futures normes minimales, encore en consultation ; la publication au Journal officiel et l’entrée en vigueur doivent être confirmées avant de traiter le texte comme applicable. En juillet, Christophe Grudler a déclaré avoir coordonné une lettre transpartisane au sujet de la prise en compte des sources d’électricité bas-carbone, dont le nucléaire. Son message décrit la réponse de la Commission ; il ne démontre pas une modification du texte final à lui seul. Les articles de mai à juillet documentent les débats sur la valorisation du nucléaire et les méthodes de comptabilisation des émissions dans les projets de texte. Les démarches attribuées à des commissaires par La Lettre et le plaidoyer de Christophe Grudler et du Medef ne démontrent pas une interdiction du nucléaire ni l’issue des arbitrages. Le texte adopté en septembre est la référence, distincte des brouillons.

**Opérateurs :** Préparer des données de reporting fiables, sans confondre la classe affichée avec une obligation de performance minimale.

**Réseau :** L’amélioration de l’information peut éclairer les comparaisons ; la notation n’est pas une règle de priorité de raccordement.

Sources : [EUR-Lex — acte délégué C(2026) 3472](<https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=PI_COM%3AC%282026%293472)>) (primaire) · [Commission — communication COM(2026) 500 sur l’efficacité des centres de données](<https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52026DC0500>) (primaire) · [Christophe Grudler — lettre sur le label](<https://www.linkedin.com/posts/christophe-grudler_ec-reply-on-data-center-green-label-activity-7485265150850224128-s3jU>) (primaire). Autres références : voir `eu-rating-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### EPA — normes d’émissions des turbines stationnaires

- Identifiant : `us-epa-turbine-nsps-2026` · 2026-01-15 · US · Publication
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

La règle finale publiée le 15 janvier crée notamment la sous-partie KKKKa des normes de performance des turbines à combustion stationnaires. Les turbines utilisées pour alimenter des data centers peuvent relever de ces règles, y compris selon les conditions propres aux turbines temporaires. La qualification réglementaire dépend de l’équipement et de son usage. Cette règle générale n’est pas une décision individuelle constatant une infraction de xAI ni une interdiction générale de production sur site.

**Opérateurs :** Vérifier la catégorie de turbine, les normes d’émissions et les permis applicables.

**Réseau :** Contraintes environnementales à prendre en compte pour les options de production locale.

Sources : [EPA · normes NSPS des turbines stationnaires](<https://www.epa.gov/stationary-sources-air-pollution/stationary-gas-and-combustion-turbines-new-source-performance>) (primaire) · [EPA · ressources Clean Air Act pour les data centers](<https://www.epa.gov/stationary-sources-air-pollution/clean-air-act-resources-data-centers>) (primaire) · [Developpez · controverse sur les turbines xAI](<https://cloud-computing.developpez.com/actu/379378/L-autorite-de-regulation-americaine-a-juge-que-l-entreprise-d-IA-d-Elon-Musk-avait-agi-illegalement-en-utilisant-des-dizaines-de-turbines-a-gaz-methane-tres-polluantes-pour-alimenter-ses-centres-de-donnees/>) (analyse). Autres références : voir `us-epa-turbine-nsps-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### EIA — enquête pilote sur la consommation des centres

- Identifiant : `us-eia-energy-survey-2026` · 2026-03-25 · US · Contexte documenté
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

L’EIA lance une enquête pilote auprès d’entreprises exploitant des centres dans des régions ciblées. TechCrunch rapporte en avril la préparation d’une enquête obligatoire nationale. L’entrée en vigueur d’un formulaire obligatoire national n’a pas été confirmée ; le pilote ne constitue pas un reporting général déjà applicable.

Sources : [EIA — enquête pilote du 25 mars](<https://www.eia.gov/pressroom/releases/press585.php>) (primaire) · [TechCrunch — projet d’enquête EIA](<https://techcrunch.com/2026/04/15/feds-will-require-data-centers-to-show-their-power-bills/>) (analyse) · [ChannelNews · demande de reporting](<https://www.channelnews.fr/des-senateurs-exigent-une-declaration-de-consommation-denergie-des-datacenters-aux-etats-unis-156194>) (analyse). Autres références : voir `us-eia-energy-survey-2026` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### États-Unis — étude de la consommation et des émissions de 403 hyperscales

- Identifiant : `us-hyperscale-electricity-emissions-study-2026` · 2026-11-16 · US · Contexte documenté
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Une étude publiée dans Nature Sustainability estime, dans son scénario central, la consommation de 403 centres hyperscale actifs entre mai 2024 et avril 2025 à environ 82 TWh, et leurs émissions attribuables à environ 25,7 Mt CO₂. Estimation modélisée pour ce périmètre, non mesure exhaustive de tous les data centers américains.

Sources : [Nature Sustainability — étude des hyperscales américains](<https://www.nature.com/articles/s41893-026-01985-7>) (primaire) · [Data centers : la pollution électrique dépend du réseau auquel les installations sont raccordées](<https://les-smartgrids.fr/data-centers-pollution-electrique-reseau-raccordement-2026/>) (analyse) · [Data centers américains : le gaz et le charbon fournissent encore plus de la moitié de leur électricité](<https://lenergeek.com/2026/11/17/data-centers-americains-gaz-charbon-electricite-harvard-2026/>) (analyse). Autres références : voir `us-hyperscale-electricity-emissions-study-2026` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### The Shift Project — scénarios français de consommation des data centers

- Identifiant : `fr-shift-dc-scenarios-2026` · 2026-11-26 · FR · Contexte documenté
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)

La note collectée indique 5 GW de droits d’accès au réseau fin 2024, 14 GW en novembre 2025, 21 GW en octobre 2026. Les scénarios tendanciels détaillés atteignent 43 à 76 TWh en 2035 et 69 à 117 TWh en 2050 ; la page de présentation arrondit les valeurs hautes à 80 et 120 TWh. Il s’agit de scénarios dépendants de la concrétisation des projets, non de consommations constatées ni de capacités IT. La page officielle est datée du 26 novembre ; la note actualise le rapport d’octobre 2025. Les recommandations de planification et de priorisation sont des propositions du think tank.

Sources : [Note-DC-France-2026](<https://theshiftproject.org/app/uploads/2026/11/Note-DC-France-2026.pdf>) (primaire) · [Déploiement actuel et à venir des centres de données en France](<https://theshiftproject.org/publications/deploiement-actuel-et-a-venir-des-centres-de-donnees-en-france/>) (primaire) · [Data centers : leur consommation électrique pourrait atteindre celle de toute l’industrie française en 2050](<https://tecsol-quotidien.fr/data-centers-leur-consommation-electrique-pourrait-atteindre-celle-de-toute-lindustrie-francaise-en-2050/>) (analyse). Autres références : voir `fr-shift-dc-scenarios-2026` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

## Explorer l'ensemble des documents associés

- [Environnement](../themes/environment.md)
- [Transparence](../themes/transparency.md)
