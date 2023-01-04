import Context from "./components/Context"
import SignUp from "./components/SignUp"
import Theme from "./components/ThemeContext"


const App = () => {
  return (
    <div>
      <Context>
        <Theme>
          <SignUp />
        </Theme>
      </Context>
    </div>
  )
}
export default App