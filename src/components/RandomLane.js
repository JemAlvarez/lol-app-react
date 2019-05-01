import React, { useState, useEffect, useContext } from 'react'

import Loading from './Loading'

import RegionContext from '../context/region-context'

const RandomLane = () => {
    const [{ primary, secondary }, setLanes] = useState({})
    const { url } = useContext(RegionContext)

    useEffect(() => {
        const fetchLanes = async () => {
            const lanesRes = await fetch(`${url}/random-lane`)
            const lanesData = await lanesRes.json()
            setLanes(lanesData)
        }
        fetchLanes()
    }, [])

    return (
        <div className="container-small random-lanes">
            <h1>Random Lanes</h1>
            <div className="random-lanes__container">
                <div className="random-lanes__lane">
                    {
                        primary !== undefined ? (
                            <>
                                <h3>{primary.lane1}</h3>
                                <img src={primary.img} />
                            </>
                        ) : (
                                <Loading />
                            )
                    }
                </div>
                <div className="random-lanes__lane">
                    {
                        primary !== undefined ? (
                            <>
                                <h3>{secondary.lane2}</h3>
                                <img src={secondary.img} />
                            </>
                        ) : (
                                <Loading />
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default RandomLane