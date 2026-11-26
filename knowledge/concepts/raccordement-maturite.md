# Raccordement, maturité et réservation de capacité

> Vue dérivée automatiquement des JSON du dépôt. Révision documentaire : 2026-11-26. Les statuts reflètent la base, pas une vérification juridique en temps réel. Les sources originales restent la référence. Ne pas modifier cette page à la main.

[Retour à l'index](../index.md)

## Grille de lecture

Distinguer la demande de capacité, la réservation, le contrat de raccordement, la mise sous tension et la consommation. Séparer la priorité sectorielle du classement par maturité, le gel temporaire du refus définitif, et l'attribution initiale de la réévaluation de la puissance sous-utilisée.

## Questions à approfondir

- Quels jalons de maturité sont vérifiables et à quel moment ?
- Quelles procédures libèrent une capacité réellement inutilisée ?
- Quelles contraintes sont liées au réseau de transport plutôt qu'à la distribution ?

## Comparaison des mécanismes déjà évalués

Les évaluations existantes sont reproduites sans créer de nouvelle qualification. Le stade et le périmètre restent déterminants.

| Critère | Périmètre | Stade | Nature | Détail | Référence |
|---|---|---|---|---|---|
| Réservation de capacité | NO | Mesure temporaire | Mesure temporaire | Suspension des nouvelles réservations de capacité réseau par Statnett. | `no-statnett-2026` · [Décision · Statnett](<https://www.statnett.no/om-statnett/nyheter-og-pressemeldinger/nyhetsarkiv-2026/midlertidige-tiltak-for-fortsatt-forsvarlig-systemdrift>) (primaire) |
| Maturité des demandes | BE | Application | Procédure | Contrôle de la maturité des demandes par la procédure du réseau de transport. | `be-creg-3027-2026` · [Décision B3027 · CREG](<https://www.creg.be/fr/publications/decision-b3027>) (primaire) |
| Maturité des demandes | DK | Application | Procédure | Priorisation par catégories tenant compte du caractère critique et de la maturité du projet. | `dk-2026-capacity-priority` · [Loi 866/2026 · Retsinformation](<https://www.retsinformation.dk/eli/lta/2026/866>) (primaire) |
| Maturité des demandes | GR | Publication | Procédure | Cadre de qualification et de viabilité des demandes de raccordement. | `gr-law-5356-2026` · [Journal officiel grec — loi 5356/2026, 17 novembre](<https://api.et.gr/apiLAW/1/2026/5356/pdf>) (primaire) |
| Maturité des demandes | DE | Application | Procédure | Évaluation commune par cycles, sur des critères vérifiables de maturité et probabilité de réalisation ; procédure des GRT, pas une priorité sectorielle inscrite dans la loi. | `de-reifegrad-procedure-2026` · [TransnetBW — annonce commune des quatre GRT du 5 février](<https://www.transnetbw.de/de/newsroom/news/uebertragungsnetzbetreiber-fuehren-reifegradverfahren-ein>) (primaire) |
| Réservation de capacité | FR | Application | Obligation | Réévaluation de la puissance de raccordement en soutirage selon les modalités CRE ; option progressive jusqu’à dix ans. | `fr-uioli-2025` · [Code de l’énergie — article L.342-24](<https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047990582/2026-10-26>) (primaire) |
| Réservation de capacité | ES | Application | Procédure | Concours de capacité à certains nœuds de transport en cas de sursouscription ; critères et garanties selon le texte applicable. | `es-demand-competition-framework` · [BOE — RD 1183/2020, version consolidée](<https://www.boe.es/buscar/act.php?id=BOE-A-2020-17278>) (primaire) |

## Cas documentés

Sélection de lecture, complétée automatiquement par les évaluations existantes. Les résumés ci-dessous sont ceux du référentiel, sans nouvelle interprétation juridique.

### RTE annonce une refonte de la file de raccordement

- Identifiant : `fr-rte-queue-2026` · 2026-07-03 · FR · Annonce officielle
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)

RTE a annoncé une évolution vers une priorité fondée sur la maturité des projets (« premier prêt, premier servi »). L’annonce s’inscrit dans la réponse à l’afflux de demandes industrielles, dont celles des data centers. En octobre, RTE précise les engagements de maturité et de montée en charge envisagés ainsi que les modalités d’accès sans limitation en contrepartie d’engagements. La surréservation francilienne fait l’objet d’une entrée territoriale distincte. Lors de la présentation Intermines du 9 octobre, les échanges évoquent des jalons de maturité, dont l’obtention du permis de construire, et une réforme à proposer au régulateur. Ces modalités discutées ne sont pas présentées comme une décision acquise. Les rencontres du 30 janvier avaient déjà ouvert la réflexion. Selon l’audition de la présidente de RTE rapportée par L’Usine Nouvelle, la priorisation par nature de projet nécessite une modification législative ; la réforme fondée sur la maturité relève d’un autre mécanisme et nécessite les décisions appropriées du régulateur. Les chiffres de file et de puissance réservée ne sont pas interchangeables.

**Opérateurs :** Suivre les modalités finales et documenter les jalons de maturité.

**Réseau :** Le changement vise à orienter la capacité vers les projets capables d’avancer.

Sources : [Annonce du programme · RTE](<https://www.rte-france.com/actualites/2026-07-03-reussir-electrification-france>) (primaire) · [Institut Paris Region — Note rapide 1071](<https://www.institutparisregion.fr/fileadmin/NewEtudes/000pack6/Etude_3184/NR_1071_web.pdf>) (primaire) · [Ministère de l’Économie — plan d’électrification, mesure 16](<https://www.economie.gouv.fr/actualites/lancement-de-la-seconde-phase-du-plan-delectrification>) (primaire). Autres références : voir `fr-rte-queue-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Île-de-France — surréservation de capacité et réforme de la file

- Identifiant : `fr-idf-overbooking-2026` · 2026-10-15 · FR — Île-de-France · Annonce officielle
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)

La mesure 16 du plan gouvernemental d’électrification annonce au moins 1 GW de capacité supplémentaire pour les projets industriels et numériques franciliens grâce à un mécanisme de surréservation. La définition des paramètres est annoncée dès mi-octobre 2026, avant une éventuelle extension à d’autres régions contraintes.

**Opérateurs :** Engagements financiers et visibilité sur la montée en charge à suivre ; ne pas présenter la mesure comme un droit acquis au raccordement.

**Réseau :** Objectif de libérer des capacités sans confondre demande réservée, demande simultanée et consommation effective.

Sources : [Ministère de l’Économie — plan d’électrification, mesure 16](<https://www.economie.gouv.fr/actualites/lancement-de-la-seconde-phase-du-plan-delectrification>) (primaire) · [GreenUnivers — stratégie de raccordement francilienne](<https://www.greenunivers.com/2026/10/comment-rte-veut-raccorder-les-data-centers-en-ile-de-france-436284/>) (analyse) · [La Tribune — réforme des raccordements RTE](<https://www.latribune.fr/article/tech/intelligence-artificielle/14912157253811/il-n-y-aura-pas-besoin-de-moratoire-rte-assure-pouvoir-absorber-lexplosion-des-data-centers-en-france>) (analyse). Autres références : voir `fr-idf-overbooking-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Use it or lose it — adaptation des puissances de raccordement

- Identifiant : `fr-uioli-2025` · 2024-12-18 · FR · Application
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)
- Date d'effet renseignée : 2025-08-01

L’article L.342-24, l’arrêté du 14 novembre 2024 et la délibération CRE 2024-229 encadrent l’ajustement des puissances de soutirage sous-utilisées, avec modalités applicables depuis le 1er août 2025 aux installations concernées HTA et HTB, nouvelles et existantes. Les data centers ne bénéficient pas d’une exemption sectorielle générale. Le régime distingue une attribution immédiate avec réévaluation après une période de montée en charge de cinq ans et une option d’attribution progressive jusqu’à dix ans. Les critères contractuels, l’historique de puissance et les règles de réduction de contribution financière doivent être examinés selon le cas. Ce mécanisme concerne la puissance de raccordement, distinct du filtrage initial de la file annoncé en 2026.

**Opérateurs :** Prévoir une trajectoire de montée en charge réaliste et suivre les conditions de modification de la puissance.

**Réseau :** Récupération des capacités sous-utilisées selon les modalités applicables ; ne pas assimiler automatiquement à une annulation de demande.

Sources : [Code de l’énergie — article L.342-24](<https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047990582/2026-10-26>) (primaire) · [Arrêté du 14 novembre 2024](<https://www.legifrance.gouv.fr/loda/id/LEGITEXT000050735573/2024-12-06/>) (primaire) · [CRE — délibération 2024-229](<https://www.cre.fr/documents/deliberations/modalites-devolution-de-la-puissance-de-raccordement-electrique-en-soutirage-des-installations-et-les-modalites-dindemnisation.html>) (primaire). Autres références : voir `fr-uioli-2025` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Statnett suspend les nouvelles réservations

- Identifiant : `no-statnett-2026` · 2026-11-09 · NO · Mesure temporaire
- Fiche cartographique : [NO](https://zoruohorse.github.io/atlas_data_centers/#NO)
- Échéance : Levée attendue au plus tard le 1ᵉʳ août 2027.

Statnett suspend les nouvelles réservations de capacité réseau pour les data centers. Le gouvernement prévoit une levée au plus tard le 1ᵉʳ août 2027. Statnett maintient notamment le traitement de certaines demandes déjà reçues au titre du § 14 pour des installations proches de la mise en service sur le réseau régional. La suspension inclut le traitement de certaines demandes d’approbation des caractéristiques techniques (article 14 du règlement sur la responsabilité système), notamment pour le raccordement direct au 420 kV. Les installations déjà approuvées et les raccordements existants ne font pas l’objet d’un arrêt général.

**Opérateurs :** Les projets sans capacité réservée peuvent voir leur calendrier décalé.

**Réseau :** La suspension porte sur les nouvelles réservations de capacité, afin de préserver la sécurité d’exploitation du système. Statnett prévoit de consulter sur de futures exigences techniques (tenue aux perturbations, variation de charge et oscillations), à faire approuver par RME. Le gestionnaire indique vouloir harmoniser ses exigences avec celles d’autres GRT et se référer aux travaux nordiques et d’ENTSO-E.

Sources : [Décision · Statnett](<https://www.statnett.no/om-statnett/nyheter-og-pressemeldinger/nyhetsarkiv-2026/midlertidige-tiltak-for-fortsatt-forsvarlig-systemdrift>) (primaire) · [Annonce · Gouvernement norvégien](<https://www.regjeringen.no/en/whats-new/government-seeks-controlled-growth-of-data-centres-in-norway/id3192054/>) (primaire) · [Analyse · Wikborg Rein](<https://www.wr.no/aktuelt/norwegian-government-announces-plans-for-data-centre-licensing-regime-as-statnett-temporarily-suspends-new-grid-capacity-reservations>) (analyse). Autres références : voir `no-statnett-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Pause des nouveaux accords pour les grands raccordements

- Identifiant : `dk-grid-pause-2026` · 2026-03-02 · DK · Publication
- Fiche cartographique : [DK](https://zoruohorse.github.io/atlas_data_centers/#DK)

Energinet a suspendu en mars 2026 les nouveaux accords pour les grands raccordements afin de recalculer les capacités du réseau de transport. Les petits raccordements ont continué à être traités. En mai CNBC rapporte, d’après Energinet, 60 GW de demandes potentielles dont environ 14 GW pour les data centers. Cet instantané ne correspond pas à des contrats de raccordement et précède la réforme d’octobre.

**Opérateurs :** Vérifier le calendrier de traitement applicable à la puissance et au site du projet.

**Réseau :** Recalcul des capacités selon les consommations, les accords existants et les renforcements décidés.

Sources : [Point d’étape d’août · Dinel](<https://dinel.dk/om-dinel/nyheder/opdatering-pa-kapacitetssituationen-i-transmissionsnettet-august-2026/>) (primaire) · [Note de cadrage · Agence danoise de l’énergie](<https://ens.dk/media/7863/download>) (primaire) · [CNBC — situation danoise de mai](<https://www.cnbc.com/2026/05/04/denmark-data-centers-moratorium-grid-pause-power-demand.html>) (analyse). Autres références : voir `dk-grid-pause-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Premières réponses annoncées après la pause des grands raccordements

- Identifiant : `dk-grid-restart-2026` · 2026-10-21 · DK · Publication
- Fiche cartographique : [DK](https://zoruohorse.github.io/atlas_data_centers/#DK)

À la suite du recalcul de capacité, des premières réponses aux demandes étaient annoncées pour novembre, avec une reprise sélective selon les possibilités du réseau et la nouvelle méthode de priorisation. L’attribution selon ce nouveau modèle a ensuite été confirmée le 13 novembre.

**Opérateurs :** L’avancement dépend du projet et de la capacité locale.

Sources : [Point d’étape d’août · Dinel](<https://dinel.dk/om-dinel/nyheder/opdatering-pa-kapacitetssituationen-i-transmissionsnettet-august-2026/>) (primaire) · [Point d’étape d’octobre · Dansk Erhverv](<https://www.danskerhverv.dk/presse-og-nyheder/nyheder/2026/oktober/nyhed?trk=public_post_comment-text>) (analyse). Autres références : voir `dk-grid-restart-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Première attribution de capacité selon le nouveau modèle danois

- Identifiant : `dk-2026-capacity-priority` · 2026-11-13 · DK · Application
- Fiche cartographique : [DK](https://zoruohorse.github.io/atlas_data_centers/#DK)
- Date d'effet renseignée : 2026-10-19

Energinet attribue de nouveau des capacités aux projets de consommation et de production selon le modèle entré en vigueur à l’automne 2026. Le ministère souligne les difficultés persistantes d’accès complet pour certaines catégories de projets et les besoins de renforcement entre transport et distribution. Le Parlement a adopté la loi de priorisation le 1er octobre ; elle est entrée en vigueur le 12 octobre, puis ses six arrêtés d’application le 19 octobre. Quatre catégories sont prévues : besoins protégés et fonctions critiques, électrification et transition, stockage, puis autres grandes charges dont les data centers ordinaires. Les sites servant des fonctions critiques peuvent relever du premier groupe. Au sein d’une catégorie, les projets réduisant la pression sur le réseau peuvent bénéficier d’une priorité ; certains dossiers des catégories 3 et 4 peuvent être refusés en cas de capacité durablement insuffisante.

**Opérateurs :** Documenter la maturité du projet et vérifier son classement, la capacité locale et les options d’accès limité.

**Réseau :** Priorisation des demandes et développement de solutions de flexibilité lorsque l’accès complet est difficile.

Sources : [Loi 866/2026 · Retsinformation](<https://www.retsinformation.dk/eli/lta/2026/866>) (primaire) · [Arrêté 892/2026 · Retsinformation](<https://www.retsinformation.dk/eli/lta/2026/892/pdf>) (primaire) · [Information du ministre au Parlement · Folketinget](<https://www.ft.dk/samling/20261/almdel/kef/bilag/75/3223649.pdf>) (primaire). Autres références : voir `dk-2026-capacity-priority` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### La CREG revoit le traitement des demandes sur le réseau Elia

- Identifiant : `be-creg-3027-2026` · 2026-01-29 · BE · Application
- Fiche cartographique : [BE](https://zoruohorse.github.io/atlas_data_centers/#BE)
- Date d'effet renseignée : 2026-03-09

La décision B3027 modifie le code de bonne conduite du transport pour filtrer les demandes insuffisamment matures et limiter les réservations inutilisées. Cette réforme s’applique aux demandes sur le réseau de transport dans son champ général. La décision du 29 janvier conserve le premier arrivé, premier servi, mais l’applique par catégories. Elle prévoit des étapes et délais contraignants, justificatifs fonciers, décisions go/no go, réservations limitées dans le temps, principe use it or lose it à décliner au contrat-type et possibilité de recalcul de la flexibilité. Ne pas assimiler ce mécanisme à une priorité sectorielle.

**Opérateurs :** Préparer les pièces de maturité et suivre la durée de validité de la réservation.

**Réseau :** Elia peut concentrer les études sur les projets les plus avancés.

Sources : [Décision B3027 · CREG](<https://www.creg.be/fr/publications/decision-b3027>) (primaire) · [Bilan de mise en œuvre · CREG](<https://www.creg.be/fr/actualites/demandes-de-raccordement-au-reseau-de-transport-premiers-resultats-des-mesures-adoptees>) (primaire). Autres références : voir `be-creg-3027-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Reifegradverfahren — sélection des demandes par maturité

- Identifiant : `de-reifegrad-procedure-2026` · 2026-02-05 · DE · Application
- Fiche cartographique : [DE](https://zoruohorse.github.io/atlas_data_centers/#DE)
- Date d'effet renseignée : 2026-04-01

Les quatre GRT allemands ont engagé une procédure commune dont le premier cycle débute le 1er avril 2026. Les demandes de grandes batteries, centres de données, électrolyseurs et autres consommateurs concernés sont évaluées ensemble par cycles : maîtrise du foncier, autorisations, concept de raccordement, solidité économique et utilité pour le réseau. En cas de sursouscription, les projets les plus mûrs sont retenus. Il s’agit d’une procédure opérationnelle des GRT, distincte d’une loi ; la clarification des bases juridiques est souhaitée par les gestionnaires.

**Opérateurs :** Préparer les justificatifs et respecter les fenêtres de dépôt ; vérifier les modalités propres à chaque GRT.

**Réseau :** Sélection par cycles, sur critères vérifiables, plutôt que selon la seule date de demande.

Sources : [TransnetBW — annonce commune des quatre GRT du 5 février](<https://www.transnetbw.de/de/newsroom/news/uebertragungsnetzbetreiber-fuehren-reifegradverfahren-ein>) (primaire) · [TransnetBW — procédure et documents opérationnels](<https://www.transnetbw.de/de/transparenz/netzzugang-und-entgelt/reifegradverfahren>) (primaire) · [TransnetBW — communiqué commun, version de l’export](<https://www.transnetbw.de/de/newsroom/pressemitteilungen/uebertragungsnetzbetreiber-fuehren-reifegradverfahren-ein>) (primaire). Autres références : voir `de-reifegrad-procedure-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Texas — procédure groupée Batch Zero pour les grandes charges

- Identifiant : `us-tx-batch-zero-2026` · 2026-06-18 · US — Texas — ERCOT · Application
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

La PUCT approuve le 18 juin une procédure d’étude groupée des projets éligibles de 75 MW ou plus. ERCOT indique alors plus de 438 GW de demandes de grandes charges, dont près de 89 % de data centers. Ce sont des demandes, non de la consommation ferme. La procédure étudie la maturité et les effets cumulés ; le classement conditionnel de septembre n’est pas une autorisation définitive.

Sources : [ERCOT — approbation Batch Zero](<https://www.ercot.com/news/release/06182026-puct-approves-ercots>) (primaire) · [ERCOT — classifications conditionnelles](<https://www.ercot.com/services/comm/mkt_notices/M-A080326-04>) (primaire) · [ERCOT — suivi grandes charges](<https://www.ercot.com/services/rq/large-load-integration>) (primaire). Autres références : voir `us-tx-batch-zero-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Virginie — proposition Dominion de file de raccordement des grandes charges

- Identifiant : `us-va-dominion-queue-2026` · 2026-02-02 · US — Virginie — zone desservie par Dominion Energy Virginia · Consultation
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Dominion dépose auprès de la SCC le dossier PUR-2026-00011. La proposition rapportée vise les charges d’environ 100 MW ou plus, avec plafond de 300 MW par demande et études groupées d’environ dix projets. La file de 70 GW comprend environ 25 GW avec dates prévisionnelles jusqu’en 2031 et 45 GW à l’étude : aucun de ces chiffres n’est une consommation certaine. Un témoignage déposé le 2 novembre confirme que la procédure est encore pendante à cette date ; les seuils du projet initial ne sont pas présentés comme définitifs.

**Opérateurs :** La proposition formalise les étapes de maturité, études, développement et exécution.

**Réseau :** Études groupées et réduction du risque d’investissements échoués ; traitement final en attente.

Sources : [Dominion · témoignage déposé à la SEC le 2 novembre 2026](<https://www.sec.gov/Archives/edgar/data/715957/000110465926122035/tm2627455d4_425.htm>) (primaire) · [DCD · proposition de gestion de file Dominion](<https://www.datacenterdynamics.com/en/news/dominion-files-large-load-connection-queue-plan-with-state-regulators/>) (analyse). Autres références : voir `us-va-dominion-queue-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### DOE/FERC — ouverture du dossier fédéral sur les grandes charges

- Identifiant : `us-ferc-rm26-4-2025` · 2025-10-23 · US · Consultation
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Le secrétaire à l’Énergie demande à la FERC d’examiner une réforme des raccordements au réseau de transport interétatique (RM26-4-000). Le seuil indicatif de l’ANOPR est une demande supérieure à 20 MW. La consultation porte notamment sur les délais, les conditions de raccordement et la fiabilité. Il ne s’agit ni d’un transfert général de compétence déjà réalisé, ni d’une règle uniforme entrée en vigueur. Les six procédures ciblées de juin 2026 sont documentées séparément.

**Opérateurs :** Réforme envisagée des procédures de raccordement de grandes charges ; aucun droit automatique à une connexion.

**Réseau :** Débat sur les compétences fédérales et étatiques, les études et la fiabilité.

Sources : [DOE · directives section 403, 23 octobre 2025](<https://www.energy.gov/topics/2025-doe-403-orders>) (primaire) · [FERC · dossier RM26-4-000](<https://ferc.gov/rm26-4?trk=article-ssr-frontend-pulse_little-text-block>) (primaire) · [BFMTV · débat sur les compétences de raccordement](<https://www.bfmtv.com/tech/intelligence-artificielle/l-administration-trump-inquiete-les-etats-americains-car-elle-veut-controler-le-raccordement-au-reseau-electrique-des-data-centers-pour-repondre-aux-besoins-gigantesques-de-l-ia_AV-202512300432.html>) (analyse). Autres références : voir `us-ferc-rm26-4-2025` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### EDF — premiers AMI sur trois anciens sites thermiques

- Identifiant : `fr-edf-ami-thermal-sites-2025` · 2025-03-03 · FR — Seine-et-Marne et Moselle · Projet ou infrastructure
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)

EDF lance deux appels à manifestation d’intérêt : un sur Montereau-Vallée-de-la-Seine (Vernou-la-Celle-sur-Seine et La Grande-Paroisse), l’autre sur La Maxe et Richemont en Moselle. L’objectif est de valoriser du foncier industriel pour des centres de données de grande puissance en s’appuyant notamment sur les infrastructures existantes. Un AMI ne démontre ni la sélection d’un exploitant ni un droit de raccordement ferme. Le programme fast-track et les annonces foncières ultérieures sont documentés séparément.

**Réseau :** Le réemploi de sites industriels peut réduire certains délais et travaux ; la capacité disponible et les conditions d’accès restent à établir projet par projet.

Sources : [EDF — communiqué du 3 mars 2025](<https://www.edf.fr/groupe-edf/espaces-dedies/journalistes/tous-les-communiques-de-presse/edf-lance-des-appels-a-manifestation-d-interet-pour-l-accueil-de-nouveaux-centres-de-donnees-en-france>) (primaire) · [Actu.fr — La Maxe et Richemont](<https://actu.fr/economie/moselle-edf-veut-transformer-ces-deux-anciennes-centrales-en-datacenters-on-vous-explique_62333445.html>) (analyse) · [Mesinfos — site de Montereau](<https://mesinfos.fr/77130-la-grande-paroisse/un-projet-de-centre-de-donnees-lance-pres-de-montereau-fault-yonne-218488.html>) (analyse). Autres références : voir `fr-edf-ami-thermal-sites-2025` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### Italie — plan Terna et 39,62 GW de demandes au 28 février 2025

- Identifiant : `it-terna-development-plan-2025` · 2025-03-14 · IT · Contexte documenté
- Fiche cartographique : [IT](https://zoruohorse.github.io/atlas_data_centers/#IT)

Terna publie son plan de développement 2025–2034 prévoyant plus de 23 milliards d’euros d’investissements réseau sur dix ans, tous usages confondus. Le communiqué chiffre les demandes de raccordement de centres de données à 39,62 GW au 28 février 2025. Le plan vise aussi à accroître les capacités d’échange entre zones de marché. Les demandes ne représentent ni de la capacité accordée ni de la consommation ferme ; les chiffres plus récents restent distincts.

Sources : [Terna — plan de développement du réseau 2025–2034](<https://www.terna.it/en/media/press-releases/detail/2025-development-plan>) (primaire) · [La Repubblica — présentation du plan Terna](<https://www.repubblica.it/economia/2025/03/14/news/terna_investimenti_oltre_23_miliardi_piano_10_anni_rete_data_center_energia-424063149/>) (analyse). Autres références : voir `it-terna-development-plan-2025` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### Espagne — faisabilité de 130 MW annoncée par Solaria

- Identifiant : `es-solaria-grid-feasibility-2025` · 2025-03-17 · ES — Communauté de Madrid et Pays basque · Projet ou infrastructure
- Fiche cartographique : [ES](https://zoruohorse.github.io/atlas_data_centers/#ES)

Solaria annonce avoir obtenu de Red Eléctrica une confirmation de faisabilité d’accès et de raccordement de 130 MW de demande pour deux centres en région madrilène. Le 18 mars, Solaria annonce consolider environ 1 GW de demandes en Espagne, dont 225 MW supplémentaires au Pays basque. Ces annonces de faisabilité et portefeuille ne démontrent pas la mise sous tension ni des consommations constatées ; le dossier du gestionnaire n’a pas été vérifié indépendamment.

Sources : [Solaria — annonce de faisabilité du raccordement, 17 mars](<https://solariaenergia.com/en/solaria-obtains-130-mw-to-connect-two-data-centers-in-the-community-of-madrid/>) (primaire) · [Solaria — portefeuille de demandes, 18 mars](<https://solariaenergia.com/en/solaria-consolidates-1-gw-of-demand-to-connect-data-centers-in-spain/>) (primaire) · [DCmag — analyse de l’annonce Solaria](<https://dcmag.fr/solaria-assure-130-mw-pour-deux-data-centers-a-madrid-en-un-temps-record-comment/>) (analyse). Autres références : voir `es-solaria-grid-feasibility-2025` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### Loi 5356/2026 — cadre spécifique de raccordement des data centers

- Identifiant : `gr-law-5356-2026` · 2026-11-17 · GR · Publication
- Fiche cartographique : [GR](https://zoruohorse.github.io/atlas_data_centers/#GR)

Le texte publié au Journal officiel le 17 novembre institue un dispositif spécifique comprenant un registre, des critères de maturité et une garantie de 200 000 €/MW de capacité maximale. Il prévoit un approvisionnement renouvelable d’au moins 60 % de la consommation annuelle et une contribution locale annuelle de 20 000 €/MW, répartie entre municipalités (75 %) et ménages (25 %). Les modalités transitoires et d’application restent à suivre.

**Opérateurs :** Intégrer les garanties, les coûts de raccordement et de renforcement ainsi que la contribution locale et les contrats d’approvisionnement dans le modèle financier.

**Réseau :** Le nouveau cadre vise à qualifier les demandes et à réduire les réservations spéculatives ; les coûts de raccordement et de renforcement induits sont à la charge des investisseurs selon le dispositif.

Sources : [Journal officiel grec — loi 5356/2026, 17 novembre](<https://api.et.gr/apiLAW/1/2026/5356/pdf>) (primaire) · [Zepos & Yannopoulos — analyse juridique](<https://www.zeya.com/index.php/newsletters/data-centres-greece-new-dedicated-framework-grid-connection>) (analyse) · [DCmag — nouveau dispositif grec](<https://dcmag.fr/la-grece-impose-aux-data-centers-une-contribution-annuelle-de-20-000-euros-par-mw/>) (analyse). Autres références : voir `gr-law-5356-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Concours de capacité d’accès de la demande — RD 1183/2020

- Identifiant : `es-demand-competition-framework` · 2025-07-11 · ES · Application
- Fiche cartographique : [ES](https://zoruohorse.github.io/atlas_data_centers/#ES)
- Date d'effet renseignée : 2025-07-18

Le cadre des articles 20 bis et suivants permet, sous conditions, d’attribuer par concours la capacité de soutirage de certains nœuds du transport à partir de 220 kV lorsque les demandes concurrentes ne peuvent toutes être satisfaites. La première résolution du 11 juillet 2025 porte sur huit nœuds et 3 681 MW, tous usages éligibles. Elle applique un régime transitoire fondé sur les émissions évitées, la date de début de consommation et l’investissement ; garanties de 25 €/kW par critère pour ce concours. Le texte consolidé a évolué depuis ; ne pas extrapoler les critères de cette première procédure à tous les futurs concours. Les résultats de février 2026 sont documentés séparément.

**Opérateurs :** Vérifier si le nœud est soumis à un concours, les critères applicables et les garanties.

**Réseau :** Attribution concurrentielle en situation de capacité rare, distincte du principe chronologique général.

Sources : [BOE — RD 1183/2020, version consolidée](<https://www.boe.es/buscar/act.php?id=BOE-A-2020-17278>) (primaire) · [BOE — résolution du 11 juillet 2025](<https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-14863>) (primaire) · [MITECO — lancement des concours](<https://www.miteco.gob.es/en/prensa/ultimas-noticias/2025/julio/el-miteco-convoca-los-primeros-concursos-de-acceso-de-demanda-a-0.html>) (primaire). Autres références : voir `es-demand-competition-framework` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

## Explorer l'ensemble des documents associés

- [Raccordement](../themes/grid.md)
- [Système électrique](../themes/power.md)
