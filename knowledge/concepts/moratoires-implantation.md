# Moratoires, urbanisme et autorisations

> Vue dérivée automatiquement des JSON du dépôt. Révision documentaire : 2026-11-25. Les statuts reflètent la base, pas une vérification juridique en temps réel. Les sources originales restent la référence. Ne pas modifier cette page à la main.

[Retour à l'index](../index.md)

## Grille de lecture

Ne pas mettre sur le même plan une restriction d'urbanisme, une suspension de permis environnemental, une pause de réservation électrique, une proposition législative et une mobilisation. Comparer le territoire, le seuil, les exceptions et la durée, sans attribuer une règle locale au pays entier.

## Questions à approfondir

- Quel acte exact est suspendu et quelles demandes sont exemptées ?
- Le texte est-il voté, promulgué, applicable, prorogé ou rejeté ?
- Quelle autorité dispose de la compétence ?

## Comparaison des mécanismes déjà évalués

Les évaluations existantes sont reproduites sans créer de nouvelle qualification. Le stade et le périmètre restent déterminants.

| Critère | Périmètre | Stade | Nature | Détail | Référence |
|---|---|---|---|---|---|
| Procédure stratégique | FR | Publication | Procédure | Qualification par décret de certains projets d’intérêt national majeur. | `fr-pinm-2026` · [Texte officiel · Légifrance](<https://www.legifrance.gouv.fr/eli/loi/2026/5/26/2026-403/jo/article_35>) (primaire) |
| Moratoire territorial | NL | Application | Obligation | Restriction nationale sur les hyperscales de plus de 10 ha et d’au moins 70 MW, avec zones désignées. | `nl-hyperscale-bkl-2024` · [Décret et exposé des motifs · Staatsblad](<https://zoek.officielebekendmakingen.nl/stb-2023-492.html>) (primaire) |
| Procédure stratégique | IT | Publication | Procédure | Procédure unique spécifique aux centres de données concernés par l’article 8 du décret-loi 21/2026. | `it-single-permit-2026` · [Loi de conversion 49/2026 · Gazzetta Ufficiale](<https://www.gazzettaufficiale.it/eli/id/2026/04/18/26G00066/SG>) (primaire) |

## Cas documentés

Sélection de lecture, complétée automatiquement par les évaluations existantes. Les résumés ci-dessous sont ceux du référentiel, sans nouvelle interprétation juridique.

### Restriction d’implantation des très grands hyperscales

- Identifiant : `nl-hyperscale-bkl-2024` · 2023-12-20 · NL · Application
- Fiche cartographique : [NL](https://zoruohorse.github.io/atlas_data_centers/#NL)
- Date d'effet renseignée : 2024-01-01

Le Besluit kwaliteit leefomgeving limite les nouveaux hyperscales dont la surface bâtie excède 10 hectares et dont le raccordement électrique atteint au moins 70 MW. Les deux critères sont cumulatifs. Les zones désignées comprennent Eemshaven et Middenmeer.

**Opérateurs :** Vérifier le zonage dès le choix du site et calculer les seuils à l’échelle de l’installation fonctionnelle.

Sources : [Décret et exposé des motifs · Staatsblad](<https://zoek.officielebekendmakingen.nl/stb-2023-492.html>) (primaire) · [Réponse parlementaire · Gouvernement néerlandais](<https://zoek.officielebekendmakingen.nl/kst-29023-AT.html>) (primaire) · [NOS / Nieuwsuur — demandes de raccordement néerlandaises](<https://nos.nl/nieuwsuur/artikel/2635097-een-derde-aangevraagde-stroom-komt-van-datacenters-genoeg-voor-alle-huishoudens>) (analyse). Autres références : voir `nl-hyperscale-bkl-2024` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### New York — moratoire sur les nouveaux grands data centers

- Identifiant : `us-ny-eo62-moratorium-2026` · 2026-07-14 · US — État de New York · Mesure temporaire
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)
- Date d'effet renseignée : 2026-07-14
- Échéance : Achèvement de l’évaluation environnementale et publication des standards ; vérifier la date de levée.

L’Executive Order 62 suspend les demandes de permis discrétionnaires relevant du DEC qui n’étaient pas déjà jugées complètes, pour les grands projets visés (50 MW ou plus selon l’annonce). Le gel accompagne une évaluation environnementale générique prévue sur un horizon maximal d’un an. Les dossiers déjà complets ne sont pas visés de la même façon. Ce n’est pas une interdiction fédérale ni un arrêt de tous les chantiers. Le projet législatif distinct à 20 MW ne doit pas être confondu avec le décret.

Sources : [New York — communiqué du 14 juillet](<https://www.governor.ny.gov/news/first-statewide-moratorium-new-hyperscale-data-centers-launched-governor-kathy-hochul>) (primaire) · [Rochester Beacon — réactions locales](<https://rochesterbeacon.com/2026/07/22/data-center-opponents-see-executive-order-as-partial-win/>) (analyse) · [DCmag — moratoire NY, seuil erroné dans le titre de synthèse](<https://dcmag.fr/letat-de-new-york-a-adopte-un-moratoire-dun-an-sur-les-nouveaux-projets-de-data-centers-de-grande-taille/>) (analyse). Autres références : voir `us-ny-eo62-moratorium-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Maine — projet LD 307 rejeté après veto

- Identifiant : `us-me-ld307-2026` · 2026-04-24 · US — Maine · Texte rejeté
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Le texte voté au printemps prévoyait une pause des permis pour les installations de 20 MW ou plus jusqu’au 1er novembre 2027. La gouverneure oppose son veto le 24 avril, notamment faute d’exception pour un projet engagé à Jay. La Chambre maintient le veto le 29 avril (72 voix contre 65 pour passer outre, majorité qualifiée non atteinte). LD 307 n’est pas devenu loi. Les moratoires municipaux sont distincts. Les articles d’avril antérieurs au veto documentent le vote parlementaire, pas l’entrée en vigueur.

Sources : [Maine — veto du 24 avril](<https://www3.maine.gov/governor/mills/index.php/official_documents/veto_messages/2026-04-ld-307-act-establish-maine-data-center-coordination>) (primaire) · [Maine Legislature — statut final](<https://www.mainelegislature.org/LawMakerWeb/summary.asp?ID=280096138>) (primaire) · [CNET — vote initial Maine](<https://www.cnet.com/tech/services-and-software/maine-could-become-first-state-to-pass-year-long-ban-on-new-large-data-centers/>) (analyse). Autres références : voir `us-me-ld307-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Michigan — propositions de moratoire HB 5594 et HB 5595

- Identifiant : `us-mi-hb5594-5595-2026` · 2026-02-26 · US — Michigan · Annonce officielle
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Après une annonce de Jennifer Wortz fin janvier, les projets HB 5594 et HB 5595 visent respectivement certaines autorisations et l’exploitation de nouveaux centres, et les approbations du régulateur des services publics. Le renvoi en commission du 26 février est documenté ; aucune promulgation n’est confirmée. L’instantané NCSL est conservé séparément.

**Opérateurs :** Risque de suspension des autorisations si les projets aboutissent.

**Réseau :** Une proposition vise les approbations du régulateur, non un gel actuellement établi.

Sources : [Michigan Legislature · HB 5594](<https://legislature.mi.gov/Bills/Bill?ObjectName=2026-HB-5594>) (primaire) · [Michigan Legislature · renvoi en commission](<https://legislature.mi.gov/Committees/CBR?committeeID=1973>) (primaire) · [DCD · annonce de Jennifer Wortz](<https://www.datacenterdynamics.com/en/news/michigan-state-representative-says-she-is-authoring-bill-to-impose-data-center-moratorium/>) (analyse). Autres références : voir `us-mi-hb5594-5595-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Seattle — moratoire municipal sur les data centers de plus de 20 MVA

- Identifiant : `us-seattle-moratorium-2026` · 2026-06-09 · US — Seattle, Washington · Mesure temporaire
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)
- Date d'effet renseignée : 2026-06-09
- Échéance : Fin ou prolongation du moratoire à surveiller.

Le conseil adopte CB 121214 le 9 juin ; ordonnance 127447. Le gel d’un an vise notamment les nouvelles implantations et extensions relevant de la définition locale, avec capacité supérieure à 20 MVA et alimentation sans interruption. Une prolongation de six mois est possible. MVA et MW ne sont pas interchangeables. La politique tarifaire ultérieure de Seattle City Light est distincte.

Sources : [Seattle — vote du 9 juin](<https://council.seattle.gov/2026/06/09/city-council-passes-emergency-data-center-moratorium-and-policy-framework/>) (primaire) · [Seattle City Light — moratoire et politique grandes charges](<https://powerlines.seattle.gov/2026/06/12/getting-ahead-of-data-center-power-demands/>) (primaire) · [DCmag — Seattle, débat initial](<https://dcmag.fr/seattle-veut-un-moratoire-sur-les-datacenters-le-choc-entre-ia-electricite-et-facture-locale/>) (analyse). Autres références : voir `us-seattle-moratorium-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Monterey Park — interdiction municipale des data centers

- Identifiant : `us-monterey-park-ban-2026` · 2026-06-02 · US — Monterey Park, Californie · Application
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Le dossier municipal recense une ordonnance d’urgence du 20 avril et le référendum du 2 juin sur la mesure NDC. La page municipale relative au scrutin de novembre confirme que l’interdiction a été adoptée par les électeurs. Le périmètre est la commune de Monterey Park, non l’ensemble de la Californie.

Sources : [Monterey Park — dossier municipal](<https://montereypark.ca.gov/1710/Data-Center-Information>) (primaire) · [Monterey Park — confirmation de l’interdiction votée](<https://www.montereypark.ca.gov/1757/HOM-Ballot-Measure>) (primaire) · [Engadget — Monterey Park](<https://www.engadget.com/ai/monterey-park-california-has-banned-any-data-centers-within-its-city-limits-180426656.html>) (analyse). Autres références : voir `us-monterey-park-ban-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Oregon — pause des demandes sur les propriétés de l’État

- Identifiant : `us-or-state-land-pause-2026` · 2026-09-08 · US — Oregon · Mesure temporaire
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)
- Date d'effet renseignée : 2026-09-08
- Fin renseignée : 2027-07-01

Les agences doivent suspendre les demandes non approuvées portant sur les servitudes, baux, droits de passage, permis fonciers ou cessions de propriétés publiques pour des projets de data centers, jusqu’au 1er juillet 2027 sauf décision contraire. Cette mesure ne couvre pas à elle seule tous les terrains privés.

Sources : [Oregon — suspension demandes foncières publiques](<https://apps.oregon.gov/oregon-newsroom/OR/GOV/Posts/Post/governor-kotek-pauses-work-on-requests-for-state-land-to-support-new-data-centers>) (primaire). Autres références : voir `us-or-state-land-pause-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Oregon — pause des permis air et eau

- Identifiant : `us-or-environment-permit-pause-2026` · 2026-10-09 · US — Oregon · Mesure temporaire
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)
- Fin renseignée : 2027-07-01

Une lettre de la gouverneure du 9 octobre, rapportée le 13, demande à l’autorité environnementale de suspendre le traitement et la délivrance des permis air et eau pour les nouveaux centres et extensions jusqu’au 1er juillet 2027. Le texte original de la lettre n’a pas été retrouvé dans les résultats accessibles ; la portée est attribuée à la presse. Ce n’est pas une interdiction générale d’exploitation.

Sources : [Oregon — suspension demandes foncières publiques](<https://apps.oregon.gov/oregon-newsroom/OR/GOV/Posts/Post/governor-kotek-pauses-work-on-requests-for-state-land-to-support-new-data-centers>) (primaire) · [Oregon Capital Chronicle — permis environnementaux](<https://oregoncapitalchronicle.com/2026/10/13/oregon-governor-orders-pause-on-environmental-permits-to-build-or-expand-data-centers/>) (analyse). Autres références : voir `us-or-environment-permit-pause-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Décret 2026-146 — critères de saisine de la CNDP

- Identifiant : `fr-cndp-decree-2026` · 2026-03-02 · FR · Application
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)
- Date d'effet renseignée : 2026-03-04

Le décret publié le 3 mars modifie le tableau de l’article R.121-2 du code de l’environnement : pour les lignes de tension au moins égale à 400 kV, le critère de saisine vise désormais les longueurs aériennes supérieures à 10 km. L’article 1 s’applique aux projets n’ayant pas déjà fait l’objet d’une saisine au 4 mars. Cela peut concerner des raccordements souterrains de data centers, sans retirer globalement les centres de données du droit de la participation publique ni supprimer les évaluations environnementales.

**Opérateurs :** Vérifier le régime applicable à l’infrastructure et les autres obligations de consultation.

**Réseau :** Modification ciblée des critères de saisine, non exemption générale des projets de réseau.

Sources : [Légifrance — décret n°2026-146](<https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053607764>) (primaire) · [Assemblée nationale — réponse à la question 10223](<https://questions.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE10223>) (primaire) · [DCmag — modification des critères de saisine de la CNDP](<https://dcmag.fr/publication-du-decret-qui-retire-datacenters-et-infrastructures-electriques-strategiques-du-champ-de-la-cndp/>) (analyse). Autres références : voir `fr-cndp-decree-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Ohio — initiative citoyenne de restriction des centres de plus de 25 MW

- Identifiant : `us-oh-state-petition-2026` · 2026-03-16 · US — Ohio · Mobilisation
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

La pétition déposée le 16 mars propose une modification de la Constitution de l’Ohio pour empêcher la construction de nouveaux centres dont la demande agrégée dépasse 25 MW. Le procureur général certifie le titre et le résumé le 26 mars ; ce n’est pas un vote d’adoption. Selon l’OEDA, l’initiative n’a pas obtenu sa qualification au scrutin de novembre 2026 et les promoteurs visent 2027. Les scrutins municipaux sont distincts.

Sources : [Ohio Attorney General · certification du titre et du résumé](<https://www.ohioattorneygeneral.gov/Media/News-Releases/March-2026/Title-and-Summary-Certified-for-Proposed-Prohibiti>) (primaire) · [Ohio Economic Development Association · état de la procédure](<https://ohioeda.com/datacenters/>) (analyse) · [The Register · pétition de mars](<https://www.theregister.com/2026/03/18/ohio_datacenter_petition/>) (analyse). Autres références : voir `us-oh-state-petition-2026` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### Qualification de projet d’intérêt national majeur

- Identifiant : `fr-pinm-2026` · 2026-05-26 · FR · Publication
- Fiche cartographique : [FR](https://zoruohorse.github.io/atlas_data_centers/#FR)

L’article 35 ouvre à certains centres de données la possibilité d’être qualifiés par décret de projets d’intérêt national majeur selon leur envergure et leur contribution à la transition ou à la souveraineté. Cela donne accès à des procédures d’urbanisme adaptées. Le communiqué de France Datacenter du 15 avril salue le vote parlementaire ; cette date n’est pas celle de promulgation de la loi.

Sources : [Texte officiel · Légifrance](<https://www.legifrance.gouv.fr/eli/loi/2026/5/26/2026-403/jo/article_35>) (primaire) · [Code de l’urbanisme consolidé · Légifrance](<https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054702361/2026-08-19>) (primaire) · [Sénat — réponse ministérielle du 19 novembre](<https://www.senat.fr/questions/base/2026/qSEQ261010331.html>) (primaire). Autres références : voir `fr-pinm-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Procédure unique d’autorisation des centres de données

- Identifiant : `it-single-permit-2026` · 2026-04-10 · IT · Publication
- Fiche cartographique : [IT](https://zoruohorse.github.io/atlas_data_centers/#IT)

Le décret-loi 21/2026, converti par la loi 49/2026, instaure une procédure unique pour la réalisation, l’extension et l’exploitation des projets concernés. Le ministère a publié ses premières consignes opérationnelles en juillet.

**Opérateurs :** Constituer un dossier unique et documenter dès le départ les pièces nécessaires aux évaluations environnementales.

Sources : [Loi de conversion 49/2026 · Gazzetta Ufficiale](<https://www.gazzettaufficiale.it/eli/id/2026/04/18/26G00066/SG>) (primaire) · [Décret-loi 21/2026 · Gazzetta Ufficiale](<https://www.gazzettaufficiale.it/eli/id/2026/02/20/26G00041/sg>) (primaire) · [Consignes officielles · MASE](<https://va.mite.gov.it/en-GB/Comunicazione/DettaglioDirezione/6300>) (primaire). Autres références : voir `it-single-permit-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

## Explorer l'ensemble des documents associés

- [Implantation](../themes/planning.md)
- [Territoires](../themes/territory.md)
