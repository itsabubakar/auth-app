import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'

import Context from "./context/Context"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Theme from "./context/ThemeContext"
import UserInfo from './components/UserInfo'
import DetailsForm from './components/DetailsForm'
import Auth from './context/AuthContext'


const App = () => {

  return (
    <div>
      <Context>
        <Auth>
          <Theme>
            <Router>
              <Routes>
                <Route path='/' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<DetailsForm />} />
                {/* <Route path='/' element={<UserInfo />} /> */}
                {/* <Route path='/userinfo/:id' element={<UserInfo />} /> */}
              </Routes>
            </Router>
          </Theme>
        </Auth>

      </Context>
    </div>
  )
}
export default App