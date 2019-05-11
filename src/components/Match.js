import React from 'react'

const Match = ({ match }) => {
    return (
        <div>
            <div>
                <div>
                    <div>
                        <p>{match.win ? 'Victory' : 'Defeat'}</p>
                        <p>{match.timestamp}</p>
                    </div>
                    <div>
                        <img src={match.champion.icon} />
                        <div>
                            <img src={match.spell1.img} />
                            <img src={match.spell2.img} />
                        </div>
                        <div>
                            <p>{`${match.k} / ${match.d} / ${match.a}`}</p>
                            <p>{((match.k + match.a) / match.d).toFixed(2)}</p>
                        </div>
                        <p>{match.cs} CS</p>
                    </div>
                </div>
                <div>
                    <p>{match.gameMode}</p>
                    <p>{match.duration}</p>
                    <p>First Blood: {match.firstBlood}</p>
                </div>
            </div>
            <div>
                {
                    match.players.map(player => (
                        <div>
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