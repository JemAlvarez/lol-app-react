import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div>
                <NavLink exact to="/" activeClassName="nav-link--active">Summoner</NavLink>
                <NavLink to="/champion" activeClassName="nav-link--active">Champions</NavLink>
                <div class="dropdown">
                    <button class="dropbtn">Random</button>
                    <div class="dropdown-content">
                        <NavLink to="/random-lane" activeClassName="nav-link--active">Lane</NavLink>
                        <NavLink to="/random-champion" activeClassName="nav-link--active">Champion</NavLink>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <input type="text" />
                    <select>
                        <option>NA</option>
                        <option>EUW</option>
                        <option>KR</option>
                    </select>
                    <input type="submit" />
                </div>
                <button>M</button>
            </div>
        </nav>
    )
}

export default Navbar