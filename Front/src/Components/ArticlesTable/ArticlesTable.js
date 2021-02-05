import React, { Fragment, useState } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import { Supplier } from '../Supplier/Supplier';
import ArticlesTableCss from './ArticlesTable.module.css';

export const ArticlesTable = ({currentPage, TotalPages}) => {

    const [articleId, setArticleId] = useState({
        article_id : null
    })

    const [sortState, setSortState] = useState({
        sortName : true,
        sortRelevance : null,
        sortPrice : null
    });

    const { sortName, sortRelevance, sortPrice } = sortState;

    const {response, isLoading} = useFetch(`http://localhost:8888/get-articles?page=${currentPage}`);

    const handleSortStateName = (e) => {

        e.preventDefault();

        setSortState({
            ...sortState,
            sortName : sortName === true ? false : true,
            sortRelevance : null,
            sortPrice : null
        })
    }
    const handleSortStateRelevance = (e) => {

        e.preventDefault();

        setSortState({
            ...sortState,
            sortName : null,
            sortRelevance : sortRelevance === true ? false : true,
            sortPrice : null
        })
    }
    const handleSortStatePrice = (e) => {

        e.preventDefault();

        setSortState({
            ...sortState,
            sortName : null,
            sortRelevance : null,
            sortPrice : sortPrice === true ? false : true
        })
    }

    const PaintSortByName = (products) => {

        let productName = products.map(product => [product.nombre, product.relevancia, product.precio, product.article_id]);

        let ArrNameSorted = sortName ? productName.sort() : productName.sort().reverse();

        return <>  
                {ArrNameSorted.map(product => {
                        return <Fragment key={product[3]}>
                                    <tr className={articleId.article_id === product[3] ? `${ArticlesTableCss.articleSelected}` : ""} onClick={() => setArticleId({article_id : product[3]})}>
                                        <td>{product[0]}</td>
                                        <td>{product[1]}</td>
                                        <td>{`${product[2]}€`}</td>
                                        
                                    </tr>
                                    {/* {articleId.article_id !== null && PaintSupplier()} */}
                                </Fragment>
                    })}
            </>

    }
    const PaintSortByRelevance = (products) => {

        let productRelevance = products.map(product => [product.relevancia, product.nombre, product.precio, product.article_id]);

        let ArrNameSorted = sortRelevance ? productRelevance.sort() : productRelevance.sort().reverse();

        return <>  
                {ArrNameSorted.map(product => {
                        return <Fragment key={product[3]}>
                                    <tr className={articleId.article_id === product[3] ? `${ArticlesTableCss.articleSelected}` : ""} onClick={() => setArticleId({article_id : product[3]})}>
                                        <td>{product[1]}</td>
                                        <td>{product[0]}</td>
                                        <td>{`${product[2]}€`}</td>
                                        
                                    </tr>
                                    {/* {articleId.article_id !== null && PaintSupplier()} */}
                                </Fragment>
                    })}
              </>

    }
    
    const PaintSortByPrice = (products) => {

        let productPrice = products.map(product => [product.precio, product.nombre, product.relevancia, product.article_id]);
        let ArrNameSorted = sortPrice ? productPrice.sort((a, b) =>  a - b) : productPrice.sort((a, b) => b - a);

        return <>  
                {ArrNameSorted.map(product => {
                        return <Fragment key={product[3]}>
                                    <tr className={articleId.article_id === product[3] ? `${ArticlesTableCss.articleSelected}` : ""} onClick={() => setArticleId({article_id : product[3]})}>
                                        <td>{product[1]}</td>
                                        <td>{product[2]}</td>
                                        <td>{`${product[0]}€`}</td>
                                        
                                    </tr>
                                    {/* {articleId.article_id !== null && PaintSupplier()} */}
                                </Fragment>
                    })}
            </>
    }

    const GetArticles = () => {

        if(response){
            const { res, articlesResult } = response;

            if(res === "1"){

                const {articles_page_count, products} = articlesResult;

                return <div className={ArticlesTableCss.ArticlesTableContainer}>

                        <table className={ArticlesTableCss.articlesTable}>
                            <tbody>
                                <tr>
                                    <th>NOMBRE <i className={(sortName || sortName === null) ? `${ArticlesTableCss.downArrow} fas fa-sort-down` : `${ArticlesTableCss.upArrow} fas fa-sort-up`} onClick={handleSortStateName}></i></th>

                                    <th>RELEV. <i className={(sortRelevance || sortRelevance === null) ? `${ArticlesTableCss.downArrow} fas fa-sort-down` : `${ArticlesTableCss.upArrow} fas fa-sort-up`} onClick={handleSortStateRelevance}></i></th>

                                    <th>{`PRECIO(€)`} <i className={(sortPrice || sortPrice === null) ? `${ArticlesTableCss.downArrow} fas fa-sort-down` : `${ArticlesTableCss.upArrow} fas fa-sort-up`} onClick={handleSortStatePrice}></i></th>
                                </tr>

                                {(sortName === true || sortName === false) && PaintSortByName(products)}
                                {(sortRelevance === true || sortRelevance === false) && PaintSortByRelevance(products)}
                                {(sortPrice === true || sortPrice === false) && PaintSortByPrice(products)}

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

    const PaintSupplier = () => {
        
        if(articleId.article_id){
            
            return <div className={ArticlesTableCss.supplierContainer}>
                        <h3>Fabricante del producto</h3>
                        <Supplier article_id={articleId.article_id}/>
                   </div>
            
        }

    }

    return (
        <>
            {PaintSupplier()}
            {!isLoading && GetArticles()}
        </>
    )
}
