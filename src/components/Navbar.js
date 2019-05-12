import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaSearch, FaCaretDown, FaCog } from "react-icons/fa"

import RegionContext from '../context/region-context'

const Navbar = () => {
    const { region, setRegion, summonerName, setSummonerName, url, setSummoner, history } = useContext(RegionContext)

    useEffect(() => {
        let element = ''
        document.querySelectorAll('.navbar__dropdown-region').forEach(el => {
            if (el.textContent === localStorage.getItem('region')) {
                element = el
            }
        })
        element.style.color = '#f35353'
    }, [])

    const onSummonerInput = (e) => {
        setSummonerName(e.target.value)
    }

    const changeRegion = (e, reg) => {
        setRegion(reg)
        localStorage.setItem('region', reg)
        document.querySelectorAll('.navbar__dropdown-region').forEach(el => {
            el.style = ''
        })
        e.target.style.color = '#f35353'
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (window.location.pathname !== '/summoner') {
            history.push('/summoner')
        } else {
            window.location.reload()
        }
        localStorage.setItem('summonerName', document.querySelector('#summoner-name').value)
    }

    return (
        <nav className="navbar">
            <div className="container navbar--inner">
                <div className="navbar__container">
                    <NavLink exact to="/" className="navbar__link" activeClassName="navbar__link--active">Champions</NavLink>
                    <NavLink exact to="/summoner" className="navbar__link" activeClassName="navbar__link--active">Summoner</NavLink>
                    <div className="navbar__dropdown">
                        <button className="navbar__link">Random <FaCaretDown /></button>
                        <div className="navbar__dropdown-content">
                            <NavLink to="/random-lane" className="navbar__link" activeClassName="navbar__link--active">Lane</NavLink>
                            <NavLink to="/random-champion" className="navbar__link" activeClassName="navbar__link--active">Champion</NavLink>
                            <NavLink to="/random-skin" className="navbar__link" activeClassName="navbar__link--active">Skin</NavLink>
                        </div>
                    </div>
                </div>
                <div className="navbar__container navbar__container--custom">
                    <form className="navbar__form" onSubmit={(e) => { onSubmit(e) }}>
                        <input
                            id="summoner-name"
                            type="text"
                            className="navbar__form__input"
                            placeholder="Search summoner..."
                            value={summonerName}
                            onChange={(e) => { onSummonerInput(e) }}
                        />
                        <div className="navbar__dropdown navbar__dropdown--custom">
                            <button className="navbar__link navbar__link--custom">{region}</button>
                            <div className="navbar__dropdown-content navbar__dropdown-content--custom">
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'BR') }}>BR</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'EUNE') }}>EUNE</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'EUW') }}>EUW</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'JP') }}>JP</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'KR') }}>KR</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'LAN') }}>LAN</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'LAS') }}>LAS</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'NA') }}>NA</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'OCE') }}>OCE</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'TR') }}>TR</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'RU') }}>RU</p>
                                <p className="navbar__dropdown-region" onClick={(e) => { changeRegion(e, 'PBE') }}>PBE</p>
                            </div>
                        </div>
                        <button className="navbar__form__submit"><FaSearch /></button>
                    </form>
                    <button className="navbar__menu navbar__link"><FaCog /></button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar