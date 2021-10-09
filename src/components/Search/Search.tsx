import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams, useLocation, useHistory
} from "react-router-dom";
import './Search.scss';

export const Search = () => {
    const [query, setQuery] = useState<string | object>("")
    // console.log('render');
    const location = useLocation();
    let search = queryString.parse(location.search)

    if (search && search[""]) {
        if (query !== search[''])
            setQuery(search[''])
    }
    console.log(query);


    useEffect(() => {

        console.log('fetch');
        // {
        //     search(query: "tes", type: REPOSITORY, first: 3, after: "Y3Vyc29yOjY=") {
        //       repositoryCount
        //       edges {
        //         cursor
        //         node {
        //           ... on Repository {
        //             id
        //             name
        //             createdAt
        //             description
        //             homepageUrl
        //             url
        //           }
        //         }
        //       }
        //       pageInfo {
        //         hasNextPage
        //         endCursor
        //       }
        //     }
        //   }

    }, [query])


    return (
        <div>
            Search
        </div>
    )
}

