import React, { Fragment } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import ArticlesTableCss from './ArticlesTable.module.css';

export const ArticlesTable = ({currentPage, TotalPages}) => {

    const {response, isLoading} = useFetch(`http://localhost:8888/get-articles?page=${currentPage}`);

    const GetArticles = () => {

        if(response){
            const { res, articlesResult } = response;

            if(res === "1"){

                const {articles_page_count, products} = articlesResult;

                return <div className={ArticlesTableCss.ArticlesTableContainer}>

                        <table className={ArticlesTableCss.articlesTable}>
                            <tbody>
                                <tr>
                                    <th>NOMBRE</th>
                                    <th>RELEV.</th>
                                    <th>{`PRECIO(€)`}</th>
                                </tr>
                                
                                {products.map(({article_id, nombre, relevancia, precio}) => {
                                    return <Fragment key={article_id}>
                                                <tr>
                                                    <td>{nombre}</td>
                                                    <td>{relevancia}</td>
                                                    <td>{precio}</td>
                                                </tr>
                                        </Fragment>
                                })}
                            </tbody>
                        </table>

                        <div className={ArticlesTableCss.InfoTableContainer}>
                            <p className={ArticlesTableCss.InfoLeft}>{`Artículos mostrados ${articles_page_count}`}</p>
                            <p className={ArticlesTableCss.InfoRight}>{`Página ${currentPage} de ${TotalPages}`}</p>
                        </div>

                    </div>
				
            }

        }

    }

    return (
        <>
            {!isLoading && GetArticles()}
        </>
    )
}
