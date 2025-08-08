// src/components/LyricCard.jsx
export default function LyricCard({ lyric, artist }) {
  return (
    <article className="card">
      <p style={{ margin: 0 }}>{lyric}</p>
      <small style={{ opacity: .8 }}>— {artist}</small>
    </article>
  );
}
