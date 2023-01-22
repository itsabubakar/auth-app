import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Theme from "./context/ThemeContext"
import UserInfo from './pages/UserInfo'
import DetailsForm from './components/DetailsForm'
import Auth from './context/AuthContext'


const App = () => {

  return (
    <div>
      <Auth>
        <Theme>
          <Router>
            <Routes>
              <Route path='/' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/edit' element={<DetailsForm />} />
              <Route path='/edit/:id' element={<DetailsForm />} />
              <Route path='/dashboard/:id' element={<UserInfo />} />
              <Route path='/userinfo/:id' element={<UserInfo />} />
            </Routes>
          </Router>
        </Theme>
      </Auth>
    </div>
  )
}
export default App