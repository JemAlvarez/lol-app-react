import React, { useState, useContext, useEffect } from 'react'

import RegionContext from '../context/region-context'

const Dashboard = () => {
    const { summoner, summonerName, region, setSummonerName, url, setSummoner } = useContext(RegionContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

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

    useEffect(() => {
        if (localStorage.getItem('summonerName')) {
            const fetchSummonerFromLocal = async () => {
                const reg = regionTransform(region)
                const summ = localStorage.getItem('summonerName')
                const summonerRes = await fetch(`${url}/summoner/${reg}/${summ}`)
                if (summonerRes.status === 400) {
                    setError(true)
                    setLoading(false)
                    return
                }
                const summonerData = await summonerRes.json()
                setSummoner(summonerData)
                setLoading(false)
            }
            fetchSummonerFromLocal()
        } else if (!summonerName) {
            return
        } else {
            const fetchSummoner = async () => {
                const reg = regionTransform(region)
                const summ = summonerName
                setSummonerName('')
                const summonerRes = await fetch(`${url}/summoner/${reg}/${summ}`)
                if (summonerRes.status === 400) {
                    setError(true)
                    setLoading(false)
                    return
                }
                const summonerData = await summonerRes.json()
                setSummoner(summonerData)
                setLoading(false)
            }
            fetchSummoner()
        }
    }, [])

    return (
        <div>
            {
                localStorage.getItem('summonerName') ? (
                    <div>
                        {
                            !error ? (
                                <div>
                                    {
                                        loading ? (
                                            <p> Loading</p>
                                        ) : (
                                                <div>
                                                    <div>
                                                        <div>
                                                            <img src={summoner.icon} />
                                                            <img src={summoner.border} />
                                                            <p>{summoner.level}</p>
                                                        </div>
                                                        <div>
                                                            <p>{summoner.name}</p>
                                                            <p>Solo 5v5</p>
                                                            <p>{summoner.ranked.tier}</p>
                                                            <p>{summoner.ranked.rank}</p>
                                                            <p>{summoner.ranked.leaguePoints}</p>
                                                            <p>{summoner.ranked.wins}</p>
                                                            <p>{summoner.ranked.losses}</p>
                                                            <p>{summoner.ranked.hotStreak}</p>
                                                            <p>{summoner.ranked.winPercentage}</p>
                                                            <img src={summoner.ranked.rankImg} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <p>{summoner.totalMasteryScore}</p>
                                                            {summoner.championMastery.map(champ => (<p key={champ.championId}>{champ.championId} -- {champ.championLevel} -- {champ.championPoints}</p>))}
                                                        </div>
                                                        <div>
                                                            {summoner.matchHistory.map(match => (<p key={match.gameId}>{match.gameId} -- {match.champion} -- {match.timestamp}</p>))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                            ) : (
                                    <p>Summoner not found</p>
                                )
                        }
                    </div>
                ) : (
                        <p>Search for summoner</p>
                    )
            }
        </div>
    )
}

export default Dashboard