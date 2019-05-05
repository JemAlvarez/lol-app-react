import React, { useContext } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { FaSearch, FaCaretDown, FaCog } from "react-icons/fa"

import RegionContext from '../context/region-context'

const Navbar = () => {
    const { region, setRegion, summonerName, setSummonerName, url, setSummoner, history } = useContext(RegionContext)

    const changeRegion = (reg) => {
        setRegion(reg)
        localStorage.setItem('region', reg)
    }

    const regionTransform = (region) => {
        switch (region) {
            case 'BR':
                return 'br1'
            case 'EUNE':
                return 'eun1'
            case 'EUW':
                return 'euw1'
            case 'JP':
                return 'jp1'
            case 'KR':
                return 'kr'
            case 'LAN':
                return 'la1'
            case 'LAS':
                return 'la2'
            case 'NA':
                return 'na1'
            case 'OCE':
                return 'oc1'
            case 'TR':
                return 'tr1'
            case 'RU':
                return 'ru1'
            case 'PBE':
                return 'pbe1'
        }
    }

    const onSummonerInput = (e) => {
        setSummonerName(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (window.location.pathname !== '/summoner') {
            history.push('/summoner')
        }
        const reg = regionTransform(region)
        const summoner = summonerName
        setSummonerName('')
        const summonerRes = await fetch(`${url}/summoner/${reg}/${summoner}`)
        const summonerData = await summonerRes.json()
        setSummoner(summonerData)
        localStorage.setItem('summonerName', summonerData.name)
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
                            type="text"
                            className="navbar__form__input"
                            placeholder="Search summoner..."
                            value={summonerName}
                            onChange={(e) => { onSummonerInput(e) }}
                        />
                        <div className="navbar__dropdown navbar__dropdown--custom">
                            <button className="navbar__link navbar__link--custom">{region}</button>
                            <div className="navbar__dropdown-content navbar__dropdown-content--custom">
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('BR') }}>BR</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('EUNE') }}>EUNE</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('EUW') }}>EUW</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('JP') }}>JP</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('KR') }}>KR</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('LAN') }}>LAN</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('LAS') }}>LAS</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('NA') }}>NA</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('OCE') }}>OCE</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('TR') }}>TR</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('RU') }}>RU</p>
                                <p className="navbar__dropdown-region" onClick={() => { changeRegion('PBE') }}>PBE</p>
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