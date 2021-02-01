import React from 'react'
import { useFetch } from '../../Hooks/useFetch'

export const ArticlesTable = ({currentPage}) => {

    const {response, isLoading} = useFetch(`http://localhost:8888/get-articles?page=${currentPage}`);

    const GetArticles = () => {

        if(response){
            console.log(response)

        }

    }

    return (
        <>
            {!isLoading && GetArticles()}
        </>
    )
}
