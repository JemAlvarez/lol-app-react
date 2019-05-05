import React, { useState, useEffect } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import Champions from '../components/Champions'
import Champion from '../components/Champion'
import RandomLane from '../components/RandomLane'
import RandomChampion from '../components/RandomChampion'
import RandomSkin from '../components/RandomSkin'

import RegionContext from '../context/region-context'

const history = createBrowserHistory()

const AppRouter = () => {
    const url = 'https://ja-lol-app.herokuapp.com'
    const [region, setRegion] = useState('NA')
    const [summonerName, setSummonerName] = useState('')
    const [summoner, setSummoner] = useState({})

    useEffect(() => {
        if (localStorage.getItem('region')) {
            setRegion(localStorage.getItem('region'))
        } else {
            localStorage.setItem('region', region)
        }
    }, [])

    return (
        <Router history={history}>
            <RegionContext.Provider value={{ region, setRegion, url, summonerName, setSummonerName, summoner, setSummoner, history }}>
                <Navbar />
                <Route exact path="/" component={Champions} />
                <Route path="/summoner" component={Dashboard} />
                <Route path="/champion/:id" component={Champion} />
                <Route path="/random-lane" component={RandomLane} />
                <Route path="/random-champion" component={RandomChampion} />
                <Route path="/random-skin" component={RandomSkin} />
            </RegionContext.Provider>
        </Router>
    )
}

export default AppRouter