# Audit sémantique et maintien de la connaissance

## Deux niveaux complémentaires

**Niveau 1 — automatique, sans IA ni API externe.** Le script `scripts/audit-data.mjs` lit les collections JSON et produit une file de vérification. Il détecte les échéances/fin d'application dépassées, un stade effectif associé à une date future, les mesures temporaires anciennes sans date de fin, les consultations ou annonces anciennes, les publications sans date d'effet, les dates à l'année, les titres identiques, le classement américain manquant ou incohérent, les évaluations historiques et les sources primaires manquantes. Il compte aussi les lacunes documentaires et sources non reliées. Il ne modifie jamais les données.

| Priorité | Signification | Traitement |
|---|---|---|
| P1 | Incohérence potentielle ou échéance atteinte | Vérification prioritaire auprès de l'autorité compétente |
| P2 | Suivi d'un texte/projet ancien ou doublon possible | Recherche de suite institutionnelle, portée ou versions |
| P3 | Complétude documentaire | Préciser si une source le permet, sans inventer |

Seuils de tri : 90 jours pour consultations et mesures temporaires sans fin renseignée, 180 jours pour annonces/adoptions intermédiaires et publications sans date d'effet. Ces seuils sont des choix de maintenance, pas des délais juridiques. Une échéance passée n'implique pas l'abrogation. Les documents datés à l'année ne sont pas artificiellement datés. Les alertes peuvent être des faux positifs et des omissions subsister.

```sh
npm run audit
npm run audit -- --as-of=2026-11-26
npm run audit -- --as-of=2026-11-26 --format=json
npm run audit -- --as-of=2026-11-26 --format=markdown > /tmp/audit-atlas.md
npm run knowledge:build
npm run validate
```

L'audit utilise la date UTC courante par défaut. `--as-of` fige la date des règles de vieillissement, **pas** l'état historique de la base : le rapport s'applique toujours aux JSON présents. La CI existante lance la validation et les tests à chaque PR/push main ; les alertes documentaires ne font pas échouer la CI. Un audit daté peut être archivé sous `knowledge/audits/` sans réécrire un rapport historique.

## Niveau 2 — revue sémantique par un agent avec sources

À chaque lot et au moins une fois par mois lorsque la veille est active, faire relire les P1/P2 prioritaires par un agent capable de consulter les sources et de préparer une PR. Le dépôt ne possède pas de service LLM autonome, ni de clé d'API. La CI ne prétend pas vérifier le droit en ligne. La revue de fond est lancée explicitement par un utilisateur ou un agent autorisé.

1. **Temporalité** : contrôler le statut actuel, les versions, la promulgation, les dates d'effet, les prorogations, les recours et les dispositions transitoires auprès des autorités.
2. **Contradictions** : comparer les résumés portant sur un même texte, les évaluations, les sources officielles et les commentaires. Établir la différence entre deux périmètres, dates ou unités avant de conclure à une erreur.
3. **Sources** : ouvrir les références primaires ; si un lien est cassé ou inaccessible, rechercher un équivalent officiel, conserver la référence historique et indiquer la limite. Ne pas prétendre avoir vérifié une source seulement parce qu'elle existe dans le registre.
4. **Qualification** : distinguer restriction électrique, urbanisme, fiscalité, engagement volontaire, proposition, opposition et décision. Vérifier les seuils MW IT/MW d'accès/MVA, périmètres territorial/fédéral/UE et le mécanisme du comparateur.
5. **Relations et couverture** : examiner les acteurs, liens orphelins, relations explicites, doublons sémantiques, pays sans documentation directe et sujets insuffisamment étayés. Une lacune n'est pas une conclusion négative.
6. **Résolution** : pour chaque alerte étudiée, noter ID, règle, date, sources consultées, constat (confirmé / infirmé / incertain / non pertinent), justification, changement proposé ou absence de changement. Conserver les divergences non résolues. Ne pas supprimer d'historique ni corriger sur simple présomption.

## Livrable de revue

Créer `knowledge/audits/AAAA-MM-JJ-revue.md` avec le périmètre réellement vérifié, les résultats, les sources et limites. Si des modifications sont étayées, suivre AGENTS.md : delta JSON, journal de veille, régénération du wiki, tests, pull request. Un rapport automatique et une revue documentaire sont des objets différents. Les seuils de contrôle sont modifiables dans le script et doivent être testés.
