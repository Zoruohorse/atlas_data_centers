# Garanties financières, attribution des coûts et fiscalité

> Vue dérivée automatiquement des JSON du dépôt. Révision documentaire : 2026-11-25. Les statuts reflètent la base, pas une vérification juridique en temps réel. Les sources originales restent la référence. Ne pas modifier cette page à la main.

[Retour à l'index](../index.md)

## Grille de lecture

Distinguer frais de dossier, acompte, garantie remboursable, contribution de raccordement, tarif électrique, fiscalité et engagement volontaire. Les montants exprimés par MW ne sont comparables qu'après vérification de l'assiette, de la devise, du moment et des conditions de restitution.

## Questions à approfondir

- Qui finance les renforcements et selon quelle règle ?
- Les garanties sont-elles restituables et à quels jalons ?
- Le dispositif vise-t-il spécifiquement les data centers ou toutes les grandes charges ?

## Comparaison des mécanismes déjà évalués

Les évaluations existantes sont reproduites sans créer de nouvelle qualification. Le stade et le périmètre restent déterminants.

| Critère | Périmètre | Stade | Nature | Détail | Référence |
|---|---|---|---|---|---|
| Fiscalité spécifique | FI | Application | Obligation | Passage de la classe réduite II au taux général I le 1ᵉʳ juillet 2026. | `fi-electricity-tax-2026` · [Loi 1352/2025 · Finlex](<https://www.finlex.fi/api/media/statute/898552/mainPdf/main.pdf?timestamp=2025-12-29T07%3A54%3A55.090Z>) (primaire) |
| Fiscalité spécifique | SE | Application | Obligation | Suppression de la déduction ou du remboursement sectoriel en juillet 2023. | `se-electricity-tax-2023` · [Règle fiscale · Skatteverket](<https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.18e1b10334ebe8bc8000843.html>) (primaire) |
| Garanties financières | GR | Publication | Obligation | Garantie de 200 000 €/MW de puissance maximale, modalités de réduction et de restitution prévues par la loi. | `gr-law-5356-2026` · [Journal officiel grec — loi 5356/2026, 17 novembre](<https://api.et.gr/apiLAW/1/2026/5356/pdf>) (primaire) |
| Fiscalité spécifique | GR | Publication | Obligation | Contribution locale annuelle de 20 000 €/MW de capacité maximale. | `gr-law-5356-2026` · [Journal officiel grec — loi 5356/2026, 17 novembre](<https://api.et.gr/apiLAW/1/2026/5356/pdf>) (primaire) |
| Garanties financières | PL | Application | Obligation | Frais de dossier, acompte et garantie d’exécution distincts, sous conditions légales ; réforme générale des raccordements >1 kV, non garantie bancaire spécifique aux centres de données. | `pl-energy-law-2026` · [Loi Dz.U. 2026, poz. 516 · Journal officiel polonais](<https://eli.gov.pl/eli/DU/2026/516/ogl>) (primaire) |

## Cas documentés

Sélection de lecture, complétée automatiquement par les évaluations existantes. Les résumés ci-dessous sont ceux du référentiel, sans nouvelle interprétation juridique.

### Réforme générale de l’accès au réseau électrique

- Identifiant : `pl-energy-law-2026` · 2026-03-13 · PL · Application
- Fiche cartographique : [PL](https://zoruohorse.github.io/atlas_data_centers/#PL)
- Date d'effet renseignée : 2026-04-30

La loi du 13 mars 2026 modifie le droit polonais de l’énergie, notamment en introduisant des conventions de raccordement flexibles et en révisant les conditions financières de certaines demandes. Son champ dépasse les data centers. La loi publiée le 15 avril entre généralement en vigueur le 30 avril 2026, avec exceptions et dispositions transitoires applicables le 16 octobre. Pour les demandes concernées sur des réseaux de tension nominale supérieure à 1 kV : frais de dossier de 1 PLN/kW plafonnés à 100 000 PLN, acompte de 60 PLN/kW plafonné à 6 M PLN, et garantie d’exécution distincte de 30 PLN/kW jusqu’à 100 MW puis 60 PLN/kW pour la fraction supérieure, plafonnée à 12 M PLN, sous réserve des exceptions légales. Il s’agit d’une réforme générale du raccordement, non d’une taxe spécifique aux data centers.

**Opérateurs :** Vérifier les frais, acomptes, garanties et dispositions transitoires applicables à la demande ; distinguer les trois instruments.

**Réseau :** Les engagements financiers visent à limiter les demandes spéculatives ; les conditions délivrées ne constituent pas des capacités effectivement raccordées.

Sources : [Loi Dz.U. 2026, poz. 516 · Journal officiel polonais](<https://eli.gov.pl/eli/DU/2026/516/ogl>) (primaire) · [Référentiel législatif · URE](<https://www.ure.gov.pl/pl/urzad/prawo/ustawy/17%2CUstawa-z-dnia-10-kwietnia-1997-r-Prawo-energetyczne.html>) (primaire) · [Portail gouvernemental — modalités de demande et garanties](<https://www.gov.pl/web/kontaktoze/wniosek-o-wydanie-warunkow-przylaczenia-do-sieci-elektroenergetycznej>) (primaire). Autres références : voir `pl-energy-law-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Loi 5356/2026 — cadre spécifique de raccordement des data centers

- Identifiant : `gr-law-5356-2026` · 2026-11-17 · GR · Publication
- Fiche cartographique : [GR](https://zoruohorse.github.io/atlas_data_centers/#GR)

Le texte publié au Journal officiel le 17 novembre institue un dispositif spécifique comprenant un registre, des critères de maturité et une garantie de 200 000 €/MW de capacité maximale. Il prévoit un approvisionnement renouvelable d’au moins 60 % de la consommation annuelle et une contribution locale annuelle de 20 000 €/MW, répartie entre municipalités (75 %) et ménages (25 %). Les modalités transitoires et d’application restent à suivre.

**Opérateurs :** Intégrer les garanties, les coûts de raccordement et de renforcement ainsi que la contribution locale et les contrats d’approvisionnement dans le modèle financier.

**Réseau :** Le nouveau cadre vise à qualifier les demandes et à réduire les réservations spéculatives ; les coûts de raccordement et de renforcement induits sont à la charge des investisseurs selon le dispositif.

Sources : [Journal officiel grec — loi 5356/2026, 17 novembre](<https://api.et.gr/apiLAW/1/2026/5356/pdf>) (primaire) · [Zepos & Yannopoulos — analyse juridique](<https://www.zeya.com/index.php/newsletters/data-centres-greece-new-dedicated-framework-grid-connection>) (analyse) · [DCmag — nouveau dispositif grec](<https://dcmag.fr/la-grece-impose-aux-data-centers-une-contribution-annuelle-de-20-000-euros-par-mw/>) (analyse). Autres références : voir `gr-law-5356-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Texas — normes de raccordement des grandes charges §25.194

- Identifiant : `us-tx-25-194-2026` · 2026-10-02 · US — Texas — ERCOT · Publication
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

La règle adoptée publiée au Texas Register du 2 octobre met en œuvre SB 6. Elle concerne notamment les nouvelles installations non mises sous tension de 75 MW ou plus et prévoit un accord intermédiaire, des informations à fournir et une garantie financière de 50 000 USD/MW avant inclusion dans une étude ERCOT. Les exceptions et les dispositions transitoires doivent être examinées. La date d’effet exacte n’a pas été confirmée dans les éléments accessibles ; le brouillon de mars ne vaut pas texte final.

**Opérateurs :** Documenter la maturité et prévoir la garantie ; 50 000 USD/MW ne constitue pas un tarif de consommation.

Sources : [Texas Register — règle adoptée §25.194](<https://www.sos.texas.gov/texreg/archive/October22026/Adopted%20Rules/16.ECONOMIC%20REGULATION.html>) (primaire) · [Greenberg Traurig — projet §25.194](<https://www.gtlaw.com/en/insights/2026/3/texas-senate-bill-6-update-what-data-centers-large-load-customers-should-know-about-proposed-interconnection-standards>) (analyse). Autres références : voir `us-tx-25-194-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Virginie — taxe sur la consommation électrique des data centers

- Identifiant : `us-va-electricity-tax-2026` · 2026-07-01 · US — Virginie · Application
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)
- Date d'effet renseignée : 2026-07-01
- Fin renseignée : 2028-06-30

Le budget HB30 (session spéciale I, item 3-5.24) impose aux exploitants concernés 0,011 USD/kWh consommé du 1er juillet 2026 au 30 juin 2028. Le plafond annuel de 600 millions USD concerne le versement des recettes au fonds général, non un plafond individuel de taxation. Les obligations d’enregistrement et le champ des opérateurs sont précisés par la SCC.

Sources : [Virginia SCC — taxe et enregistrement](<https://scc.fr.virginia.gov/regulated-industries/public-taxation/taxes-and-fees/>) (primaire) · [DCmag — taxe Virginie](<https://dcmag.fr/la-virginie-instaure-une-taxe-inedite-sur-lelectricite-consommee-par-les-data-centers/>) (analyse) · [Politico — vote budgétaire Virginie](<https://www.politico.com/newsletters/power-switch/2026/06/22/a-new-tax-in-data-center-alley-00969932>) (analyse). Autres références : voir `us-va-electricity-tax-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Virginie — attribution des coûts de nouvelles infrastructures de transport

- Identifiant : `us-va-scc-transmission-costs-2026` · 2026-08-05 · US — Virginie · Publication
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Le 5 août, la gouverneure annonce une décision SCC imposant aux grands consommateurs concernés de supporter les infrastructures de transport requises pour leurs projets. Le FT rapporte un recours de Microsoft ; la décision de justice et le champ précis des modalités financières restent à vérifier. Ne pas assimiler l’annonce à une garantie chiffrée d’économies pour les ménages.

Sources : [Gouverneure de Virginie — décision SCC](<https://www.governor.virginia.gov/newsroom/news-releases/2026/august-releases/name-1122057-en.html>) (primaire) · [TechRadar — coûts de réseau Virginie](<https://www.techradar.com/pro/virginia-cracks-down-on-electricity-firms-hiking-prices-for-ai-data-centers-move-could-save-hundreds-of-millions-of-dollars-for-everyday-users>) (analyse) · [FT — recours Microsoft rapporté](<https://www.ft.com/content/f86672dd-5ee5-46f6-8419-3c959814dd1c?syn-25a6b1a6=1>) (analyse). Autres références : voir `us-va-scc-transmission-costs-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Power for the People Act — proposition de protection tarifaire

- Identifiant : `us-power-for-people-act-2026` · 2026-01-15 · US · Annonce officielle
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Le sénateur Chris Van Hollen et ses cosignataires présentent un texte demandant notamment l’évaluation de classes tarifaires spécifiques par les États, une règle FERC sur l’imputation des renforcements locaux aux data centers et des incitations à la production additionnelle, au stockage et à la flexibilité. Aucune promulgation n’est confirmée ; ce projet est distinct de POWER Up Act et de H.R.9340.

**Opérateurs :** Possibles obligations d’imputation des coûts et incitations à la flexibilité si le texte aboutit.

**Réseau :** Amélioration proposée des prévisions et de la qualification des demandes.

Sources : [Sénat · présentation du Power for the People Act](<https://www.vanhollen.senate.gov/news/press-releases/van-hollen-leads-new-bill-to-ensure-americans-arent-footing-the-bill-for-big-data-centers>) (primaire) · [New York Times · propositions de protection tarifaire](<https://www.nytimes.com/2026/01/15/business/energy-environment/data-center-energy-electricity-costs.html>) (analyse). Autres références : voir `us-power-for-people-act-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### États-Unis — signature du Ratepayer Protection Pledge

- Identifiant : `us-ratepayer-pledge-2026` · 2026-03-04 · US · Contexte documenté
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

Après l’annonce présidentielle de février, sept entreprises technologiques adhèrent le 4 mars à un engagement de financer les besoins de production et de réseau liés à leurs centres, négocier des structures tarifaires distinctes et soutenir la fiabilité. L’élargissement annoncé le 23 juillet est documenté par la Maison-Blanche. L’engagement reste volontaire : il ne vaut ni loi fédérale, ni preuve de l’exécution des engagements ou d’une baisse effective des factures.

Sources : [Maison-Blanche · Ratepayer Protection Pledge signé le 4 mars](<https://www.whitehouse.gov/releases/2026/03/ratepayer-protection-pledge/>) (primaire) · [Maison-Blanche · modalités de l’engagement](<https://www.whitehouse.gov/fact-sheets/2026/03/fact-sheet-president-donald-j-trump-advances-energy-affordability-with-the-ratepayer-protection-pledge/>) (primaire) · [Maison-Blanche · élargissement du 23 juillet](<https://www.whitehouse.gov/releases/2026/07/president-trumps-ratepayer-protection-pledge-secures-american-ai-dominance-protects-consumers/>) (primaire). Autres références : voir `us-ratepayer-pledge-2026` dans [events.json](../../data/events.json) et [sources.json](../../data/sources.json).

### Ratepayer Protection Act H.R.9340 — adopté par la Chambre

- Identifiant : `us-hr9340-2026` · 2026-09-16 · US · Adoption
- Fiche cartographique : [US](https://zoruohorse.github.io/atlas_data_centers/?view=world#US)

La Chambre adopte le texte le 16 septembre (vote 312), visant les consommateurs numériques de pointe de 100 MW ou plus sur un site ou campus. Le texte porte sur la protection des autres consommateurs et le suivi des coûts, non une nouvelle obligation immédiate applicable à tous les sites. La promulgation n’est pas confirmée.

Sources : [Chambre — vote officiel H.R.9340](<https://clerk.house.gov/Votes/2026312?BillNum=H.R.9340>) (primaire) · [Représentant Cloud — périmètre H.R.9340](<https://cloud.house.gov/positions/ratepayer-protection-act>) (primaire) · [Le Parisien — vote H.R.9340](<https://www.leparisien.fr/international/etats-unis/nimposez-pas-ce-cout-aux-familles-les-etats-unis-legiferent-contre-les-centres-de-donnees-qui-suscitent-la-colere-17-09-2026-JZDD7GISWVAULNY72JIV52WHMM.php>) (analyse). Autres références : voir `us-hr9340-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Québec — projet de tarif CD pour les grands centres de données

- Identifiant : `ca-quebec-dc-tariff-2026` · 2026-02-19 · CA — Québec · Consultation
- Fiche cartographique : [CA](https://zoruohorse.github.io/atlas_data_centers/?view=world#CA)
- Échéance : Décision au fond à surveiller.

Hydro-Québec propose un prix unitaire moyen de 13 cents canadiens/kWh, environ le double du tarif de grande puissance de référence, pour les centres concernés (seuil de puissance autorisée d’au moins 5 MW). Une transition de cinq ans est proposée pour les clients existants. L’audience débute le 1er octobre. Le dossier R-4333-2026 est indiqué en cours lors de la vérification du 25 novembre : ne pas présenter le tarif proposé comme approuvé.

**Opérateurs :** Réévaluer les coûts d’électricité si le tarif est approuvé.

**Réseau :** Objectif annoncé de faire supporter aux nouvelles charges les coûts liés à leur demande.

Sources : [Hydro-Québec — proposition du 19 février](<https://nouvelles.hydroquebec.com/nouvelles/communiques/tout-quebec/tarifs-centres-donnees-chaines-blocs-refleteront-valeur-electricite-renouvelable.html?trk=article-ssr-frontend-pulse_little-text-block>) (primaire) · [Régie — dossier R-4333-2026](<https://www.regie-energie.qc.ca/fr/participants/dossiers/r-4333-2026>) (primaire) · [La Presse — audience tarifaire](<https://www.lapresse.ca/affaires/entreprises/2026-10-01/hydro-quebec-souhaite-doubler-le-tarif-energetique-pour-les-centres-de-donnees.php>) (analyse). Autres références : voir `ca-quebec-dc-tariff-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Fin du taux réduit d’accise sur l’électricité

- Identifiant : `fi-electricity-tax-2026` · 2026-07-01 · FI · Application
- Fiche cartographique : [FI](https://zoruohorse.github.io/atlas_data_centers/#FI)
- Date d'effet renseignée : 2026-07-01

L’électricité consommée par les centres de données est passée de la classe fiscale II à la classe générale I le 1ᵉʳ juillet 2026.

**Opérateurs :** Recalculer le coût de l’électricité selon le taux général.

Sources : [Loi 1352/2025 · Finlex](<https://www.finlex.fi/api/media/statute/898552/mainPdf/main.pdf?timestamp=2025-12-29T07%3A54%3A55.090Z>) (primaire) · [Application · Administration fiscale finlandaise](<https://www.vero.fi/yritykset-ja-yhteisot/verot-ja-maksut/valmisteverotus/sahkovero/>) (primaire) · [Explication · Gouvernement finlandais](<https://valtioneuvosto.fi/en/-/government-safeguards-finland-s-competitiveness-in-attracting-data-centre-investments>) (primaire). Autres références : voir `fi-electricity-tax-2026` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

### Suppression de la réduction d’accise pour les data centers

- Identifiant : `se-electricity-tax-2023` · 2023-07-01 · SE · Application
- Fiche cartographique : [SE](https://zoruohorse.github.io/atlas_data_centers/#SE)
- Date d'effet renseignée : 2023-07-01

Depuis le 1ᵉʳ juillet 2023, les data centers ne peuvent plus bénéficier de la déduction ou du remboursement de taxe énergétique lié à l’électricité consommée dans les salles informatiques.

**Opérateurs :** Prévoir le coût de l’électricité sans l’ancien allègement sectoriel.

Sources : [Règle fiscale · Skatteverket](<https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.18e1b10334ebe8bc8000843.html>) (primaire) · [Historique de la décision · Riksdag](<https://data.riksdagen.se/dokumentstatus/ha01nu11.html>) (primaire). Autres références : voir `se-electricity-tax-2023` dans [regulations.json](../../data/regulations.json) et [sources.json](../../data/sources.json).

## Explorer l'ensemble des documents associés

- [Raccordement](../themes/grid.md)
- [Fiscalité](../themes/tax.md)
