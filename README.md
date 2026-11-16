English (find the finnish version of instructions below)

# Animal Adoption Service

Course project for the Web Services course.

**Animal Adoption Service** is a web application built with React, Node.js/Express, and SQLite, where users can browse animals looking for a home and submit an adoption application.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

* **Docker** and **Docker Compose**

* **Git**

## Installation and Startup

1. Clone the repository and navigate to the project folder:

   ```bash
   git clone https://github.com/meumau/animal-adoption-web-service.git
   cd animal-adoption-web-service
   ```

2. Build the containers and start the application:

   ```bash
   docker compose up --build
   ```

3. Open the application in your browser at:

   * **User Interface (Frontend):** http://localhost:5173/

## Services and Structure

The application consists of multiple services orchestrated with Docker Compose:

* **Frontend (`http://localhost:5173/`):** React user interface where animals are browsed and applications are submitted.
* **Server A (`http://localhost:3000/`):** Express server that provides animal data and forwards adoption applications.
* **Server B (`http://localhost:8000/`):** Express server that processes adoption applications.
* **Database (`./database`):** Shared folder where the SQLite database file persists even after container restarts.

## Stopping the Application

You can stop the application in the terminal by pressing `Ctrl + C` or by running the following command in the project folder:

```bash
docker compose down
```

---
Suomeksi

# Eläinten adoptiojärjestelmä

Web-palvelut-kurssin projektityö.

**Eläinten adoptiojärjestelmä** on React-, Node.js/Express- ja SQLite-teknologioilla toteutettu verkkosovellus, jossa käyttäjä voi selata kotia etsiviä eläimiä ja lähettää adoptiohakemuksen.

## Esivaatimukset

Ennen käynnistystä varmista, että koneellesi on asennettu:
- **Docker** ja **Docker Compose**
- **Git**

## Asennus ja käynnistys

1. Kloonaa repositorio ja siirry projektikansioon:
   ```bash
   git clone https://github.com/meumau/animal-adoption-web-service.git
   cd animal-adoption-web-service
   ```

2. Rakenna kontit ja käynnistä sovellus:
   ```bash
   docker compose up --build
   ```

3. Avaa sovellus selaimessa osoitteessa:
   - **Käyttöliittymä (Frontend):** http://localhost:5173/

## Palvelut ja rakenne

Sovellus koostuu useammasta palvelusta, jotka ajetaan Docker Composen avulla:
- **Frontend (`http://localhost:5173/`):** React-käyttöliittymä, jonka kautta eläimiä selataan ja hakemukset lähetetään.
- **Server A (`http://localhost:3000/`):** Express-palvelin, joka tarjoaa eläintiedot ja välittää adoptiohakemukset eteenpäin.
- **Server B (`http://localhost:8000/`):** Express-palvelin, joka käsittelee adoptiohakemukset.
- **Tietokanta (`./database`):** Jaettu kansio, jossa SQLite-tietokantatiedosto säilyy myös konttien uudelleenkäynnistyksen jälkeen.

## Sovelluksen pysäyttäminen

Voit pysäyttää ajon terminaalissa painamalla `Ctrl + C` tai ajamalla projektikansiossa:

```bash
docker compose down
```
