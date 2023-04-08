  <div align="center">
  <img src='https://i.imgur.com/xpTDU7G.png' alt="Screenshot of the website" />
  <img src='https://i.imgur.com/ZpbzjQn.png' alt="LiteFlix" />
  </div>

  <br />

# Chess.com - Front End Programming Challenge

Welcome to the [Chess.com](https://chess.com) front end programming challenge!

# Instructions

1. Fork this repository.
2. Create a VueJS application that satisfies the requirements detailed below.
3. Provide links to your fork of this repository and a live demo of your application.

# Application Requirements

1. Create a page with a chessboard and a sidebar. ✅
2. On desktop devices the sidebar should be positioned to the right of the chessboard. ✅
3. On mobile devices the sidebar should be positioned below the chessboard. ✅
4. The chessboard should resize responsively to consume available space. ✅
5. Clicking a chessboard square should highlight the square. ✅
6. Keep track of which squares are clicked and the order in which they're clicked. ✅
7. Display the information collected from step 6 in the sidebar. ✅

# My Additions

### Undo/Redo Functionality

- Added undo and redo buttons to the sidebar.
- Implemented undo/redo functionality allowing users to navigate through the history of clicked squares.

### Reset Button

- Added a reset button to the sidebar.
- Clicking the reset button clears the highlighted squares on the chessboard and resets the list of clicked squares in the sidebar.

## Learning VueJS

This was my first experience with VueJS, and I was able to learn it in just 4 days to complete this challenge. Although I had some prior experience with JavaScript and other front-end development frameworks, learning a new framework always comes with its own set of challenges.

One of the biggest challenges I faced was understanding Vue's reactivity system and how it differs from traditional JavaScript and other frameworks like ReactJS.
While ReactJS uses a unidirectional data flow and relies on the use of state and props to manage data, VueJS has a reactive system that automatically updates the view when data changes. This required a shift in my thinking and approach to state management, which was initially challenging. However, I found the VueJS documentation to be extremely helpful in clarifying these concepts and providing examples that I could follow.

In addition to the documentation, I also used online tutorials and courses to supplement my learning. Some resources that I found particularly helpful were the official VueJS documentation, Vue Mastery, and the VueJS Crash Course by Traversy Media on YouTube.

Overall, I'm proud of what I was able to accomplish in such a short amount of time with VueJS, and I'm excited to continue learning and exploring this powerful framework in the future.

## Running the Project

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open your browser and navigate to `http://localhost:5173/`.

## Running Tests

- Run `npm run test:unit` to execute the unit tests.

## Live Preview

- Visit [https://frontendtest-chesscom-cr.vercel.app](https://frontendtest-chesscom-cr.vercel.app) to see the live preview of the project.

# Questions & Feedback

Please contact Nick Kampa (nkampa@chess.com) with any questions or feedback regarding this challenge.
