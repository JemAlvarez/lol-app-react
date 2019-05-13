import React, { useContext, useEffect, useState } from 'react'

import RegionContext from '../context/region-context'

const Champion = (props) => {
    const { url } = useContext(RegionContext)
    const [champ, setChamp] = useState({})

    useEffect(() => {
        const fetchChamp = async () => {
            const champRes = await fetch(`${url}/champion/${props.match.params.id}`)
            const champData = await champRes.json()
            setChamp(champData)
            document.querySelector('.champion__roles').setAttribute('style', `grid-template-columns: repeat(${champData.role.length}, 1fr);`)
        }

        fetchChamp()
    }, [])

    return (
        <div className="container-small champion">
            <div className="champion__info">
                <img src={champ.icon} className="champion__icon" />
                <h1>{champ.name} <span>{champ.title}</span></h1>
            </div>
            <p>{champ.desc}</p>
            <div className="champion__roles">{champ.role ? champ.role.map(role => (<span key={role}>{role}</span>)) : ''}</div>
        </div>
    )
}

export default Champion