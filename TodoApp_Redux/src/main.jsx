import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App /> {/* Since App is wrapped by the provider the store will be accessible to App and all its chidren components */}
    </Provider>
  </StrictMode>,
)
