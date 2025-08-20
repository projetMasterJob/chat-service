# ![Node.js](https://img.shields.io/badge/Node.js-8CC84B?style=flat&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) 

# chat-service

## Description du projet
Ce projet est un service de chat qui permet aux utilisateurs de communiquer en temps réel. Il est construit avec Node.js et Express, offrant une API RESTful pour gérer les interactions de chat. Ce service est conçu pour être extensible et facile à intégrer dans d'autres applications.

### Fonctionnalités clés
- Gestion des messages en temps réel
- API RESTful pour l'intégration facile avec d'autres services
- Architecture modulaire pour une extensibilité et une maintenance simplifiées
- Facilité d'intégration avec d'autres services

## Tech Stack

| Technologie  | Description                                                 |
|--------------|-------------------------------------------------------------|
| Node.js      | Environnement d'exécution JavaScript côté serveur           |
| Express      | Framework web pour Node.js                                  |
| PostgresSQL  | Base de données relationnelle pour le stockage des messages |
| Docker       | Conteneurisation pour faciliter le déploiement              |

## Instructions d'installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (gestionnaire de paquets Node.js)

### Guide d'installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/projetMasterJob/chat-service.git
   cd chat-service
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement si nécessaire. Créez un fichier `.env` à la racine du projet et ajoutez les configurations suivantes :
   ```
    DB_HOST=adresse_de_la_base_de_données
    DB_USER=username
    DB_PASSWORD=password
    DB_NAME=npm_bdd
    DB_PORT=5432
    PORT=5000
   ```

## Utilisation

### Lancer le projet
Pour démarrer le service, exécutez la commande suivante :
```bash
node api/index.js
```

### Exemple d'utilisation
Vous pouvez interagir avec l'API en utilisant des outils comme Postman ou curl. Voici un exemple de requête pour envoyer un message :
```bash
curl -X POST https://chat-service-six-red.vercel.app/api/chat/ -H "Content-Type: application/json" -d '{
    "chat_id" : "90f59a12-5a8c-412b-8536-dfc1b2886bd9" ,
    "sender_id" : "9d6ebe6f-8547-42ea-99f6-c65367c4c1c6",
    "content" : "Hello , world!"
}'
```

## Structure du projet

Voici un aperçu de la structure du projet :

```
chat-service/
├── api/                     # Contient les fichiers de configuration de l'API
│   ├── dev.js              # Configuration de développement
│   └── index.js            # Point d'entrée de l'application
├── controllers/            # Contient les contrôleurs de l'application
│   └── chatController.js    # Logique métier pour gérer les chats
├── db/                     # Contient les fichiers de connexion à la base de données
│   └── connection.js       # Configuration de la connexion à la base de données
├── routes/                 # Contient les définitions des routes de l'API
│   └── chatRoutes.js       # Routes pour gérer les messages de chat
├── .gitignore              # Fichiers à ignorer par Git
├── package.json            # Dépendances et scripts du projet
├── structure.txt           # Documentation de la structure du projet
└── vercel.json             # Configuration pour le déploiement sur Vercel
```

### Explication des fichiers principaux
- **api/index.js** : Point d'entrée de l'application qui initialise le serveur.
- **controllers/chatController.js** : Contient la logique pour gérer les messages de chat.
- **db/connection.js** : Gère la connexion à la base de données.
- **routes/chatRoutes.js** : Définit les routes pour l'API de chat.

## Contribuer
Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre ces étapes :
1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Commitez vos modifications (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

Nous apprécions toutes les contributions et suggestions pour améliorer le projet !