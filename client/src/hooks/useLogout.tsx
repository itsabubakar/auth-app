import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({
            type: 'LOGOUT',
            payload: undefined
        })

        navigate('/login')
    }

    return { logout }
}