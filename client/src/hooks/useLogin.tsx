import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import api from '../components/AxiosBase'
import { useNavigate } from "react-router-dom"


export const useLogin = () => {
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email: any, password: any) => {
        setLoading(true)


        const response = await api.post('/api/login', { email, password })
        try {
            console.log(response.data)
            setLoading(false)

            // save user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: response.data })
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return { login, isLoading }
}