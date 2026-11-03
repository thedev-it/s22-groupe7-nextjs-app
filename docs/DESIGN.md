# DESIGN.md --- Charte graphique Event Congo

> **Version :** 1.0\
> **Statut :** Référence UI/UX pour le développement\
> **Nom provisoire :** Event Congo\
> **Domaine :** Publication d'événements et billetterie en ligne au
> Congo-Brazzaville\
> **Inspiration :** Principes visuels de Kotizone --- adaptation
> originale pour une plateforme événementielle

------------------------------------------------------------------------

## 1. Objectif du document

Ce document définit les règles visuelles et d'expérience utilisateur de
la plateforme. Il sert de référence commune pour concevoir et développer
les pages publiques, l'espace participant et l'espace organisateur.

L'interface doit être moderne, élégante, lisible, responsive et facile à
utiliser. Les événements constituent le contenu central : leurs
affiches, titres, dates, lieux et prix doivent être immédiatement
compréhensibles.

**Principe directeur :** une interface sobre, des événements
visuellement riches et une expérience d'achat fluide.

La charte s'inspire de l'approche visuelle de Kotizone, sans reproduire
exactement son identité, ses composants ou ses ressources.

## 2. Identité visuelle

### 2.1. Positionnement

-   **Style :** minimaliste, éditorial et contemporain.
-   **Ambiance :** festive, conviviale et professionnelle.
-   **Public :** visiteurs, participants et organisateurs d'événements.
-   **Marché :** Congo-Brazzaville.
-   **Supports :** desktop, tablette et mobile.
-   **Priorités :** découverte d'événements, confiance dans l'achat,
    simplicité de réservation et gestion efficace.

### 2.2. Nom et logo

Le nom « Event Congo » est provisoire et doit pouvoir être remplacé
facilement.

Orientation du logo : - Symbole simple évoquant un ticket ou un
événement. - Nom de la plateforme dans une typographie claire. - Version
principale : symbole orange et texte charbon. - Version inversée : logo
blanc sur fond charbon ou orange. - Favicon : symbole seul. - Version
monochrome adaptée aux tickets et documents imprimables.

Ne pas déformer le logo, modifier ses proportions ou appliquer des
effets décoratifs excessifs.

## 3. Palette de couleurs

### 3.1. Couleurs de marque

  -----------------------------------------------------------------------------
  Token CSS                     HEX                     Utilisation
  ----------------------------- ----------------------- -----------------------
  `--color-primary`             `#E96B35`               Actions principales,
                                                        liens importants,
                                                        accents

  `--color-primary-hover`       `#D85C28`               Survol des actions
                                                        principales

  `--color-primary-light`       `#FCE9DF`               Fonds d'accent légers,
                                                        badges

  `--color-background`          `#F7F5F0`               Fond principal des
                                                        pages publiques

  `--color-surface`             `#FFFFFF`               Cartes, panneaux,
                                                        formulaires

  `--color-surface-secondary`   `#E9E5DD`               Sections secondaires et
                                                        fonds doux

  `--color-text-primary`        `#252522`               Titres et textes
                                                        principaux

  `--color-text-secondary`      `#6B6B63`               Métadonnées et textes
                                                        secondaires

  `--color-text-disabled`       `#A5A39D`               Éléments désactivés

  `--color-border`              `#E5E2DC`               Bordures et séparateurs
  -----------------------------------------------------------------------------

### 3.2. Couleurs fonctionnelles

  Token CSS           HEX         Utilisation
  ------------------- ----------- ----------------------------------
  `--color-success`   `#23845B`   Ticket valide, opération réussie
  `--color-danger`    `#D64545`   Erreur, ticket annulé ou refusé
  `--color-warning`   `#D99A24`   Stock faible, action à vérifier
  `--color-info`      `#3976B8`   Informations et messages neutres

### 3.3. Règles d'utilisation

-   L'orange est réservé en priorité aux actions importantes : « Acheter
    un ticket », « Réserver », « Créer un événement ».
