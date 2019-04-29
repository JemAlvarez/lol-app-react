import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch, FaCaretDown, FaCog } from "react-icons/fa"

const Navbar = () => {
    const [region, setRegion] = useState('NA')

    useEffect(() => {
        if (localStorage.getItem('region')) {
            setRegion(localStorage.getItem('region'))
        }
    }, [])
    
    const changeRegion = (region) => {
        setRegion(region)
        localStorage.setItem('region', region)
    }

    return (
        <nav className="navbar">
            <div className="container navbar--inner">
                <div className="navbar__container">
                    <NavLink exact to="/" className="navbar__link" activeClassName="navbar__link--active">Summoner</NavLink>
                    <NavLink to="/champion" className="navbar__link" activeClassName="navbar__link--active">Champions</NavLink>
                    <div className="navbar__dropdown">
                        <button className="navbar__link">Random <FaCaretDown /></button>
                        <div className="navbar__dropdown-content">
                            <NavLink to="/random-lane" className="navbar__link" activeClassName="navbar__link--active">Lane</NavLink>
                            <NavLink to="/random-champion" className="navbar__link" activeClassName="navbar__link--active">Champion</NavLink>
                        </div>
                    </div>
                </div>
                <div className="navbar__container navbar__container--custom">
                    <div className="navbar__form">
                        <input type="text" className="navbar__form__input" placeholder="Search summoner..." />
                        <div className="navbar__dropdown navbar__dropdown--custom">
                            <button className="navbar__link navbar__link--custom">{region}</button>
                            <div className="navbar__dropdown-content navbar__dropdown-content--custom">
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('BR')}}>BR</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('EUNE')}}>EUNE</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('EUW')}}>EUW</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('JP')}}>JP</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('KR')}}>KR</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('LAN')}}>LAN</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('LAS')}}>LAS</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('NA')}}>NA</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('OCE')}}>OCE</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('TR')}}>TR</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('RU')}}>RU</p>
                                <p className="navbar__dropdown-region" onClick={() => {changeRegion('PBE')}}>PBE</p>
                            </div>
                        </div>
                        <button className="navbar__form__submit"><FaSearch /></button>
                    </div>
                    <button className="navbar__menu navbar__link"><FaCog /></button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar