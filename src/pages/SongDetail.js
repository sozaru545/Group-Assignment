import { useParams } from 'react-router-dom';
import { mockLyrics } from '../utils/mockData';

export default function SongDetail() {
  const { id } = useParams();
  const song = mockLyrics.find(item => item.id === parseInt(id));

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <div className="page-container">
      <h1>{song.song}</h1>
      <h2>by {song.artist}</h2>
      <p>Album: {song.album} ({song.year})</p>
      <p>Genre: {song.genre}</p>
      <h3>Lyrics:</h3>
      <p>{song.lyric}</p>
    </div>
  );
}