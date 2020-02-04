import React, {useState, useEffect} from 'react'
import {SEARCH_QUERY_QUIZZES} from "../../utils/QuizApi";
import {useQuery} from '@apollo/react-hooks';
import Spinner from "./Spinner";


const Search = () => {
    const [filter, setFilter] = useState(false);
    let isLoading = true;

    const {loading, error, data} = useQuery(SEARCH_QUERY_QUIZZES, {
        variables: {filter},
    });

    console.log(data);

    useEffect(() => {

    }, [filter]);

    const render = (data === undefined) ? 'Hello' : data.quizzes[0].name;
    return (
        <div>
            <div>
                Search
                <input type='text' onChange={e => setFilter(e.target.value)}/>
            </div>
            {render}
        </div>
    )


}

export default Search;