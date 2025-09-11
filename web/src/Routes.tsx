import { Routes as ReactRouterRoutes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'
import Redirect from './pages/Redirect'

export function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/:shortCode" element={<Redirect />} />
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  )
}
