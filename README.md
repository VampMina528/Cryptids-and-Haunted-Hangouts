# 👻 Creepy Cryptids and Haunted Hangouts

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Deployed](https://img.shields.io/badge/Deployed-Live-green) ![Tech](https://img.shields.io/badge/Stack-MERN%20%7C%20GraphQL%20%7C%20JWT-purple)

*Discover legendary creatures and the haunted places they roam in this immersive, globe-spinning MERN stack experience.*

🛍️ [Live Site on Render](https://creepy-cryptids-and-haunted-hangouts.onrender.com)
📦 [GitHub Repository](https://github.com/VampMina528/Creepy-Cryptids-and-Haunted-Hangouts)

## 🌟 Project Overview

**Creepy Cryptids and Haunted Hangouts** is a collaborative full-stack application where users can explore the lore of infamous cryptids and the haunted locations linked to their sightings. With an interactive 3D globe, eerie background music, and detailed storytelling, this app creates an unforgettable supernatural user experience.

### 👥 Collaborators

* Mina Draper-Hammond
* Fischer Almanza
* Danny Wortmann

## 🚀 Key Features

* 🌐 Interactive spinning globe with clickable cryptid icons
* 🧟 Cryptid detail pages with lore, images, and YouTube sound links
* 🏪 Haunted hangout pages with regional ghost stories and photos
* 🔊 “Cryptid Sonnets” music player (randomized playlist, volume, skip, loop)
* 🔐 JWT authentication for protected access
* 📱 Fully responsive design and professional UI/UX
* ☁️ Deployed on Render with persistent MongoDB Atlas database

## 🛠️ Technologies Used

* **Frontend:** React, CSS (custom)
* **Backend:** Node.js, Express.js, GraphQL (Apollo Server)
* **Database:** MongoDB, Mongoose
* **Auth:** JSON Web Tokens (JWT)
* **Deployment:** Render
* **Version Control:** Git & GitHub
* **CI/CD:** GitHub Actions

## 🖼️ Screenshots

<img src="./client/src/assets/Screenshot%202025-05-29%20182602.png" alt="Homepage Screenshot" width="600" />
<img src="./client/src/assets/Screenshot%202025-05-29%20182651.png" alt="Cryptid Detail Page" width="600" />
<img src="./client/src/assets/Screenshot%202025-05-29%20182724.png" alt="Haunted Location Page" width="600" />

## 📂 Installation & Usage

1. Clone the repository

```bash
git clone https://github.com/VampMina528/Creepy-Cryptids-and-Haunted-Hangouts.git
cd Creepy-Cryptids-and-Haunted-Hangouts
```

2. Install dependencies

```bash
# Run from root directory (or separately in /client and /server)
npm install
```

3. Set up environment variables

Create a `.env` file in `/server`:

```env
JWT_SECRET=yourSecretKey
MONGODB_URI=yourMongoDBAtlasURI
```

4. Start the development server

```bash
npm run dev
```

## 📈 Future Enhancements

* Add and save several more cryptids/haunted locations across the globe
* Enable user-contributed cryptid/haunted locations images 
* Implement continent or keyword search
* Include accessibility improvements and screen reader support

## 📜 License

This project is licensed under the [MIT License](LICENSE).

> ✨ Developed for the KU Full Stack Bootcamp Final Project using agile collaboration, GitHub Actions, and clean MERN architecture.
