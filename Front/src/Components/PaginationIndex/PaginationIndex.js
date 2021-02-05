import React, { Fragment, useState } from 'react'
import { useFetch } from '../../Hooks/useFetch';
import { ArticlesTable } from '../ArticlesTable/ArticlesTable';
import PaginationIndexCss from './PaginationIndex.module.css'

export const PaginationIndex = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const {response, isLoading} = useFetch("http://localhost:8888/get-count-articles");

    const GetPaginationIndex = () => {

        if(response){

            const { res, result } = response;
            
            if(res === "1"){

                const PageLimit = 10;
                const TotalPages = Math.ceil(result[0].totalArticles/PageLimit);

                const rangePagination = (from, to, step = 1) => {
                    let i = from;
                    const range = [];
                  
                    while (i <= to) {
                      range.push(i);
                      i += step;
                    }
                  
                    return range;
                }

                const Pages = rangePagination(1, TotalPages);

                return <div className={PaginationIndexCss.paginationContainer}>

                            <button className={PaginationIndexCss.LeftBtn} onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)}>
                                <i className="fas fa-arrow-left"></i>
                            </button>

                            {Pages.map(page => {
                               return <Fragment key={page} >
                                            <button className={currentPage === page ? `${PaginationIndexCss.paginationBtnActive}` : `${PaginationIndexCss.paginationBtn}` } onClick={() => {setCurrentPage(page)}}>
                                                {page}
                                            </button>
                                      </Fragment>
                            })}

                            <button className={PaginationIndexCss.RightBtn} onClick={() => currentPage < TotalPages ? setCurrentPage(currentPage + 1) : setCurrentPage(TotalPages)}>
                                <i className="fas fa-arrow-right"></i>
                            </button>

                       </div>
            }

            if(res === "0"){
                //HACER
            }

            if(res === "-1"){
                //HACER
            }
        }
    }

    const articlesTablePainter = () => {

        if(currentPage){
            return <> <ArticlesTable currentPage={currentPage} TotalPages={response && Math.ceil(response.result[0].totalArticles/10)} /> </>
        }
    }

    return (
        <>
          {articlesTablePainter()}
          {!isLoading && GetPaginationIndex()}
        </>
    )
}
