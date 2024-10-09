# Projet : Site E-Commerce Alten

## Présentation

Ce projet est une plateforme de e-commerce pour Alten, visant à gérer les listes de produits et les interactions avec les clients. Il comprend des tâches à la fois front-end et back-end. Selon votre rôle, veuillez suivre les sections correspondantes :

## Front-end (Angular)

### Fonctionnalités Implémentées :

1. **Liste des Produits** :
   - Affiche tous les détails pertinents des produits dans une vue de liste.
   - Pagination.
2. **Ajouter au Panier** :
   - Permet aux utilisateurs d'ajouter des produits à leur panier directement depuis la liste des produits.
3. **Retirer du Panier** :
   - Permet aux utilisateurs de retirer des articles de leur panier.
4. **Badge de Panier** :
   - Affiche le nombre d'articles dans le panier sous forme de badge.
5. **Voir les Détails du Panier** :
   - Affiche la liste détaillée des produits dans le panier.
6. **Page de Contact** :
   - Ajout d'un nouveau menu "Contact" dans la barre latérale.
   - Création d'une page "Contact" incluant un formulaire pour soumettre un email et un message.
   - La validation du formulaire garantit que les deux champs sont obligatoires, avec un message limité à 300 caractères.
   - Affiche le message de succès : "Demande de contact envoyée avec succès" lorsque le formulaire est soumis.

## Back-end (Spring Boot)

### Fonctionnalités Implémentées :

1. **API de Gestion des Produits** :
   - **POST /products** : Point de terminaison pour créer un nouveau produit.
   - **GET /products** : Récupère tous les produits.
   - **GET /products/:id** : Récupère des informations détaillées pour un produit spécifique.
   - **PUT /products/:id** : Met à jour les détails du produit s'il existe.
   - **DELETE /products/:id** : Supprime un produit en fonction de son ID.

2. **Modèle de Produit** :
   - Une classe `Product` a été implémentée avec des champs tels que :
     - `id`, `code`, `name`, `description`, `image`, `category`, `price`, `quantity`, `internalReference`, `shellId`, `inventoryStatus`, `rating`, `createdAt`, `updatedAt`.


3. **Intégration de la Base de Données** :
   - Connexion à une base de données MySQL pour gérer les données des produits.

4. **Validation et Gestion des Erreurs** :
   - Inclut la gestion des erreurs pour les ID de produits invalides ou les champs obligatoires manquants lors de la création d'un produit.

5. **Documentation + Test** :
   - Mise en œuvre avec Swagger pour les tests et la validation de l'API.