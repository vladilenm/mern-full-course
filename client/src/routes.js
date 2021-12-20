import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'



import {AuthPage} from './pages/AuthPage'
import {PortfolioPage} from './pages/PortfolioPage'
import {OfficePage} from './pages/OfficePage'
import {PositionsPage} from './pages/PositionsPage'
import {AdminPage} from './pages/AdminPage'
import {PayPage} from './pages/PayPage'
import {AgreementPage} from './pages/AgreementPage'


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/office" exact>
          <OfficePage />
        </Route>

        <Route path="/portfolio" exact>
          <PortfolioPage />
        </Route>

        <Route path="/positions" exact>
          <PositionsPage />
        </Route>

        <Route path="/admin" exact>
          <AdminPage />
        </Route>        

        <Route path="/pay" exact>
          <PayPage />
        </Route>
        
        <Redirect to="/office" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>

      <Route path="/agreement" exact>
          <AgreementPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  )
}
