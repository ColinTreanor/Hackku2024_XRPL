# Koala Pouch: An XRPL Digital Wallet

![Koala Wallet Logo](src/Design/Koala_Body.png)  Howdy Mate!

Welcome to the Koala Pouch GitHub repository! This repository contains the source code for a digital wallet tailored for the XRP Ledger (XRPL), designed to provide a seamless experience for managing your XRP assets, user's favorite way of handling their marsupial money!

## Project Overview

The Koala Pouch is a carefully designed and developed MVP from a 36-hour hackathon. This section outlines our tech stack, learning experiences, and code organization.

### Tech Stack

- **Design**: Figma was used for its collaborative features, allowing real-time feedback during the design process. Along with it being a familiar platform for our team members, making for an easy transition between design and integration.
- **Front End**: We chose JavaScript and React for the interactive UI, CSS for styling, and Axios for promise-based HTTP requests.
- **Back End**: Python with Flask was selected for its simplicity and ease of use, along with XRPL for direct interactions with the XRP Ledger. All team members are very experience in Python so this allowed more time to be dedicated to learning other tools.

### Learning Outcomes

- **Front-End Team: Nicholas Holmes & Kyle Spragg** - Becae familiar with React's ecosystem and learned about integrating blockchain transactions into a seamless user experience.
- **Back-End Team: Alex Doehring & Colin Traenor** - Explored XRPL's documentation and functionality, and how Flask can be utilized to build a performant back end for financial applications.

## Code Organization

Our repository is structured with clear dependency management and logical section headers. We were able to achieve this by clearly defining different sections of commentsin our code, properly labeling separate files and git pushes, and clear communication between team members.

### Front-End Structure

- Dependencies are managed through npm, ensuring modular and maintainable code.
- Components are organized by feature, with clear naming conventions for ease of navigation.

### Back-End Structure

- Python modules are used to encapsulate different functionalities, with Flask blueprints managing different routes.
- Each module, function, and class is documented with comments explaining its purpose and usage.

## Quick Links
- [Figma Designs](https://www.figma.com)
- [XRPL Transaction Methods](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.transaction.html)
- [Python Official Website](https://www.python.org/downloads/)

## Hackathon Strategy
Our agile-like approach with continuous integration and testing helped us create a solid MVP in record time. Frequent commits and intense collaboration are the hallmarks of this project's fast-paced development.

## Getting Started
Before you dive into the Koala Wallet, make sure you've got all the prerequisites installed.

### Front-End Dependencies
```bash
npm install create-react-app redux react-redux axios bootstrap @mui/material @emotion/react @emotion/styled
```

### Back-End Dependencies
Make sure to have Python installed, then run:
```bash
pip install Flask xrpl-py pytest virtualenv # Run each on it's own
```

Remember to set up your virtual environment:
```bash
virtualenv myenv
source myenv/bin/activate # On Windows use myenv\Scripts\activate
```

## Usage
To start using the Koala Pouch, clone this repository and run the following commands:

For the Front-End:
```bash
cd path/to/frontend
npm start
````

For the Back-End:
```bash
cd path/to/backend
flask run
```

## Features
- Login and account creation
- Balance display and transaction history
- Send and receive XRP with ease
- Koala-themed UI for a friendly and unique user experience -- custom widgets designed in Figma

## Authors
- **Alex Doehring** - Back-End Wizardry: Lead development of back end functions and Python code, and figureheaded the programming for transaction history.
- **Nicholas Holmes** - Front-End Artisan: Oversaw UI design, creating objects in Figma and porting them in a way that allowed functionality, as well as working with JavaScript and CSS files.
- **Kyle Spragg** - Front-End Maestro: Programmed majority of UI animations in CSS and assisted in front and back end integration within JavaScript files.
- **Colin Traenor** - Back-End Alchemist: Primarily focused on integration of front and back end in JavaScript and assisted in development of back end functions in Python.


## Acknowledgments
- Big shoutout to everyone who participated in HackKU 2024!
- Event sponsors and staff that made it all happen.
- Coffee & Redbull, for being our trusted companions during the hackathon.
- Sleep, rare, but treasured when found.

---
> This project was crafted with care during HackKU 2024. It may not be perfect, but it sure has a pouch full of potential!
