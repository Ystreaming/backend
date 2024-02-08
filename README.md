<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Ystreaming/backend/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">YStream Backend</h3>

  <p align="center">
    Plateforme de partage de vidéos basée sur Node.js pour permettre aux utilisateurs de télécharger, de visionner et de partager des vidéos.
    <br />
    <a href="ystreaming.github.io/backend/"><strong>La documentation »</strong></a>
    <br />
    <br />
    <a href="http://35.180.39.107:3000/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sommaire</summary>
  <ol>
    <li>
      <a href="#about-the-project">A propos</a>
      <ul>
        <li><a href="#built-with">Technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Demarage</a>
      <ul>
        <li><a href="#prerequisites">Prerequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## A propos du projet

[![Product Name Screen Shot][product-screenshot]](readme_image/403410663_881841390316660_1112139620436866404_n.png)

Plateforme de partage de vidéos basée sur Node.js pour permettre aux utilisateurs de télécharger, de visionner et de partager des vidéos.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Node][Node.js]][Node-url]
* [![MongoDB][Mongo.db]][Mongo-url]
* [![Express][Express.js]][Express-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Github][Github]][Github-url]
* [![Docker][Docker]][Docker-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Ceci est un exemple de la façon dont vous pouvez mettre en place le projet localement. Pour obtenir une copie locale opérationnelle, suivez ces étapes simples.

### Prerequisites

Installation de docker et docker-compose
* Docker
  ```sh
  sudo apt install docker.io
  ```
* Docker-compose
  ```sh
  sudo apt install docker-compose
  ```

Installation de Node.js
* Node.js
  ```sh
  sudo apt install nodejs
  ```

Installation de npm
* npm
  ```sh
  sudo apt install npm
  ```

### Installation

1. Cloner le repo
   ```sh
   git clone https://github.com/Ystreaming/backend/
    ```
2. Installer les packages NPM
    ```sh
    npm install
    ```
3. Lancer le serveur
    ```sh
    npm run start
    ```
4. Lancer le serveur en mode developpement
    ```sh
    npm run start:dev
    ```
5. Lancer les tests
    ```sh
    npm run test:cov
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Pour utiliser le projet, il faut se rendre sur l'adresse suivante : http://127.0.0.1:3000/

Vous pouvez utiliser Postman pour tester les routes de l'API.

_Pour plus d'exemple, vous referez à la documentation [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Créer un compte utilisateur et vidéaste
- [ ] Créer et uploader une vidéo
- [ ] Ajouter des commentaires en temps réel
- [ ] Ajouter des likes et des dislikes
- [ ] Voir votre historique de visionnage


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Anthony DENIN - [@github_handle](https://github.com/MrBartou) - Développeur Backend

Vincent FERNANDEZ - [@github_handle](https://github.com/JeSuisVince) - Développeur Backend


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Ystreaming/backend.svg?style=for-the-badge

[contributors-url]: https://github.com/Ystreaming/backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Ystreaming/backend.svg?style=for-the-badge

[forks-url]: https://github.com/Ystreaming/backend/network/members
[stars-shield]: https://img.shields.io/github/stars/Ystreaming/backend.svg?style=for-the-badge

[stars-url]: https://github.com/Ystreaming/backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Ystreaming/backend.svg?style=for-the-badge

[issues-url]: https://github.com/Ystreaming/backend/issues
[license-shield]: https://img.shields.io/github/license/Ystreaming/backend.svg?style=for-the-badge

[license-url]: https://github.com/Ystreaming/backend/blob/master/LICENSE
[product-screenshot]: readme_image/403410663_881841390316660_1112139620436866404_n.png

[Node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Node-url]: https://nodejs.org/en/

[Mongo.db]: https://img.shields.io/badge/mongodb-000000?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/

[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

[Typescript]: https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

[Github]: https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white
[Github-url]: https://github.com/Ystreaming/backend/

[Docker]: https://img.shields.io/badge/docker-000000?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
