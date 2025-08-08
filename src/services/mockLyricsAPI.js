// services/mockLyricsAPI.js
const mockData = {
  id: 1,
  text: "We gon' be alright",
  artist: "Kendrick Lamar",
  song: "Alright",
};

export const fetchRandomLyric = () => {
  return new Promise((resolve, reject) => {
    const shouldFail = Math.random() < 0.2; 
    setTimeout(() => {
      if (shouldFail) reject("API failed!");
      else resolve(mockData);
    }, 500);
  });
};

