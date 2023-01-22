import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import api from '../components/AxiosBase'
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const [isLoading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async (email: any, password: any) => {
        setLoading(true)


        const response = await api.post('/api/signup', { email, password })
        try {
            console.log('hello')
            console.log(response.data.userId)
            const id = response.data.userId
            setLoading(false)
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(response.data))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: response.data })

            // navigate to dashboard
            navigate(`/edit/${id}`)
        } catch (error) {
            console.log('fuck is going on?')
            console.log(error)
            setLoading(false)
        }
    }

    return { signup, isLoading }
}