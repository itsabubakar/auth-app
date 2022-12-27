import { useContext } from "react";
import DataContext, { DataProvider } from "./Context";

const Testing = () => {
    const { posts, setPosts } = useContext(DataContext)

    console.log(posts)
    console.log(setPosts)

    return (
        <DataProvider>
            <p>{posts}</p>
            <button>Click</button>
        </DataProvider>
    )
}
export default Testing