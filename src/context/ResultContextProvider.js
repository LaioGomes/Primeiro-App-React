import React, {createContext, useContext, useState} from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Elon Musk');

    // /videos, /search, /images
    const getResults = async (type) => {
        setIsloading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-User-Agent': 'desktop',
                //'X-Proxy-Location': 'EU',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
                'X-RapidAPI-Key': 'bcbfe35045msh4838434e99998e4p10f974jsn67f40d7d4977'

            }
        });

        const data = await response.json();

        if(type.includes('/news')) {
            setResults(data.entries);
        } else if(type.includes('/images')) {
            setResults(data.image_results);
        } else if(type.includes('/videos')) {
            setResults(data.results);
        }

        setIsloading(false);
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext);
