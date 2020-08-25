import React from "react";

export default class TranscriptSearch extends React.Component {
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
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleYearChange(event) {
    this.setState({year: event.target.value})
  }

  handleSubmit(event) {
    this.setState({isLoading: true})
    this.searchTranscripts();
    event.preventDefault();
  }

  searchTranscripts() {
    const realTerm = this.state.term || '*'
    fetch("http://localhost:8080/api/3/transcripts/search?term=" + realTerm + "&year=" + this.state.year)
      .then(res => res.json())
      .then((result) => {
              console.log(result);
              this.setState({
                              matches: result.result.items,
                              isLoading: false
                            })
            },
            (error) => {
              console.log(error);
              this.setState({isLoading: false})
            });
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