import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Navbar from '../components/Navbar'
import Champions from '../components/Champions'
import RandomLane from '../components/RandomLane'
import RandomChampion from '../components/RandomChampion'

const AppRouter = () => {
    return (
        <Router>
            <>
                <Navbar />
                <Route exact path="/" component={Dashboard} />
                <Route path="/champion" component={Champions} />
                <Route path="/random-lane" component={RandomLane} />
                <Route path="/random-champion" component={RandomChampion} />
            </>
        </Router>
    )
}

export default AppRouter