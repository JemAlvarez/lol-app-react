import React, { useState, useEffect, useContext } from 'react'

import Loading from './Loading'

import RegionContext from '../context/region-context'

const RandomChampion = () => {
    const [champion, setChampion] = useState({})
    const { url } = useContext(RegionContext)

    useEffect(() => {
        const fetchChamp = async () => {
            const champRes = await fetch(`${url}/random-champion`)
            const champData = await champRes.json()
            setChampion(champData)
            document.querySelector('.random-champion__background-img').setAttribute('style', `background-image: url(${champData.splashImg})`)
            document.querySelector('.random-champion__roles').setAttribute('style', `grid-template-columns: repeat(${champData.role.length}, 1fr)`)
        }
        fetchChamp()
    }, [])

    return (
        <div className="container-small random-champion">
            <h1>Random Champion</h1>
            <div className="random-champion__container">
                <div className="random-champion__background-img"></div>
                {
                    champion.name !== undefined ? (
                        <>
                            <img src={champion.icon} />
                            <h2>{champion.name} <span>{champion.title}</span></h2>
                            <div className="random-champion__roles">
                                {
                                    champion.role.map(role => (
                                        <p key={role}>{role}</p>
                                    ))
                                }
                            </div>
                        </>
                    ) : (
                            <Loading />
                        )
                }
            </div>
        </div>
    )
}

export default RandomChampion