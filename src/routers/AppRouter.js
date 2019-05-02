import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import Champions from '../components/Champions'
import Champion from '../components/Champion'
import RandomLane from '../components/RandomLane'
import RandomChampion from '../components/RandomChampion'
import RandomSkin from '../components/RandomSkin'

import RegionContext from '../context/region-context'

const AppRouter = () => {
    const url = 'https://ja-lol-app.herokuapp.com'
    const [region, setRegion] = useState('NA')

    useEffect(() => {
        if (localStorage.getItem('region')) {
            setRegion(localStorage.getItem('region'))
        }
    }, [])

    return (
        <Router>
            <RegionContext.Provider value={{ region, setRegion, url }}>
                <Navbar />
                <Route exact path="/" component={Dashboard} />
                <Route path="/champions" component={Champions} />
                <Route path="/champion/:id" component={Champion} />
                <Route path="/random-lane" component={RandomLane} />
                <Route path="/random-champion" component={RandomChampion} />
                <Route path="/random-skin" component={RandomSkin} />
            </RegionContext.Provider>
        </Router>
    )
}

export default AppRouter