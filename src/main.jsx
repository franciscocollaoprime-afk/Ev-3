import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ListaTareas } from './components/ListaTareas'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='container py-5'>
      <ListaTareas />
    </div>
  </StrictMode>,
)
