import React from "react";
import {withRouter} from 'react-router'

class TranscriptSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      year: 'Any',
      matches: [],
      isLoading: false
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

  componentDidMount() {
    this._isMounted = true;
    this.unlisten = this.props.history.listen((location, action) => {
      console.log(location);

      const search = this.props.location.search;
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
                      matches: result.result.items,
                      isLoading: false
                    })
    }
  }

  render() {
    return (
      <div>
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
                  <option>Any</option>
                  <option>2020</option>
                  <option>2019</option>
                </select>
              </div>
              <div className="m-2">
                <input type="submit" value="Search" className="p-2 rounded-sm bg-blue-300"/>
              </div>
            </form>
          </div>
        </div>

        <div>
          <ul>
            {this.state.matches.map(function (m) {
              return <li key={m.result.dateTime}>{m.result.dateTime}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(TranscriptSearch)