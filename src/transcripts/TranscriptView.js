import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import Hero from '../common/Hero';
import Moment from 'moment';
import LoadingIndicator from "../common/LoadingIndicator";

export default function TranscriptView() {
  let [transcript, setTranscript] = useState(null);
  let [isLoading, setLoading] = useState(true);
  let {dateTime} = useParams();

  useEffect(() => {
    async function loadTranscript() {
      let res = await fetch(`http://localhost:8080/api/3/transcripts/${dateTime}`)
      res = await res.json();
      setTranscript(res.result);
      setLoading(false);
    }

    loadTranscript()
  }, [dateTime]);

  if (isLoading) {
    return <TranscriptLoading/>;
  } else {
    return <TranscriptInfo transcript={transcript}/>
  }
};

function TranscriptLoading() {
  return <LoadingIndicator/>
}

function TranscriptInfo(props) {
  const [transcript] = useState(props.transcript);

  return (
    <div>
      <Hero>Session Transcript: {Moment(transcript.dateTime).format('MMM D, yyyy')}</Hero>
      <div className="bg-gray-200 p-4">
        <span className="font-bold">{transcript.sessionType}</span>
        <br/>
        <span>{Moment(transcript.dateTime).format('MMM D, yyyy hh:mm:ss a')}
          , {transcript.location}</span>
      </div>
      <div className="bg-gray-200 mt-4 p-4">
        <pre>
          {transcript.text}
        </pre>
      </div>
    </div>
  )
}
