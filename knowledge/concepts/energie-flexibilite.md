# Approvisionnement, additionnalité et flexibilité

> Vue dérivée automatiquement des JSON du dépôt. Révision documentaire : 2026-11-26. Les statuts reflètent la base, pas une vérification juridique en temps réel. Les sources originales restent la référence. Ne pas modifier cette page à la main.

[Retour à l'index](../index.md)

## Grille de lecture

Distinguer couverture annuelle et corrélation horaire, production additionnelle et achat de certificats, production ou stockage associé et obligation d'autonomie. La flexibilité contractuelle, l'effacement et les exigences de tenue aux perturbations répondent à des objectifs différents.

## Questions à approfondir

- Quelles capacités supplémentaires sont exigées ?
- Quelle puissance est concernée et quelle périodicité de couverture s'applique ?
- Quels mécanismes de modulation sont réellement opposables ?

## Comparaison des mécanismes déjà évalués

Les évaluations existantes sont reproduites sans créer de nouvelle qualification. Le stade et le périmètre restent déterminants.

| Critère | Périmètre | Stade | Nature | Détail | Référence |
|---|---|---|---|---|---|
| Additionnalité renouvelable | ES | Application | Obligation | 80 % d’additionnalité et 80 % de corrélation horaire, régimes transitoires et exceptions distincts ; seuil général ≥10 MW de puissance d’accès (articles 2, 7 et 8). | `es-1032-2026` · [Texte officiel · BOE](<https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-24439>) (primaire) |
| Additionnalité renouvelable | IE | Publication | Obligation | 80 % de la demande annuelle couverte par de nouvelles capacités renouvelables irlandaises, après une période de six ans. | `ie-cru-2025` · [Décision · CRU](<https://www.cru.ie/en-ie/about-us/news/the-cru-publishes-its-decision-on-new-electricity-connection-policy-for-data-centres/>) (primaire) |
| Production ou stockage associé | IE | Publication | Obligation | Production ou stockage sur site ou à proximité, dimensionné par rapport à la puissance appelée. | `ie-cru-2025` · [Décision · CRU](<https://www.cru.ie/en-ie/about-us/news/the-cru-publishes-its-decision-on-new-electricity-connection-policy-for-data-centres/>) (primaire) |
| Additionnalité renouvelable | GR | Publication | Obligation | Au moins 60 % de la consommation annuelle à couvrir via de nouvelles capacités renouvelables selon les modalités du texte ; seuil et périmètre différents de l’Espagne et de l’Irlande. | `gr-law-5356-2026` · [Journal officiel grec — loi 5356/2026, 17 novembre](<https://api.et.gr/apiLAW/1/2026/5356/pdf>) (primaire) |

## Cas documentés

Sélection de lecture, complétée automatiquement par les évaluations existantes. Les résumés ci-dessous sont ceux du référentiel, sans nouvelle interprétation juridique.

### Décret royal 1032/2026

- Identifiant : `es-1032-2026` · 2026-11-21 · ES · Application
- Fiche cartographique : [ES](https://zoruohorse.github.io/atlas_data_centers/#ES)
- Date d'effet renseignée : 2026-11-22

Le décret royal 1032/2026 du 20 novembre, publié le 21 et applicable le 22 novembre, fixe des exigences de durabilité et de souveraineté. Les obligations générales visent les demandes de raccordement d’au moins 10 MW de puissance d’accès (agrégation des sites de même titulaire et localisation), non 10 MW IT. Les articles 7 et 8 prévoient respectivement une couverture de 80 % de la consommation par des capacités renouvelables additionnelles et une corrélation horaire de 80 %, avec exceptions et voie transitoire de cinq ans liée à la réduction automatique de puissance. L’article 13 concerne les sites d’au moins 500 kW IT ; l’article 5 s’applique indépendamment de la puissance aux systèmes publics de catégorie ALTA, sous ses conditions propres. Les exceptions de l’article 2 doivent être vérifiées. Le projet de reporting de l’été 2025 est un jalon antérieur ; ne pas appliquer ses seuils au décret final de novembre 2026.

**Opérateurs :** Distinguer puissance d’accès et puissance IT. Vérifier les dispositions transitoires, les engagements de production renouvelable et les critères énergétiques et hydriques, ainsi que le champ des obligations de souveraineté.

**Réseau :** Les demandes suspendues pour concours de capacité doivent justifier leur conformité dans les trois mois, sous réserve de la procédure de régularisation et d’audition (DT4). Pour les permis délivrés mais sites non raccordés, six mois pour justifier les exigences hors article 5, sinon caducité (DT5). Les gestionnaires interviennent dans la vérification documentaire et la facturation des compensations pour écarts.

Sources : [Texte officiel · BOE](<https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-24439>) (primaire) · [EnergyTag — modélisation du projet de décret](<https://energytag.org/wp-content/uploads/2026/10/20261029-FINAL-Getting-Spain-Data-Center-Decree-Right_-Hourly-Matching-That-Cuts-Emissions-and-Costs-v4-1.pdf>) (primaire) · [MITECO — approbation du décret final](<https://www.miteco.gob.es/es/prensa/ultimas-noticias/2026/noviembre/el-gobierno-aprueba-el-real-decreto-para-la-sostenibilidad-energ.html>) (primaire). Autres références : voir `es-1032-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Nouvelle politique de raccordement de la CRU

- Identifiant : `ie-cru-2025` · 2025-12-12 · IE · Publication
- Fiche cartographique : [IE](https://zoruohorse.github.io/atlas_data_centers/#IE)

Pour les nouveaux sites concernés, la CRU ajoute une exigence de 80 % de consommation annuelle couverte par de nouvelles capacités renouvelables irlandaises, avec six ans à compter de la mise sous tension. La politique maintient l’exigence de production ou de stockage sur site ou à proximité et affine l’examen des contraintes réseau à l’échelle du point de raccordement. Les commentaires de presse évoquent le Bring Your Own Power ; ne pas assimiler la politique CRU à une interdiction générale de raccordement ni à une obligation de production exclusivement autonome pour tous les sites. Les conditions précises figurent dans la décision officielle.

**Opérateurs :** Présenter un plan crédible pour les capacités renouvelables supplémentaires et prévoir la production ou le stockage requis.

**Réseau :** Examiner les contraintes au point de raccordement et la contribution de la capacité associée à l’adéquation du système.

Sources : [Décision · CRU](<https://www.cru.ie/en-ie/about-us/news/the-cru-publishes-its-decision-on-new-electricity-connection-policy-for-data-centres/>) (primaire) · [CRU — décision sur le raccordement des grandes consommations](<https://www.cru.ie/publications/28906/>) (primaire) · [Presse · RTÉ](<https://www.rte.ie/news/business/2025/1212/1548674-80-of-data-centre-energy-must-come-from-renewables-cru/>) (analyse). Autres références : voir `ie-cru-2025` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Loi 5356/2026 — cadre spécifique de raccordement des data centers

- Identifiant : `gr-law-5356-2026` · 2026-11-17 · GR · Publication
- Fiche cartographique : [GR](https://zoruohorse.github.io/atlas_data_centers/#GR)

Le texte publié au Journal officiel le 17 novembre institue un dispositif spécifique comprenant un registre, des critères de maturité et une garantie de 200 000 €/MW de capacité maximale. Il prévoit un approvisionnement renouvelable d’au moins 60 % de la consommation annuelle et une contribution locale annuelle de 20 000 €/MW, répartie entre municipalités (75 %) et ménages (25 %). Les modalités transitoires et d’application restent à suivre.

**Opérateurs :** Intégrer les garanties, les coûts de raccordement et de renforcement ainsi que la contribution locale et les contrats d’approvisionnement dans le modèle financier.

**Réseau :** Le nouveau cadre vise à qualifier les demandes et à réduire les réservations spéculatives ; les coûts de raccordement et de renforcement induits sont à la charge des investisseurs selon le dispositif.

Sources : [Journal officiel grec — loi 5356/2026, 17 novembre](<https://api.et.gr/apiLAW/1/2026/5356/pdf>) (primaire) · [Zepos & Yannopoulos — analyse juridique](<https://www.zeya.com/index.php/newsletters/data-centres-greece-new-dedicated-framework-grid-connection>) (analyse) · [DCmag — nouveau dispositif grec](<https://dcmag.fr/la-grece-impose-aux-data-centers-une-contribution-annuelle-de-20-000-euros-par-mw/>) (analyse). Autres références : voir `gr-law-5356-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Exigences immédiates pour les grandes charges raccordées directement à Fingrid

- Identifiant : `fi-fingrid-large-loads-2026` · 2026-06-12 · FI · Application
- Fiche cartographique : [FI](https://zoruohorse.github.io/atlas_data_centers/#FI)
- Date d'effet renseignée : 2026-06-12

Fingrid applique des exigences techniques supplémentaires aux grandes charges raccordées directement à son réseau de transport. Le code KJV2026 soumis à consultation prévoit d’étendre ces exigences aux installations concernées raccordées via les réseaux de distribution après confirmation.

**Opérateurs :** Vérifier les exigences de commande de puissance et de tenue aux perturbations dès la conception.

Sources : [Dossier de consultation et calendrier · Fingrid](<https://www.fingrid.fi/en/grid/grid-connection-agreement-phases/grid-code-specifications/draft-for-comments-kjv2026-grid-code-specifications-for-demand-connections/>) (primaire) · [Présentation du projet KJV2026 · Fingrid](<https://www.fingrid.fi/globalassets/dokumentit/fi/palvelut/kulutuksen-ja-tuotannon-liittaminen-kantaverkkoon/kjv2026-presentation-12june2026.pdf>) (primaire). Autres références : voir `fi-fingrid-large-loads-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Fingrid prépare de nouvelles spécifications pour les grandes charges

- Identifiant : `fi-fingrid-kjv-2026` · 2026-06-12 · FI · Consultation
- Fiche cartographique : [FI](https://zoruohorse.github.io/atlas_data_centers/#FI)
- Échéance : Consultation close le 21 août 2026. Confirmation par l’Autorité de l’énergie visée en mars 2027.

Le projet KJV2026 prévoit de nouvelles capacités de pilotage de la puissance active des installations de consommation, avec des exigences graduées selon la puissance. La catégorie supérieure commence à 30 MW.

**Opérateurs :** Vérifier les capacités de commande, de réduction de charge et de tenue aux perturbations prévues par le projet.

**Réseau :** L’objectif est de rendre les grandes charges pilotables lors de contraintes réseau.

Sources : [Dossier de consultation et calendrier · Fingrid](<https://www.fingrid.fi/en/grid/grid-connection-agreement-phases/grid-code-specifications/draft-for-comments-kjv2026-grid-code-specifications-for-demand-connections/>) (primaire) · [Présentation du projet KJV2026 · Fingrid](<https://www.fingrid.fi/globalassets/dokumentit/fi/palvelut/kulutuksen-ja-tuotannon-liittaminen-kantaverkkoon/kjv2026-presentation-12june2026.pdf>) (primaire) · [Analyse européenne · ACER](<https://www.acer.europa.eu/sites/default/files/documents/Publications/ACER-2026-Monitoring-Report-Security-of-EU-electricity-supply.pdf>) (analyse). Autres références : voir `fi-fingrid-kjv-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### PJM — ordonnance FERC sur la colocalisation production et consommation

- Identifiant : `us-pjm-colocation-order-2025` · 2025-12-18 · US — Périmètre du réseau PJM · Publication
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

La FERC constate que le tarif de PJM manque de clarté pour les grandes charges colocalisées avec une production et ordonne une révision des options de service de transport. Elle demande aussi un rapport sur les mesures de fiabilité et d’accélération des raccordements pour le 19 janvier 2026. L’ordonnance ne garantit pas une mise sous tension rapide ; les tarifs de mise en œuvre et leurs dates d’effet doivent être vérifiés séparément.

**Opérateurs :** Options tarifaires distinctes selon les soutirages et services de transport.

**Réseau :** Clarification des conditions de service et de la contribution aux coûts de fiabilité.

Sources : [FERC · ordonnance de colocalisation PJM](<https://www.ferc.gov/news-events/news/ferc-directs-nations-largest-grid-operator-create-new-rules-embrace-innovation-and>) (primaire) · [FERC · fiche de l’ordonnance](<https://ferc.gov/news-events/news/fact-sheet-ferc-directs-nations-largest-grid-operator-create-new-rules-embrace>) (primaire). Autres références : voir `us-pjm-colocation-order-2025` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### PJM — ordre d’urgence temporaire 202-26-35 (expiré)

- Identifiant : `us-pjm-emergency-backup-2026` · 2026-07-14 · US — Région PJM · Texte abrogé
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)
- Date d'effet renseignée : 2026-07-14
- Fin renseignée : 2026-07-21

Le DOE autorise temporairement PJM à demander l’activation de moyens de secours éligibles de grandes charges en dernier recours, avant ou pendant une alerte EEA3. L’ordre du 14 juillet expire le 21 juillet à 23h59 EDT. D’autres ordres temporaires sont documentés séparément par le DOE ; cette entrée ne signifie pas une obligation permanente ni une activation effective de tous les moyens.

Sources : [DOE — ordre temporaire 202-26-35](<https://www.energy.gov/ceser/federal-power-act-section-202c-pjm-interconnection-llc-pjm-order-no-202-26-35>) (primaire) · [DOE — liste des ordres d’urgence](<https://www.energy.gov/ceser/2026-doe-202c-orders>) (primaire) · [DCD — activation des moyens de secours](<https://www.datacenterdynamics.com/en/opinions/when-a-grid-signal-becomes-a-production-change/>) (analyse). Autres références : voir `us-pjm-emergency-backup-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### ERCOT — suivi des exigences de ride-through

- Identifiant : `us-tx-ride-through-review-2026` · 2026-11-17 · US — Texas · Contexte documenté
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

La proposition NOGRR291 du 17 novembre porte sur les conditions d’exemption de certaines charges de calcul aux exigences de maintien en fonctionnement, en lien avec leur classement Batch Zero. Une proposition ne vaut pas approbation définitive.

Sources : [ERCOT — proposition NOGRR291](<https://www.ercot.com/mktrules/issues/NOGRR291>) (primaire). Autres références : voir `us-tx-ride-through-review-2026` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### Dublin — rejet de l’appel d’Equinix sur la modification de DB8

- Identifiant : `ie-equinix-db8-gas-appeal-2025` · 2025-02-19 · IE — Profile Park, Dublin · Projet ou infrastructure
- Fiche cartographique : [IE](https://zoruohorse.github.io/atlas_data_centers/#IE)

An Bord Pleanála rejette le 19 février 2025 l’appel relatif à la modification du permis du centre DB8 à Profile Park (SD22A/0156, ABP-317936-23). La demande concernait notamment une production électrique au gaz sur site. La presse attribue le rejet entre autres aux conditions de raccordement et d’approvisionnement ; le dossier concerne cette modification particulière, non une interdiction nationale de toute production au gaz ni une annulation automatique du permis initial.

Sources : [South Dublin County Council — décisions d’appel, 19 février 2025](<https://planning.southdublin.ie/Home/ViewWeeklyListDocument/3669>) (primaire) · [DCmag — rejet de la modification du projet DB8](<https://dcmag.fr/equinix-ne-produira-pas-sa-propre-energie-au-gaz-a-db8-en-irlande/>) (analyse) · [Bisnow — décision d’appel DB8](<https://www.bisnow.com/news/dublin/data-center/an-bord-pleanla-turns-down-equinix-gas-powered-data-centre-appeal-128300>) (analyse). Autres références : voir `ie-equinix-db8-gas-appeal-2025` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### Royaume-Uni — première réunion du AI Energy Council

- Identifiant : `gb-ai-energy-council-2025` · 2025-04-08 · GB · Contexte documenté
- Fiche cartographique : [GB](https://zoruohorse.github.io/atlas_data_centers/#GB)

Le gouvernement organise la première réunion du Conseil réunissant les responsables publics de l’énergie et du numérique, gestionnaires, régulateur et industriels. L’instance vise à anticiper les besoins électriques des infrastructures IA et coordonner les travaux sur l’énergie. Il s’agit d’une instance de concertation stratégique, non d’une règle de raccordement adoptée.

Sources : [Gouvernement britannique — première réunion du AI Energy Council](<https://www.gov.uk/government/news/technology-and-energy-secretaries-chair-first-meeting-of-ai-energy-council>) (primaire) · [Gouvernement britannique — comptes rendus du Conseil](<https://www.gov.uk/government/publications/ai-energy-council-meetings-minutes>) (primaire) · [The Register — enjeux de fourniture électrique](<https://www.theregister.com/2025/04/10/uk_ai_energy_council_meets/>) (analyse). Autres références : voir `gb-ai-energy-council-2025` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

## Explorer l'ensemble des documents associés

- [Système électrique](../themes/power.md)
- [Approvisionnement](../themes/supply.md)
