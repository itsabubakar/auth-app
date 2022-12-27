import { createContext, useState } from 'react';

const DataContext = createContext({ posts: 'Hello', setPosts: () => { } });

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState('Hello')
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults,
            posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;