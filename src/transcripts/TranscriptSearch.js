import React from "react";

export default class TranscriptSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      year: 'Any'
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleYearChange(event) {
    this.setState({year: event.target.value})
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
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
      </div>
    );
  }
}