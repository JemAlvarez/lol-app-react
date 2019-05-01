import React, { useEffect, useContext, useState } from 'react'

import ChampionIcon from './ChampionIcon'
import Loading from './Loading'

import RegionContext from '../context/region-context'

const Champions = () => {
    const { url } = useContext(RegionContext)
    const [champions, setChampions] = useState([])
    const [{ oldPlayers, newPlayers, newPlayersLevel }, setRotation] = useState({})

    useEffect(() => {
        const fetchChamps = async () => {
            const champsRes = await fetch(`${url}/champions`)
            const rotationRes = await fetch(`${url}/rotation`)
            const champsData = await champsRes.json()
            const rotationData = await rotationRes.json()
            setChampions(champsData)
            setRotation(rotationData)
        }
        fetchChamps()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-small champions">
            <h1>Champions</h1>
            <div className="champions__container champions__container--free">
                <h3>Free Champions</h3>
                <h4>After Level {newPlayersLevel}</h4>
                <div>
                    {
                        oldPlayers ? (
                            oldPlayers.map(champion => (
                                <ChampionIcon key={champion.champId} champ={champion} />
                            ))
                        ) : (
                                <Loading />
                            )
                    }
                </div>
                <h4>Before Level {newPlayersLevel}</h4>
                <div>
                    {
                        newPlayers ? (
                            newPlayers.map(champion => (
                                <ChampionIcon key={champion.champId} champ={champion} />
                            ))
                        ) : (
                                <Loading />
                            )
                    }
                </div>
            </div>
            <div className="champions__container champions__container--all">
                <h3>All Champions</h3>
                <div>
                    {
                        champions.length > 1 ? (
                            champions.map(champion => (
                                <ChampionIcon key={champion.champId} champ={champion} />
                            ))
                        ) : (
                                <Loading />
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Champions