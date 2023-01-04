import { useContext, useState } from "react";
import Context, { UserContext } from "./Context";

const TestingTwo = () => {
    const { name, setName } = useContext(UserContext)
    const handleChange = () => {
        setName('Bread')
        console.log(setName)
    }

    return (
        <Context>
            <h1>Hello {name}</h1>
            <button onClick={handleChange}>Click</button>
        </Context>
    )
}
export default TestingTwo