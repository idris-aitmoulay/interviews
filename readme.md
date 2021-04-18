# Test:

## Technical skills (~1h)

Vous devez souvent organiser des réunions de 60 minutes avec vos collègues,
seulement tout le monde a un emploi du temps très chargé. Google agenda vous
donne les indisponibilités de tout le monde, pourquoi ne pas faire en sorte de
trouver ça automatiquement ?

### Format des données

Vous trouverez les données dans le dossier data.

**Entrée**

Chaque ligne est une plage horaire indisponible, au format `d hh:mm-hh:mm`.

`d` est le numéro du jour de la semaine (1 à 5, lundi au vendredi).

`hh:mm-hh:mm` est la plage horaire de ce jour, début et fin incluses.

Les horaires de travail sont du lundi au vendredi de 08:00 à 17:59. Tous les
créneaux indisponibles y sont inclus.

**Sortie**

Une ligne au format `d hh:mm-hh:mm` correspondant à l'horaire de réunion trouvé.
Il doit être:

- en intersection avec aucun créneau d'indisponibilité d'un collègue
- pendant les horaires de travail, sans dépasser
- d'une durée exacte de 60 minutes, début et fin incluses (eg. 14:00-14:59)
- la première solution possible s'il en existe plusieurs

**Exemple**

Pour l'entrée :

```
1 08:45-12:59
3 11:09-11:28
5 09:26-09:56
5 16:15-16:34
3 08:40-10:12
```

La solution est

```
1 13:00-13:59
```

Le premier jour il n'y a qu'un seul créneau indisponible de 08:45 à 12:59. En
faisant par exemple commencer la réunion à 13:00 et en la terminant à 13:59, elle
n'aura aucune intersection avec les créneaux indisponibles.

### Environnement

Vous travaillez avec Node.js v12.18.4

### Tests

Créez un test avec une librairie adéquate en prenant les _inputX.txt_ en entrée
pour vérifier que le résultat de votre fonction correspond aux sorties attendues
dans les _outputX.txt_ dans le dossier data.

### Déploiement

Envoyez votre solution sur un repo git accessible sur Github ou Gitlab puis
envoyez nous le lien de ce repo, avec l'accès si nécessaire.

### Bonus

1. Vous préférez avoir un code standardisé ? Nous aussi. Ajoutez votre
   config préférée.

2. Créez une config CI pour exécuter la commande test sur votre repo à chaque
   modification.


# Test Answer:

to run test execute `npm run test`
to run all use  `npm run start`


---> Pour le test des reviews c'est dans REVIEWS.md

