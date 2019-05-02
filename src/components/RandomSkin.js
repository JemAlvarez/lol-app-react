import React, { useEffect, useContext, useState } from 'react'

import Loading from './Loading'
import Modal from 'react-modal'
import { IoMdClose } from 'react-icons/io'

import RegionContext from '../context/region-context'

const RandomSkin = () => {
    const { url } = useContext(RegionContext)
    const [champions, setChampions] = useState([])
    const [skin, setSkin] = useState({})
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchChamps = async () => {
            const champsRes = await fetch(`${url}/champions`)
            const champsData = await champsRes.json()
            setChampions(champsData)
        }
        fetchChamps()
        // eslint-disable-next-line
    }, [])

    const onChampionClick = async (champ) => {
        const skinRes = await fetch(`${url}/random-skin/${champ}`)
        const skinData = await skinRes.json()
        setSkin(skinData)
        setOpen(true)
    }

    const onRequestClose = () => {
        setOpen(false)
        document.querySelector('body').setAttribute("style", "overflow: visible")
    }

    const onAfterOpen = () => {
        document.querySelector('body').setAttribute("style", "overflow: hidden")
    }

    return (
        <div className="container-small">
            <h1>Select one champion</h1>
            <div className="champions__container">
                <div>
                    {
                        champions.length > 1 ? (
                            champions.map(champion => (
                                <div key={champion.name} onClick={() => { onChampionClick(champion.idName) }} className="champion__champion-icon">
                                    <img className="championIcon__img" alt={champion.name} src={champion.icon} />
                                    <p className="championIcon__name">{champion.name}</p>
                                </div>
                            ))
                        ) : (
                                <Loading />
                            )
                    }
                </div>
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={open}
                onRequestClose={onRequestClose}
                onAfterOpen={onAfterOpen}
                closeTimeoutMS={200}
                className="modal"
            >
                <div className="modal__body">
                    <button
                        className="modal__close"
                        onClick={onRequestClose}
                    >
                        <IoMdClose />
                    </button>
                    {
                        skin.num !== undefined ? (
                            <>
                                <h2>{skin.name}</h2>
                                <p>Chromas: <span>{`${skin.chromas}`}</span></p>
                                <img src={skin.splashArt} />
                            </>
                        ) : (
                                <Loading />
                            )
                    }
                </div>
            </Modal>
        </div>
    )
}

export default RandomSkin