import React from "react";

export default class TranscriptSearch extends React.Component {
  render() {
    return (
      <div>
        <div className="bg-gray-200">
          <div className="p-6">
            <form>
              <div className="m-2">
                <label className="mr-2">Search for transcripts:</label>
                <input type="text" name="term" placeholder="e.g. &quot;a phrase&quot; or text"
                       className="rounded-sm w-1/2"/>
              </div>
              <div className="m-2">
                <label className="mr-2">Published Year:</label>
                <select name="year" className="rounded-sm">
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