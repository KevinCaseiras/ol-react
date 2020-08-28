import React, {useEffect, useState} from "react";
import {Link, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import Moment from 'moment';
import Hero from "../common/Hero";
import LoadingIndicator from "../common/LoadingIndicator";


export default function TranscriptSearch() {
  const query = useQuery();
  const history = useHistory();
  const [term, setTerm] = useState(query.get("term") || '');
  const [year, setYear] = useState(query.get('year') || 'Any');
  const [res, setRes] = useState({});
  const [isLoading, setLoading] = useState(true);
  let _isMounted = true;

  useEffect(() => {
    // Listen for URL changes, update term and year to the query param values when a change occurs and search transcripts.
    const unlisten = history.listen((location, action) => {
      saveQueryParams(location);
    });

    saveQueryParams(history.location);

    return () => {
      unlisten();
      _isMounted = false;
    }
  }, [])

  useEffect(() => {
    searchTranscripts(term || '', year || 'Any');
  }, [term, year]);

  function saveQueryParams(location) {
    const params = new URLSearchParams(location.search);
    setTerm(params.get('term') || '');
    setYear(params.get('year') || 'Any');
  }

  function searchTranscripts(term, year) {
    setLoading(true);
    const realTerm = term || '*'
    if (isNaN(year)) {
      searchAllYears(realTerm);
    } else {
      searchSingleYear(realTerm, year);
    }
  }

  function searchAllYears(realTerm) {
    fetch("http://localhost:8080/api/3/transcripts/search?term=" + realTerm)
      .then(res => res.json())
      .then(handleResultSuccess)
  }

  function searchSingleYear(realTerm, year) {
    fetch("http://localhost:8080/api/3/transcripts/" + year + "/search?term=" + realTerm)
      .then(res => res.json())
      .then(handleResultSuccess)
  }

  function handleResultSuccess(result) {
    console.log(result);
    if (_isMounted) {
      setRes(result);
      setLoading(false);
    }
  }

  function onFormSubmit(newTerm, newYear) {
    history.push(`${history.location.pathname}?term=${newTerm}&year=${newYear}`);
  }

  // Switch between showing search results and loading indicator.
  const body = () => {
    if (isLoading) {
      return <LoadingIndicator/>
    } else {
      return <SearchResults matches={res.result.items} total={res.total}/>
    }
  }

  return (
    <div>
      <Hero>Transcripts</Hero>
      <SearchForm term={term} year={year} onFormSubmit={onFormSubmit}/>
      {body()}
    </div>
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchForm(props) {
  const [dirtyTerm, setDirtyTerm] = useState(props.term);
  const [dirtyYear, setDirtyYear] = useState(props.year);
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    setAvailableYears(initAvailableYears());
  }, [])

  useEffect(() => {
    setDirtyTerm(props.term);
    setDirtyYear(props.year);
  }, [props.term, props.year])

  function handleSubmit(event) {
    props.onFormSubmit(dirtyTerm, dirtyYear);
    event.preventDefault();
  }

  function initAvailableYears() {
    let availableYears = ['Any'];
    let yr = new Date().getFullYear();
    while (yr >= 1993) {
      availableYears.push(yr);
      yr--;
    }
    return availableYears;
  }

  return (
    <div className="bg-gray-200 p-6">
      <form onSubmit={handleSubmit}>
        <div className="m-2">
          <label className="mr-2">Search for transcripts:</label>
          <input type="text"
                 value={dirtyTerm} name="term"
                 onChange={e => setDirtyTerm(e.target.value)}
                 placeholder="e.g. &quot;a phrase&quot; or text"
                 className="rounded-sm w-1/2"/>
        </div>
        <div className="m-2">
          <label className="mr-2">Published Year:</label>
          <select value={dirtyYear}
                  onChange={e => setDirtyYear(e.target.value)}
                  name="year" className="rounded-sm">
            {availableYears.map(function (yr) {
              return <option key={yr}>{yr}</option>
            })}
          </select>
        </div>
        <div className="m-2">
          <input type="submit" value="Search" className="p-2 rounded-sm bg-blue-400"/>
        </div>
      </form>
    </div>
  )
}

function SearchResults(props) {
  const [matches, setMatches] = useState(props.matches);
  const [totalMatches, setTotalMatches] = useState(props.total);

  useEffect(() => {
    setMatches(props.matches);
    setTotalMatches(props.total);
  }, [props.matches, props.total])

  return (
    <div>
      <div className="text-center">
        <span className="font-bold">{totalMatches} results found</span>
      </div>
      <div>
        <ul>
          {matches.map(function (m) {
            return <SearchResultLink key={m.result.dateTime} match={m}/>
          })}
        </ul>
      </div>
    </div>
  )
}

function SearchResultLink(props) {
  const {path, url} = useRouteMatch();
  const [match] = useState(props.match);

  return (
    <div className="m-2">
      <li>
        <Link to={`${path}/${match.result.dateTime}`}
              className="font-bold text-blue-400">
          {Moment(match.result.dateTime).format('MMM D, yyyy hh:mm:ss a')}
        </Link>
        &nbsp;- {match.result.sessionType}
      </li>
      <SearchResultHighlights highlightText={match.highlights.text}/>
    </div>
  )
}

function SearchResultHighlights(props) {
  const [highlightText] = useState(props.highlightText);

  function formatHighlightText(highlightText) {
    return {__html: highlightText};
  }

  if (highlightText) {
    return (
      <div>
        <pre className="m-4 p-2 bg-gray-200">
          <span dangerouslySetInnerHTML={formatHighlightText(highlightText)}/>
        </pre>
      </div>
    )
  } else {
    return null
  }
}