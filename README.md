[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Paper Boy</h3>

  <p align="center">
    Project created for Full Stack Final Project
    <br />
    <br />
    <a href="https://github.com/matteo-minerva/news-scraper/issues">Report Bug</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Website Screenshot][product-screenshot]]

Requirements:

- Build a front-end app, whether it's a single-page-application or a multi-page-application

- It should handle calls to a RESTful API you've developed that implements a login/logout and user registration system.

- Add functionality to the API as you see fit.

What I did:

- <strong>Server side</strong>
  The server is responsible for finding news from authoritative Italian journalistic sources and store them in a db. It also provides APIs through which you can interact, some of these require special permissions and / or roles, others do not.

- <strong>Client side</strong>
  This is where the news present in the db are actually shown, and where it is possible to filter them both by newspaper and by the presence of a keyword.

### Built With

- [Sequelize ORM](https://sequelize.org/)
- [Node.js](https://nodejs.org/it/)
- [Express](https://expressjs.com/)
- [ReactJS](https://it.reactjs.org/)

<!-- GETTING STARTED -->

## Getting Started

1. Clone the repo

```sh
git clone https://github.com/matteo-minerva/news-scraper
```

2. Install the missing dependencies for BOTH the client and the server

```npm
npm install
```

3. Run XAMPP or any equivalent

4. Go to the server folder

```
cd server
```

5. Run the following commands

```npm
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run windows-dev #if you are on Windows
npm run linux-dev #if you are on OSX or Linux
```

6. The server should be up and running.
   <strong>Side note:</strong> I am setting and env variable in the "dev" script, it won't work on Mac and you should NOT do this in a production environment

7. In another terminal, head to the client folder

```
cd client
```

8. Start the client by typing

```npm
npm start
```

<!-- USAGE -->

## Usage

You can access the web application at

```url
http://localhost:3000/
```

The available endpoints are

```
/api/auth/ POST - public access
Allows login operations via JSON Web Token

/api/news GET - public access
Allows to retrieve all news from the DB

/api/users/ POST - public access
Enables the registration of a new user

/api/users/me GET - private access
Allows to find information about one's own user

/api/papers GET - public access
Allows to find the newspapers present in the DB

/api/papers POST - private access
Adds a new newspaper to the table

/api/papers/:id PUT - private access
Allows you to modify the information regarding a particular
newspaper

/api/papers/:id GET - public access
Retrieves information about a particular newspaper /api/papers/:id

/api/papers/:id DELETE - private access
Allows to delete a particular newspaper from the DB
```

<!-- CONTACT -->

## Contact

Matteo Minerva - m.minerva@outlook.it

start2impact personal page: https://talent.start2impact.it/profile/matteo-minerva

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[issues-shield]: https://img.shields.io/github/issues/matteo-minerva/news-scraper/repo.svg?style=for-the-badge
[issues-url]: https://github.com/matteo-minerva/news-scraper/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/m-minerva
[product-screenshot]: /screenshot.png
