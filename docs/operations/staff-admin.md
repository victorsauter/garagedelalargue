# Guide personnel — ajouter une voiture

1. Ouvrir `/admin` et se connecter.
2. **Nouveau véhicule**. Renseigner catégorie (voitures / utilitaires), marque, modèle, année, km, énergie, boîte, prix TTC (et HT pour les utilitaires), garantie, texte **en français**.
3. Enregistrer, puis ajouter les **photos** (plusieurs fichiers).
4. Bouton **Traduire FR → DE/EN** si DeepL est configuré, sinon coller/adapter les textes DE et EN à la main, enregistrer.
5. Statut **published** : la fiche est en ligne sur le site (`/fr/occasions/...`).
6. Panneau **Publier** :
   - Facebook : un clic (si le jeton Page est dans Réglages).
   - LeBoncoin : préparer titre + texte, copier, télécharger le zip photos, ouvrir le dépôt, coller l’URL une fois l’annonce en ligne.
7. **Réservé** / **Vendu** : changer le statut. Vendu disparaît du site ; réservé reste visible avec pastille.

Comptes seed (à changer) : `accueil@`, `franck@`, `atelier@` @garagedelalargue.com / mot de passe `changeme`.

Témoignages de la page d’accueil : fichiers `lib/garage.ts` (demander au développeur) jusqu’à ce qu’un écran admin existe.