-   Le fond ivoire est utilisé pour les pages publiques.
-   Les surfaces blanches servent aux cartes, formulaires et panneaux.
-   Le charbon est utilisé pour les titres et textes.
-   Les couleurs fonctionnelles indiquent un état et ne servent pas à
    décorer.
-   Ne pas utiliser l'orange sur tous les éléments simultanément.
-   Vérifier le contraste des textes et des boutons, particulièrement
    sur mobile.

## 4. Typographie

### 4.1. Police

**Police principale : Manrope**

Utilisation : titres, textes, navigation, boutons, formulaires, tableaux
de bord et données.

Police de secours :

``` css
font-family: 'Manrope', 'DM Sans', sans-serif;
```

La police doit être chargée localement ou via une source fiable. Prévoir
une police de secours en cas d'échec de chargement.

### 4.2. Échelle typographique

  Élément                   Taille desktop   Taille mobile Graisse
  ----------------------- ---------------- --------------- ---------
  Hero / H1                      48--64 px       32--40 px 700
  H2 / titre de section          32--40 px       26--32 px 700
  H3 / titre de page             28--32 px       22--28 px 700
  Titre d'événement              18--22 px       18--20 px 600
  Texte courant                  15--16 px       15--16 px 400
  Texte secondaire               13--14 px       13--14 px 400
  Boutons                        14--16 px       14--16 px 600

Les titres doivent rester courts et lisibles. Les descriptions longues
peuvent utiliser une hauteur de ligne comprise entre 1.5 et 1.7.

## 5. Design tokens CSS

Les tokens ci-dessous sont la référence centrale. Éviter de redéfinir
des couleurs, espacements ou rayons différents dans chaque page.

``` css
:root {
  /* Brand */
  --color-primary: #E96B35;
  --color-primary-hover: #D85C28;
  --color-primary-light: #FCE9DF;

  /* Surfaces */
  --color-background: #F7F5F0;
  --color-surface: #FFFFFF;
  --color-surface-secondary: #E9E5DD;

  /* Text */
  --color-text-primary: #252522;
  --color-text-secondary: #6B6B63;
  --color-text-disabled: #A5A39D;

  /* Borders */
  --color-border: #E5E2DC;

  /* States */
  --color-success: #23845B;
  --color-danger: #D64545;
  --color-warning: #D99A24;
  --color-info: #3976B8;

  /* Typography */
  --font-family: 'Manrope', 'DM Sans', sans-serif;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Spacing (4px base) */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* Shadows */
  --shadow-card: 0 4px 20px rgba(37, 37, 34, 0.04);
  --shadow-hover: 0 8px 24px rgba(37, 37, 34, 0.08);

  /* Layout */
  --container-max-width: 1200px;
  --header-height: 72px;
}
```

## 6. Grille, espacements et formes

### 6.1. Conteneur

-   Largeur maximale recommandée : `1200px`.
-   Centrer le contenu horizontalement.
-   Padding horizontal desktop : `32px`.
-   Padding horizontal tablette : `24px`.
-   Padding horizontal mobile : `16px`.

### 6.2. Espacements

Utiliser une échelle fondée sur 4 px. Les sections doivent respirer :
privilégier des espacements cohérents plutôt que des éléments serrés.

-   Entre les éléments d'un formulaire : 16--20 px.
-   Entre les cartes : 24 px.
-   Entre les sections principales : 48--64 px.
-   Padding interne d'une carte : 20--24 px.

### 6.3. Coins arrondis

-   Champs et petits boutons : 8 px.
-   Cartes : 12--16 px.
-   Panneaux importants : 16--24 px.
-   Badges : forme pill, si nécessaire.

## 7. Composants UI

### 7.1. Boutons

  Type               Apparence                     Usage
  ------------------ ----------------------------- --------------------------------
  Primary            Fond orange, texte blanc      Acheter, réserver, créer
  Secondary          Fond blanc, bordure charbon   Action secondaire
  Tertiary / Ghost   Sans fond, texte charbon      Actions discrètes
  Danger             Fond rouge ou texte rouge     Supprimer, annuler avec risque

