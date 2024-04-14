# Koala Pouch: An XRPL Digital Wallet

![Koala Pouch Logo](src/Design/Koala_Body.png)  Howdy Mate!

Welcome to the Koala Pouch GitHub repository! This repository contains the source code for a digital wallet tailored for the XRP Ledger (XRPL), designed to provide a seamless experience for managing your XRP assets, user's favorite way of handling their marsupial money!

## Project Overview

The Koala Pouch is a carefully designed and developed MVP from a 36-hour hackathon. This section outlines our tech stack, learning experiences, and code organization.

### Tech Stack

- **Design**: Figma was used for its collaborative features, allowing real-time feedback during the design process. Along with it being a familiar platform for our team members, making for an easy transition between design and integration.
- **Front End**: We chose JavaScript and React for the interactive UI, CSS for styling, and Axios for promise-based HTTP requests.
- **Back End**: Python with Flask was selected for its simplicity and ease of use, along with XRPL for direct interactions with the XRP Ledger. All team members are very experienced with Python which allowed more time to be spent learning other tools.

### Learning Outcomes

- **Front-End Team: Nicholas Holmes & Kyle Spragg** - Becae familiar with React's ecosystem and learned about integrating blockchain transactions into a seamless user experience.
- **Back-End Team: Alex Doehring & Colin Traenor** - Explored XRPL's documentation and functionality, and how Flask can be utilized to build a performant back end for financial applications.

## Code Organization

Our repository is structured with clear dependency management and logical section headers. We were able to achieve this by clearly defining different sections of commentsin our code, properly labeling separate files and git pushes, and clear communication between team members.

### Front-End Structure

Figma: Crafting a Koala-fied User Interface
For the design phase of Koala Pouch's front end, Figma stood out as our go-to tool. Its ease of use and advanced capabilities for creating multi-layered design workspaces enabled us to bring the charm of our koala-themed UI to life. 

Figma's intuitive user interface was a major advantage for our team. Its straightforward layout allowed us to jump right into the design process without a steep learning curve, which is essential during the crunch time of a hackathon.

The ability to work with a multi-layered workspace in Figma was pivotal for designing complex UI elements. We could create intricate designs with overlapping components and adjust them individually or as a group, enhancing the visual depth and functionality of our application. It's vector-based approach allowed us to design sharp, scalable graphics that looked great on any device. Moreover, its prototyping features enabled us to simulate user interactions and transitions, providing us with an interactive preview of our UI's look and feel.

Figma made it easy to share assets among team members, ensuring consistency across our design. Components and design tokens could be reused, which maintained a uniform aesthetic throughout Koala Pouch's interface. 

The efficiency and flexibility Figma provided significantly contributed to the delightful design experience that Koala Pouch offers.

NPM:
NPM provided us with a straightforward approach to manage the numerous packages our project depends upon. It allowed us to:

- Install packages like `create-react-app`, `redux`, `react-redux`, `axios`, `bootstrap`, `@mui/material`, `@emotion/react`, and `@emotion/styled` with a simple command.
- Ensure consistent package versions across different development environments, thanks to the `package.json` and `package-lock.json` files.
- Easily update dependencies with its versioning and update features, keeping our application secure and up-to-date with the latest features and fixes.

NPM's immense registry, the largest for any programming language, provided us with a plethora of options to choose from. This gave us the flexibility to select the most suitable packages for our needs, from state management to UI components.

Our team was already familiar with JavaScript and the Node.js environment, making NPM a natural fit. Its integration with the Node.js ecosystem meant that we could use NPM scripts to automate our workflow, run tests, and start our development servers, all from the command line.

While there are alternatives like Yarn, we found NPM's recent improvements in speed and reliability, and its native integration with the Node.js environment, to be decisive factors. With its wide adoption, community support, and ease of integration into our existing toolchain, NPM was the clear choice for managing our project's front-end dependencies.

### Back-End Structure

Flask:
Flask is a micro-framework, which means it is minimalistic by design, without sacrificing the power and flexibility needed for complex applications. This simplicity allowed us to create a lightweight and maintainable back-end service, which was crucial for the rapid development pace of a hackathon project.

Our team's proficiency in Python played a significant role in choosing Flask. Since Python is known for its readable syntax and extensive libraries, Flask allowed us to leverage these benefits, making our development process smoother and more efficient. Additionally, Flask's compatibility with various deployment options gave us the flexibility to consider multiple hosting services for future deployment. 

Flask's simplicity and the team's familiarity with Python significantly accelerated our development speed. It allowed us to focus on the logic and features specific to the XRPL without getting bogged down by the framework itself.

By integrating Flask into our tech stack, we ensured that Koala Pouch's back-end was not only robust and efficient but also a product of a framework that resonates with our team's expertise and the Python community's best practices.

## Quick Links
- [Figma Designs](https://www.figma.com)
- [XRPL Transaction Methods](https://xrpl-py.readthedocs.io/en/stable/source/xrpl.transaction.html)
- [Python Official Website](https://www.python.org/downloads/)

## Hackathon Strategy
Our agile-like approach with continuous integration and testing helped us create a solid MVP in record time. Frequent commits and intense collaboration are the hallmarks of this project's fast-paced development.

## Getting Started
Before you dive into the Koala Pouch, make sure you've got all the prerequisites installed.

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
