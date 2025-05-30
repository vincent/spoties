# Spoti.es Ⓢ

<div align="center">

An multi-locations event staffing platform

[![Static Badge](https://img.shields.io/badge/Svelte_5-ff6c47?style=for-the-badge)](https://svelte.dev)
[![Static Badge](https://img.shields.io/badge/Docker-1D63ED?style=for-the-badge)](https://www.docker.com)
[![Static Badge](https://img.shields.io/badge/PocketBase-b8dbe4?style=for-the-badge)](https://pocketbase.io)

</div>

## 🎯 Overview

[Spoti.es](https://spoti.es) is an event staffing platform designed to simplify management multiple locations.

Think of it as Google Forms but with locations as a core component, making it easy to coordinate staff and resources across various venues.

## ✨ Features

-   **Easy forms builder for all your events**
    - No coding needed - anyone can build forms
    - Built specifically for multi-location events
    - Works perfectly on mobile devices

-   **Responses management**
    - Get notified instantly when responses change
    - Reassign participants with one click
    - See who's working where at a glance

## 👥 Community

We encourage you to join our community and help shape the future of this project! Here's how you can get involved:

-   **Requesting New Features** Have a great idea for a new feature? We'd love to hear it!

    Please share your suggestions on [the user feedback platform](https://spoti.featurebase.app)

    See a feature request you like? Give it a thumbs up !

-   **Reporting Bugs or Problems** If you encounter a bug or have any other problems, please let us know. 

    You can open an issue on the [GitHub issue tracker](https://github.com/vincent/spoties/issues/new)

## 🤝 Support the Project

If you find Spoti.es helpful and would like to support its development, here are a few ways you can contribute:

-   **Spread the Word** 

    Tell your friends, colleagues, or anyone who might benefit from Spoti.es about it!

-   **Code and Documentation** 

    You can contribute directly by helping us fix bugs, implement new features, or improve the documentation.

-   **Donations** 

    You can donate on [Kofi](ko-fi.com/vlkofi)

## 🐳 Selfhosting

You can host the platform yourself using the public [docker image](//ghcr.io/vincent/spoties:main)

Check the [docker-compose](docker-compose.yml) file as an example.

## 🛠️ Tech Stack

Spoti.es is built upon [PocketBase](https://pocketbase.io) and [SvelteKit](https://kit.svelte.dev)

## 📖 Development

Start the backend with

```shell
cd backend
./modd # will show an url to create the first admin 
```

Start the frontend with

```shell
cd frontend
npm install
npm run dev
```

## 📄 License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE.md) file for details.
