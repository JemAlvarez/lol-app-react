import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import AppRouter from './routers/AppRouter'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const App = () => (<AppRouter />)

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
