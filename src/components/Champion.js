import React from 'react'

const Champion = (props) => {
    return (
        <div>{props.match.params.id}</div>
    )
}

export default Champion