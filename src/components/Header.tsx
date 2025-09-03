import './Header.css'
import { Link } from 'react-router'
export function Header () {
    return (
        
        <header className="page-header">
            <Link to='/'className='header-home-link'>
            Weather App
            </Link>
        </header>
        
    )
}