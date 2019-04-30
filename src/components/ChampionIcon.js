import React from 'react'
import { Link } from 'react-router-dom'

const ChampionIcon = ({ champ }) => {
    return (
        <Link to={`/champion/${champ.champId}`} className="championIcon">
            <img className="championIcon__img" alt={champ.name} src={champ.icon} />
            <p className="championIcon__name">{champ.name}</p>
        </Link>
    )
}

export default ChampionIcon