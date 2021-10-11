import { useContext, useRef, useState, useCallback } from 'react'
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import './Search.scss';
import { QueryContext } from '../../context/QueryContext';
import { useSearch } from '../../hooks/useSearch';

// type repoType = any


export const Search = () => {
    const { query, setQuery } = useContext(QueryContext)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const { repos, loading, error, hasNextPage } = useSearch(query, pageNumber)
    const observer: any = useRef()

    const lastRepoElementRef = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
           
            if (entries[0].isIntersecting) {
                if (hasNextPage) {
                    console.log('nextpage');
                    setPageNumber(pageNumber + 1)
                    console.log(pageNumber);
                }
            }
        })
        if (node) observer.current.observe(node)
        console.log(node);
    }, [loading])
    const location = useLocation();

    let urlSearch = queryString.parse(location.search)


    if (urlSearch && urlSearch[""]) {
        if (query !== urlSearch[''])
            setQuery(`${urlSearch['']}`)
    }

    return (
        <>
            {/* <button onClick={() => { setPageNumber(pageNumber + 1) }}>page load</button> */}
            {/* <p>{pageNumber} </p> */}
            <br></br>
            {query.length<3?<div>more than 3</div>:<>
            <ul>
                {repos.map((el: any, index: any) => {

                    if (repos.length === index + 1) {

                        return (<li className={'searchListElement'} key={el.cursor} ref={lastRepoElementRef}>{el.node.name} {el.cursor}  'laast'</li>
                        )
                    }
                    else {
                        return (<li className={'searchListElement'} key={el.cursor}>{el.node.name} {el.cursor} </li>)
                    }
                })}
            </ul>
            <div>{loading && 'Loading...'}</div>
            <div>{error && error}</div>
            <div>{(repos.length && !hasNextPage)? 'No more repos found':null}</div>
            <div>{(!repos.length && !loading && !error) && "No repos found"}</div></>}
        </>
    )
}

//React.FC
//porządkowanie importów
//stylowanie
//error string
//usunac console.log
//uporzadkowac kod
//RWD