Règles : - Hauteur standard : 44--48 px. - Padding horizontal : 20 px. -
Rayon : 8 px. - Transition : environ 200 ms. - Prévoir les états
`hover`, `focus-visible`, `disabled` et `loading`. - Les boutons
désactivés doivent être visuellement distincts et ne pas sembler
cliquables. - Les libellés doivent être explicites : préférer « Acheter
mes tickets » à « Continuer » lorsque l'action est claire.

### 7.2. Champs et formulaires

-   Fond blanc.
-   Bordure `--color-border`.
-   Hauteur minimale : 46 px.
-   Rayon : 8 px.
-   Label visible au-dessus du champ.
-   Placeholder utilisé comme exemple, jamais comme seul label.
-   Focus : bordure orange et indication visuelle claire.
-   Erreur : message textuel rouge sous le champ.
-   Aide : texte secondaire sous le champ.
-   Les champs requis doivent être identifiés.

### 7.3. Cartes

-   Fond blanc.
-   Bordure légère.
-   Rayon : 12--16 px.
-   Ombre discrète.
-   Padding : 20--24 px.
-   Hover : ombre plus marquée et déplacement de 2 px maximum,
    uniquement sur les éléments interactifs.

### 7.4. Badges

Les badges indiquent une catégorie ou un état. Ils doivent être compacts
et ne pas remplacer un message explicite.

Exemples : - Concert - Conférence - VIP - Ticket valide - Utilisé -
Annulé - Stock faible

### 7.5. Icônes

Utiliser **Lucide Icons** avec un style linéaire homogène.

Icônes suggérées : - `calendar-days` - `map-pin` - `ticket` - `search` -
`users` - `wallet` - `scan-qr-code` - `chart-column` - `bell` -
`user-round` - `layout-dashboard`

Taille courante : 18--24 px. Éviter de mélanger plusieurs bibliothèques
d'icônes.

## 8. Site public

### 8.1. Navigation principale

La navigation desktop comprend : - Logo à gauche. - « Découvrir ». - «
Catégories ». - « Villes ». - Recherche par mot-clé. - « Connexion ». -
Bouton primaire « Créer un événement ».

Règles : - Barre claire, sobre et éventuellement sticky. - Hauteur cible
: 72 px. - Le menu doit rester lisible et ne pas être surchargé. - Sur
mobile, utiliser un menu compact avec accès évident à la recherche et à
la connexion.

### 8.2. Hero de la page d'accueil

Objectif : présenter la plateforme et inviter à découvrir les
événements.

Texte de référence : \> **Découvrez les événements qui font vibrer le
Congo.**\
\> Concerts, festivals, conférences et expériences uniques. Trouvez
votre prochain événement et réservez vos tickets en quelques clics.

Actions : - « Explorer les événements » --- primaire. - « Organiser un
événement » --- secondaire.

Style : - Fond ivoire. - Titre fort et lisible. - Visuel d'événement de
qualité. - Composition éditoriale, sans décorations excessives. -
Adaptation mobile avec titre, texte et actions empilés.

### 8.3. Recherche et filtres

La recherche doit permettre de filtrer le catalogue par : - Mot-clé. -
Ville. - Catégorie. - Date.

La barre de recherche peut être composée de champs distincts ou d'un
panneau compact. Les filtres sélectionnés doivent être visibles et
facilement supprimables.

### 8.4. Catalogue d'événements

Grille recommandée : - Desktop : 3 cartes par ligne. - Tablette : 2
cartes par ligne. - Mobile : 1 carte par ligne. - Grand écran : jusqu'à
4 cartes si la lisibilité est conservée.

Chaque carte affiche : 1. Affiche de l'événement. 2. Catégorie. 3.
Titre. 4. Date et heure. 5. Ville ou lieu. 6. Prix « À partir de ». 7.
Action « Voir l'événement ».

