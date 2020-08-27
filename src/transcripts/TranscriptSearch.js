import React from "react";
import {withRouter} from 'react-router'
import {Link} from "react-router-dom";
import Moment from 'moment';
import Hero from "../common/Hero";

class TranscriptSearch extends React.Component {
  constructor(props) {
    super(props);
    const initialParams = new URLSearchParams(this.props.location.search);
    this.state = {
      term: initialParams.get('term') || '',
      year: initialParams.get('year') || 'Any',
      res: {},
      matches: [],
      isLoading: false
    }

    this.availableYears = ['Any'];
    let yr = new Date().getFullYear();
    while (yr >= 1993) {
      this.availableYears.push(yr);
      yr--;
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchTranscripts = this.searchTranscripts.bind(this);
    this.updateRequestParams = this.updateRequestParams.bind(this);
    this.searchAllYears = this.searchAllYears.bind(this);
    this.searchSingleYear = this.searchSingleYear.bind(this);
    this.handleResultSuccess = this.handleResultSuccess.bind(this);
  }

  /**
   * Listen to url changes.
   * When a change occurs, update the state to reflect the search params and perform a search.
   * Searching in this way supports back and forward browser navigation.
   */
  componentDidMount() {
    console.log(this.props);
    this._isMounted = true;
    this.unlisten = this.props.history.listen((location, action) => {
      const search = location.search;
      const params = new URLSearchParams(search);
      this.setState({
                      term: params.get('term') || '',
                      year: params.get('year') || 'Any'
                    })
      this.searchTranscripts();
    })

    // Search when first loading the page
    this.searchTranscripts();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unlisten();
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleYearChange(event) {
    this.setState({year: event.target.value})
  }

  handleSubmit(event) {
    this.setState({isLoading: true})
    this.updateRequestParams();
    event.preventDefault();
  }

  updateRequestParams() {
    this.props.history.push(`${window.location.pathname}?term=${this.state.term}&year=${this.state.year}`);
  }

  searchTranscripts() {
    console.log(this.state);
    const realTerm = this.state.term || '*'
    if (isNaN(this.state.year)) {
      this.searchAllYears(realTerm);
    } else {
      this.searchSingleYear(realTerm);
    }
  }

  searchAllYears(realTerm) {
    fetch("http://localhost:8080/api/3/transcripts/search?term=" + realTerm + "&year=" + this.state.year)
      .then(res => res.json())
      .then(this.handleResultSuccess)
  }

  searchSingleYear(realTerm) {
    fetch("http://localhost:8080/api/3/transcripts/" + this.state.year + "/search?term=" + realTerm)
      .then(res => res.json())
      .then(this.handleResultSuccess)
  }

  handleResultSuccess(result) {
    console.log(result);
    if (this._isMounted) {
      this.setState({
                      res: result,
                      matches: result.result.items,
                      isLoading: false
                    })
    }
  }

  render() {
    return (
      <div>
        <Hero>Transcripts</Hero>
        <div className="bg-gray-200">
          <div className="p-6">
            <form onSubmit={this.handleSubmit}>
              <div className="m-2">
                <label className="mr-2">Search for transcripts:</label>
                <input type="text" name="term"
                       value={this.state.term}
                       onChange={this.handleTermChange}
                       placeholder="e.g. &quot;a phrase&quot; or text"
                       className="rounded-sm w-1/2"/>
              </div>
              <div className="m-2">
                <label className="mr-2">Published Year:</label>
                <select value={this.state.year}
                        onChange={this.handleYearChange}
                        name="year" className="rounded-sm">
                  {this.availableYears.map(function (yr) {
                    return <option key={yr}>{yr}</option>
                  })}
                </select>
              </div>
              <div className="m-2">
                <input type="submit" value="Search" className="p-2 rounded-sm bg-blue-400"/>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="text-center">
            <span className="font-bold">{this.state.res.total} results found</span>
          </div>
          <ul>
            {this.state.matches.map(function (m) {
              return (
                <div key={m.result.dateTime} className="m-2">
                  <li>
                    <Link to={`${this.props.location.pathname}/${m.result.dateTime}`}
                          className="font-bold text-blue-400">
                      {Moment(m.result.dateTime).format('MMM D, yyyy hh:mm:ss a')}
                    </Link>
                    &nbsp;- {m.result.sessionType}
                  </li>
                  {m.highlights.text &&
                  <pre className="m-4 p-2 bg-gray-200">
                    <span>
                    {m.highlights.text}
                    </span>
                  </pre>
                  }
                </div>
              )
            }, this)}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(TranscriptSearch)