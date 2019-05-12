import React from 'react'
import moment from 'moment'

const Match = ({ match }) => {
    const minutes = Math.floor(match.duration / 60)
    const seconds = match.duration - minutes * 60

    const color = match.win ? '#3676c4' : '#f35353'

    return (
        <div className="match" style={{ borderLeft: `3px solid ${color}` }}>
            <div className="match__left">
                <div className="match__left--top">
                    <div className="top__win">
                        <p style={{ color }}>{match.win ? 'Victory' : 'Defeat'}</p>
                        <p>{moment(match.timestamp).fromNow()}</p>
                    </div>
                    <div className="top__info">
                        <img src={match.champion.icon} />
                        <div className="top__spells">
                            <img src={match.spell1.img} />
                            <img src={match.spell2.img} />
                        </div>
                        <div className="top__kda">
                            <p><span>{match.k}</span> / <span>{match.d}</span> / <span>{match.a}</span></p>
                            <p>{((match.k + match.a) / match.d).toFixed(2)}</p>
                        </div>
                        <p className="top__cs"><span>{match.cs}</span> CS</p>
                    </div>
                </div>
                <div className="match__left--bot">
                    <p>{match.gameMode}</p>
                    <p>{`${minutes}:${seconds}`}</p>
                    <p>First Blood: <span>{`${match.firstBlood}`}</span></p>
                </div>
            </div>
            <div className="match__right">
                {
                    match.players.map(player => (
                        <div className="match__player" key={player.summoner}>
                            <img src={player.icon} />
                            <p>{player.summoner}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Match