Images : - Ratio conseillé : 16:9 ou 4:3. - Utiliser des images de bonne
qualité. - Prévoir une image de remplacement si l'affiche est absente. -
Les images ne doivent pas déformer la carte.

### 8.5. Fiche détaillée d'événement

La fiche contient : - Grande affiche. - Titre et catégorie. - Date,
heure, ville et lieu. - Organisateur. - Description. - Programme et
informations pratiques. - Conditions de participation. - Panneau de
réservation.

Le panneau de réservation doit afficher les types de tickets, les prix,
la quantité sélectionnée, la disponibilité et le montant total. Il doit
rester visible sans masquer les informations importantes de l'événement.

## 9. Espace participant

### 9.1. Navigation

-   Tableau de bord.
-   Mes tickets.
-   Historique des achats.
-   Notifications.
-   Mon profil.

L'espace participant doit être simple et centré sur les informations
utiles.

### 9.2. Mes tickets

Chaque ticket affiche : - Nom et affiche de l'événement. - Date, heure
et lieu. - Type de ticket (Standard, VIP, etc.). - Prix. - Identifiant
unique du ticket. - QR code. - État du ticket.

États visuels : - **Valide :** vert `#23845B`. - **Utilisé :** gris ou
neutre. - **Annulé / refusé :** rouge `#D64545`. - **En attente :**
ambre `#D99A24`.

Le QR code doit être suffisamment grand pour être scanné. Il ne doit pas
être déformé ni être masqué par un élément de l'interface.

Le QR code affiché dans une maquette est un exemple visuel. En
production, il doit correspondre à un ticket unique et vérifiable.

## 10. Espace organisateur

### 10.1. Structure

L'espace organisateur adopte un style SaaS : navigation latérale, barre
supérieure et zone de contenu.

Navigation : - Tableau de bord. - Mes événements. - Billetterie. -
Participants. - Scanner les tickets. - Statistiques. - Paramètres.

La navigation latérale peut être rétractable sur desktop et devient un
menu adapté aux petits écrans sur mobile.

### 10.2. Tableau de bord

Indicateurs à afficher : - Tickets vendus. - Chiffre d'affaires. -
Nombre de participants. - Tickets scannés. - Évolution des ventes. -
Événements actifs.

Les valeurs doivent être lisibles et accompagnées de libellés
explicites. Les graphiques ne doivent pas être surchargés.

### 10.3. Gestion des événements

Les listes et tableaux doivent privilégier : - Titre de l'événement. -
Date. - Statut. - Tickets vendus / capacité. - Actions : consulter,
modifier, supprimer.

Les actions destructives doivent être confirmées avant exécution.

### 10.4. Gestion des participants et scan

-   Tableau de participants lisible.
-   Recherche par nom, référence ou ticket.
-   États de validation clairement identifiables.
-   Retour immédiat après scan : accepté, déjà utilisé, invalide ou
    annulé.
-   L'état du ticket doit être mis à jour de manière fiable côté
    serveur.

## 11. Responsive design

Breakpoints de référence :

  -----------------------------------------------------------------------
  Appareil                Largeur                 Comportement
  ----------------------- ----------------------- -----------------------
  Mobile                  320--767 px             Une colonne, navigation
                                                  compacte

  Tablette                768--1023 px            Deux colonnes lorsque
                                                  pertinent

  Desktop                 1024--1439 px           Grilles de trois cartes

  Grand écran             1440 px et plus         Trois à quatre cartes
                                                  selon le contenu
  -----------------------------------------------------------------------

Principes : - Pas de débordement horizontal de page. - Recherche et
filtres utilisables au tactile. - Boutons d'action suffisamment
grands. - Tables : défilement horizontal ou présentation en cartes sur
mobile. - Dashboard : sidebar adaptée aux petits écrans. - QR codes :
taille et contraste suffisants. - Tester au minimum sur 360 px, 768 px,
1024 px et 1440 px.

## 12. Accessibilité et expérience utilisateur

