import React from "react";
import TranscriptSearch from "./TranscriptSearch";
import Hero from "../common/Hero";
import { Route, Switch, useRouteMatch, useParams} from "react-router-dom";

export default function Transcripts() {

  let {path, url} = useRouteMatch();

  return (
    <div>
      <Hero>Transcripts</Hero>
      <div className="ml-8 mr-8 mb-8">
        <Switch>
          <Route exact path={path}>
            <TranscriptSearch></TranscriptSearch>
          </Route>
          <Route path={`${path}/:dateTime`} children={<TranscriptView />}>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function TranscriptView() {

  let { dateTime } = useParams();

  return (
    <div>
      transcript view {dateTime}
    </div>
  )
}
