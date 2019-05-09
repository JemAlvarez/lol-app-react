import React, { useState, useContext, useEffect } from 'react'

import RegionContext from '../context/region-context'

const Dashboard = () => {
    const { summoner } = useContext(RegionContext)

    return (
        <div>
            <div>
                <img src={summoner.icon} />
                <div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard