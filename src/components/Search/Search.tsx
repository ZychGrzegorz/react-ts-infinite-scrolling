import { useContext, useRef, useState, useCallback } from 'react'
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import dateFormat from "dateformat";
import './Search.scss';
import { QueryContext } from '../../context/QueryContext';
import { useSearch } from '../../hooks/useSearch';
import { FaGithub } from 'react-icons/fa';
import { VscDebugStart } from 'react-icons/vsc';
import { CircularProgress } from '@mui/material';

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

                setPageNumber(pageNumber + 1)              
            }
        })
        if (node) observer.current.observe(node)
     
    }, [loading, hasNextPage])

    const location = useLocation();

    let urlSearch = queryString.parse(location.search)


    if (urlSearch && urlSearch[""]) {
        if (query !== urlSearch[''])
            setQuery(`${urlSearch['']}`)
    }

    return (
        <div className="searchContainer">
            <div className='searchContainerList'>
                <div className='searchInput'>Wyniki wyszukiwania dla: <span className="searchInputQuery">{query}</span></div>
                {query.length > 2 &&
                    <ul className="searchList">
                        {repos.map((el: any, index: any) => {

                            if (repos.length === index + 1) {

                                return (
                                    <li className={'searchList-Element'} key={el.cursor} ref={lastRepoElementRef}>
                                        <div className='searchList-ElementContainer'>
                                            <div className='infoContainer cardElement'>
                                                <span className='cardtitle'>{el.node?.name}</span>
                                                <div className="userInfoContainer">
                                                    <img className='cardAvatar' src={el.node.owner.avatarUrl} alt="" />
                                                    <span className='cardAuthor'>{el.node?.owner?.login}</span>
                                                </div>

                                                <span className='cardCreatedAt'>{dateFormat(el.node?.createdAt)}</span>
                                            </div>
                                            <div className='iconsContainer cardElement'>
                                                <a target="_blank" href={el.node?.url}> <FaGithub className='cardIcon' /></a>
                                                {el.node?.homepageUrl && <a target="_blank" href={el.node?.homepageUrl}>  <VscDebugStart className='cardIcon' /> </a>}


                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li className={'searchList-Element'} key={el.cursor}>
                                        <div className='searchList-ElementContainer'>
                                            <div className='infoContainer cardElement'>
                                                <span className='cardtitle'>{el.node?.name}</span>
                                                <div className="userInfoContainer">
                                                    <img className='cardAvatar' src={el.node.owner.avatarUrl} alt="" />
                                                    <span className='cardAuthor'>{el.node?.owner?.login}</span>
                                                </div>

                                                <span className='cardCreatedAt'>{dateFormat(el.node?.createdAt)}</span>
                                            </div>
                                            <div className='iconsContainer cardElement'>
                                                <a target="_blank" href={el.node?.url}> <FaGithub className='cardIcon' /></a>
                                                {el.node?.homepageUrl && <a target="_blank" href={el.node?.homepageUrl}>  <VscDebugStart className='cardIcon' /> </a>}


                                            </div>
                                        </div>
                                    </li>)
                            }
                        })}
                    </ul>}
                <div className='loadingContainer container'>{loading && <CircularProgress className='loadingIcon' color="inherit" />}</div>
                <div className='errorContainer container'>{error ? <span>Wystąpił błąd: <span className='searchingInfo'>{error}</span></span> : null}</div>
                <div>{(repos.length && !hasNextPage) ? <span className='searchingInfo'>Nie znaleziono więcej wyników</span> : null}</div>
                <div>{(!repos.length && !loading && !error) && <span className='searchingInfo'>Przepraszamy, ale nie znaleźliśmy podanej przez Ciebie frazy.</span>}</div></div>

        </div>
    )
}

//React.FC
//porządkowanie importów

//usunac console.log
//uporzadkowac kod

//404
//home

