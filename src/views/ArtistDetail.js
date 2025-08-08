import { useParams } from 'react-router-dom';
import { mockLyrics } from '../utils/mockData';

export default function ArtistDetail() {
  const { artistName } = useParams();
  const artistSongs = mockLyrics.filter(
    song => song.artist.toLowerCase() === artistName.toLowerCase()
  );

  return (
    <div className="page-container">
      <h1>{decodeURIComponent(artistName)}</h1>
      <h2>Songs:</h2>
      <ul>
        {artistSongs.map(song => (
          <li key={song.id}>{song.song} ({song.year})</li>
        ))}
      </ul>
    </div>
  );
}