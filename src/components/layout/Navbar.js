import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="navbar">
            <div className="logo">LyricSpot</div>
            <div className="nav-links">
                <Link href="/"><a className={router.pathname === '/' ? 'active' : ''}>Home</a></Link>
                <Link href="/search"><a className={router.pathname === '/search' ? 'active' : ''}>Home</a></Link>
                <Link href="/about"><a className={router.pathname === '/about' ? 'active' : ''}>Home</a></Link>
            </div>
        </nav>
    );
}