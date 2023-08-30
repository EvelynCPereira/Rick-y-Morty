import SearchBar from './SearchBar';
import { NavLink } from "react-router-dom"
import "./styleNav.css"

function Nav({ onSearch, randomHandler, logOutHandler }) {
    return (
        <div className='nav-cont'>
            <div className='left-links'>
                <NavLink to="/about"><button>About</button></NavLink>
                <NavLink to="/home"><button>Home</button></NavLink>
                <NavLink to="/favorites"><button>Favorites</button></NavLink>
                <NavLink to="/"><button>Log out</button></NavLink>
            </div>
            <SearchBar className='search-cont' onSearch={onSearch} randomHandler={randomHandler} logOutHandler={logOutHandler} />
        </div>
    )

}
export default Nav;