# Concevez une carte interactive de location de vélos

Vous devez développer une page de type "Single page Application" simulant la réservation de vélos dans une ville. Ces vélos sont répartis dans de nombreuses stations dans la ville. L'utilisateur doit pouvoir réserver un vélo depuis son navigateur (à condition qu'il reste des vélos disponibles à la station !). La réservation est alors temporairement enregistrée sur le navigateur du visiteur.

Cette application doit notamment, en s'appuyant sur JavaScript, afficher une carte avec la liste des stations de location de vélos disponibles dans la ville. 

**L’application doit être développée en JavaScript côté client. Vous ne devez écrire aucun code côté serveur (l’utilisation de PHP ou d'un serveur Node.js, notamment, est interdite).**

## Instructions

### Diaporama

Vous devez afficher en haut de la page un diaporama de photos et de textes expliquant le fonctionnement de l'application. La logique du diaporama doit être écrite par vos soins. L’utilisation de tout plugin automatisant la logique de l’application est proscrite.

Le diaporama passe automatiquement à la diaporama suivante toutes les 5 secondes. L’utilisateur peut toutefois choisir de mettre le diaporama en pause. Il peut également reculer ou avancer manuellement à l’aide d’un clic de souris, ainsi qu’avec les touches gauche et droite de son clavier.

### Carte des vélos

En-­dessous du diaporama se trouve une carte affichant en temps réel la liste des stations de location de vélos ainsi que leur disponibilité.  La localisation de toutes les stations de vélos est affichée à l’aide de marqueurs.

La localisation et l'état de chaque station (ouverte, en travaux, combien de vélos et de places sont disponibles, etc.) est fourni via la [plateforme OpenData](https://developer.jcdecaux.com/) de JC Decaux.

**Les données doivent provenir de l'API temps réel.**

Un clic sur un marqueur affiche l’état de la station dans un panneau construit en HTML et CSS à côté de la carte. 

La carte doit être générée dynamiquement via un service de cartographie. Pour vous aider, voici une liste d'API de cartographie disponibles gratuitement :

- [OpenStreetMap](https://wiki.openstreetmap.org/wiki/Overpass_API)
- [OpenLayers](https://openlayers.org/)
- [LeafletJS](https://leafletjs.com/)
- [MapQuest](https://developer.mapquest.com/)
- [Mapbox](https://www.mapbox.com/documentation/)

### Réservation d'un vélo

Il doit être possible de réserver un vélo disponible à la station sélectionnée en :

- indiquant son nom et son prénom,
- signant dans un champ libre implémenté à l’aide de l’API HTML5 Canvas.

**Vous devez écrire vous même le code du Canvas. Aucun plugin n’est autorisé. Vous devez être capable d’expliquer votre code lors de la soutenance.**

Une fois la réservation validée,  un vélo est marqué comme réservé à cette station.

**Pour ce projet, la réservation ne sera pas communiquée à un serveur. Seul le navigateur de l'utilisateur "retiendra" que le vélo a été réservé.**

Les données de réservation seront stockées dans le navigateur à l’aide de l’[API Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API) et affichées en dessous du panneau. L'état de la réservation (s’il y en a une) est ainsi affiché, avec un décompte dynamique du temps restant avant expiration de la réservation.

Une réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme.

**Le nom et le prénom sont toutefois conservés par le navigateur pour préremplir le formulaire de réservation lors d'un prochain usage, même si le navigateur a été fermé.**

Il ne peut y avoir qu'une réservation à la fois. Si une nouvelle réservation a lieu, elle remplace la précédente.

## Contraintes techniques

Le code JavaScript doit être conçu en [Programmation Orientée Objet](https://developer.mozilla.org/fr/docs/Web/JavaScript/Introduction_%C3%A0_JavaScript_orient%C3%A9_objet)

Vous pouvez vous appuyer sur :

- une librairie CSS telle que Bootstrap ou pure css,
- une bibliothèque telle que jQuery pour manipuler le DOM.

**Aucun plugin jQuery (ou autre) ne doit être utilisé pour la logique du diaporama.**

Le code doit exploiter une API cartographique et l'API temps réel de [API JCDecaux](https://developer.jcdecaux.com/). Il doit également utiliser les API Web Storage et Canvas.

### Ressources complémentaires

En plus des cours du parcours, vous pouvez consulter des ressources extérieures pour vous aider. Par exemple, la [documentation du Mozilla Developer Network](https://developer.mozilla.org/fr/docs/Web/HTML/Canvas) sur l’élément [<canvas>](https://developer.mozilla.org/fr/docs/Web/HTML/Element/canvas).

