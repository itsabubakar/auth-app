import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'

import Context from "./components/Context"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Theme from "./components/ThemeContext"
import UserInfo from './components/UserInfo'


const App = () => {

  return (
    <div>
      <Context>
        <Theme>
          <Router>
            <Routes>
              {/* <Route path='/' element={<SignUp />} /> */}
              <Route path='/' element={<UserInfo />} />
              <Route path='/login' element={<Login />} />
              {/* <Route path='/userinfo/:id' element={<UserInfo />} /> */}
            </Routes>
          </Router>
        </Theme>
      </Context>
    </div>
  )
}
export default App