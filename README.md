### State Logic & Props Flow – Julian De Pasqua

- To manage which lyric is shown, I implemented `useState` inside `Random.js`.

- The `index` state keeps track of the currently displayed lyric from `mockData.js`.

- Clicking "Shuffle Again" triggers `shuffleLyric()`, which selects a new random lyric by updating the state index.

- Props:
    • `LyricCard` Receives lyric and artist as props to show on screen.
    • `ShuffleButton` An onShuffle prop is passed down to activate the lyric randomizer.


<<<<<<< HEAD
## Julian – State Management 

- Built a global context using React Context API
- Created `useRandomLyric` custom hook
- Created `useSearch` custom hook
- Implemented mock API service
=======
  #  Group Assignment — Lyric Shuffle Web App

This is a collaborative React project that randomly displays song lyrics and artist information from a custom data set. Users can explore lyrics from popular songs across different genres with a clean, styled interface.

##  Features
- Displays lyrics from artists like Queen, Michael Jackson, and Led Zeppelin
- Random shuffle button to explore new lyrics
- Modular CSS styling for a responsive UI
- Component-based architecture (e.g., `Navbar`, `LyricCard`, `ShuffleButton`)
- Search and navigation-ready with planned routing integration

---

##  Project Structure
>>>>>>> 412ff2ee834a52e235dd95ffc804b398dc3023de






    

