import React from "react";

export default class Hero extends React.Component {
  render() {
    return (
      <div className="p-6 bg-blue-500">
        <h1 className="text-2xl text-white">{this.props.children}</h1>
      </div>
    );
  }
}