-   Respecter autant que possible WCAG 2.1 AA pour le contraste.
-   Ne pas communiquer un état uniquement par la couleur : ajouter un
    libellé ou une icône.
-   Utiliser des labels explicites sur les formulaires.
-   Assurer la navigation au clavier.
-   Rendre l'état `focus-visible` perceptible.
-   Fournir un texte alternatif pertinent aux affiches.
-   Utiliser des titres hiérarchisés (`h1`, `h2`, `h3`).
-   Afficher des messages clairs après une action : succès, erreur,
    attente.
-   Éviter les animations excessives et respecter
    `prefers-reduced-motion`.

## 13. Micro-interactions

-   Hover des cartes : ombre légère et déplacement discret.
-   Boutons : transition de couleur de 150--200 ms.
-   Chargement : indicateur visible et libellé adapté.
-   Réservation : récapitulatif du montant mis à jour.
-   Scan : résultat immédiatement visible.
-   Filtres : état actif visuellement clair.

Les animations ne doivent pas ralentir les tâches essentielles ni
distraire de l'achat.

## 14. Règles spécifiques à la billetterie

Les éléments visuels doivent refléter des états réels provenant du
système : - Disponibilité des tickets. - Quantité sélectionnée. -
Prix. - Confirmation du paiement. - Validité du ticket. - Ticket déjà
utilisé.

Ne jamais afficher une disponibilité ou une confirmation fictive dans
l'application en production.

La cohérence visuelle ne remplace pas les contrôles techniques. Le stock
doit être protégé côté serveur contre les achats concurrents. La
validation du QR code doit vérifier l'identifiant du ticket et son état,
et empêcher une seconde utilisation.

## 15. Organisation recommandée des styles

Regrouper les styles communs : - Tokens de couleurs et de typographie. -
Boutons. - Champs de formulaire. - Cartes. - Badges. - Navigation. -
Layouts responsive.

Éviter : - Les couleurs arbitraires dispersées. - Les styles inline
répétés. - Les tailles de police incohérentes. - Les composants qui
réinventent les mêmes règles. - Les ombres fortes et les dégradés
omniprésents.

Si le projet utilise Tailwind CSS, configurer les couleurs, la police,
les rayons et les ombres à partir de ces tokens. Si le projet utilise
Bootstrap, créer des variables et classes de thème dédiées.

## 16. Checklist de validation UI

Avant de considérer une page comme terminée, vérifier :

-   [ ] Les couleurs respectent la palette.
-   [ ] La police Manrope est appliquée.
-   [ ] Les espacements sont cohérents.
-   [ ] Les boutons possèdent des états interactifs.
-   [ ] Les formulaires ont des labels et messages d'erreur.
-   [ ] Les cartes utilisent les mêmes rayons et bordures.
-   [ ] Les pages fonctionnent sur mobile, tablette et desktop.
-   [ ] Les affiches ne sont pas déformées.
-   [ ] Les états de tickets sont identifiables par texte et couleur.
-   [ ] Les actions principales sont faciles à repérer.
-   [ ] Les éléments sont accessibles au clavier.
-   [ ] Les contenus de démonstration sont clairement distingués des
    données réelles.

------------------------------------------------------------------------

## Résumé de la direction artistique

**Event Congo** doit présenter une identité sobre et chaleureuse :

-   **Fond :** ivoire `#F7F5F0`.
-   **Accent :** orange `#E96B35`.
-   **Texte :** charbon `#252522`.
-   **Police :** Manrope.
-   **Composants :** cartes blanches, bordures fines, rayons de 8 à 16
    px.
-   **Site public :** éditorial et orienté découverte.
-   **Participant :** simple, centré sur les tickets et les achats.
-   **Organisateur :** dashboard SaaS lisible et fonctionnel.

Ce document est la référence graphique à suivre pour toute nouvelle
page, tout composant et toute évolution de l'application. Le nom « Event
Congo » et les exemples de contenus restent provisoires et peuvent être
remplacés sans modifier les règles visuelles.
