import React, { useState, useContext, useEffect } from 'react'
import Loading from './Loading'
import Match from './Match'

import RegionContext from '../context/region-context'

const Dashboard = () => {
    const { summoner, summonerName, region, setSummonerName, url, setSummoner } = useContext(RegionContext)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [matches, setMatches] = useState([])

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

    const onLoad = async (name) => {
        const reg = regionTransform(localStorage.getItem('region'))
        const summ = name
        setSummonerName('')
        const summonerRes = await fetch(`${url}/summoner/${reg}/${summ}`)
        if (summonerRes.status === 400) {
            setError(true)
            setLoading(false)
            return
        }
        const summonerData = await summonerRes.json()
        summonerData.matchHistory.sort((a, b) => {
            return b.timestamp - a.timestamp
        })
        setSummoner(summonerData)
        setLoading(false)
    }

    useEffect(() => {
        if (localStorage.getItem('summonerName')) {
            onLoad(localStorage.getItem('summonerName'))
        } else if (!summonerName) {
            return
        } else {
            onLoad(summonerName)
        }
    }, [])

    return (
        <div className="container-small dashboard">
            {
                localStorage.getItem('summonerName') ? (
                    <>
                        {
                            !error ? (
                                <>
                                    {
                                        loading ? (
                                            <Loading />
                                        ) : (
                                                <>
                                                    <div className="dashboard__top">
                                                        <div className="dashboard__top-summoner">
                                                            <div className="dashboard__top-summoner-icon">
                                                                <img className="icon" src={summoner.icon} />
                                                                {summoner.ranked.wins ? <img className="icon-border" src={summoner.ranked.border} /> : ''}
                                                                <p>{summoner.level}</p>
                                                            </div>
                                                            <h2>{summoner.name}</h2>
                                                        </div>
                                                        <div className="dashboard__top-rank">
                                                            <img src={summoner.ranked.rankImg} />
                                                            <div>
                                                                <span>Solo 5v5</span>
                                                                {
                                                                    summoner.ranked.wins ? (
                                                                        <>
                                                                            <h4>{summoner.ranked.tier} {summoner.ranked.rank}</h4>
                                                                            <p>{summoner.ranked.leaguePoints} LP</p>
                                                                            <p>{summoner.ranked.wins} W/ {summoner.ranked.losses} L ({summoner.ranked.winPercent}%)</p>
                                                                            <strong>Hot Steak: <span>{`${summoner.ranked.hotStreak}`}</span></strong>
                                                                        </>
                                                                    ) : (
                                                                            <div className="unranked">
                                                                                <h4>Unranked</h4>
                                                                            </div>
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dashboard__bottom">
                                                        <div className="mastery">
                                                            <h4>Mastery</h4>
                                                            <p>Total Mastery Score: <span>{summoner.totalMasteryScore}</span></p>
                                                            {summoner.championMastery.map(champ => (
                                                                <div key={champ.champId} className="mastery__champion">
                                                                    <img src={champ.icon} />
                                                                    <div>
                                                                        <p>{champ.name}</p>
                                                                        <p>Level: <span>{champ.championLevel}</span> - Points: <span>{champ.championPoints.toLocaleString('en')}</span></p>
                                                                        <p>Last played: <span>{champ.lastPlayTime}</span></p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div>
                                                            {summoner.matchHistory.map(match => (
                                                                <Match key={match.gameId} match={match} />
                                                            )
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                    }
                                </>
                            ) : (
                                    <p>Summoner not found</p>
                                )
                        }
                    </>
                ) : (
                        <p>Search for summoner</p>
                    )
            }
        </div>
    )
}

export default Dashboard