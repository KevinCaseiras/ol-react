import React from "react";
import TranscriptSearch from "./TranscriptSearch";
import Hero from "../common/Hero";

export default function Transcripts() {
  return (
    <div>
      <Hero>Transcripts</Hero>
      <div className="ml-8 mr-8 mb-8">
        <TranscriptSearch></TranscriptSearch>
      </div>
    </div>
  );
}
