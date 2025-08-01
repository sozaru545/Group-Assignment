### State Logic & Props Flow – Julian De Pasqua

- To manage which lyric is shown, I implemented `useState` inside `Random.js`.

- The `index` state keeps track of the currently displayed lyric from `mockData.js`.

- Clicking "Shuffle Again" triggers `shuffleLyric()`, which selects a new random lyric by updating the state index.

- Props:
    • `LyricCard` Receives lyric and artist as props to show on screen.
    • `ShuffleButton` An onShuffle prop is passed down to activate the lyric randomizer.




    

