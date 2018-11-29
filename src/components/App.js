import React, { Component } from "react";
import {
  processSkills,
  getRelatedSkills,
  intersectSkills,
  getRelatedJobs
} from "../lib/utils";
import Layout from "./Layout/Layout";
import Controls from "./Controls/Controls";
import TabContainer from "./TabContainer";
import Profile from "./data/Profile/Profile";
import Compare from "./data/Compare/Compare";

const Status = React.createContext();

// CONSIDER: Use PureComponent for shallow compare.
// State.compare is mutable via push(), but the entire Apps
// doesn't need to rerender as it's only used for the Compare component
class App extends Component {
  state = {
    job: null,
    skillsList: [],
    topSkills: {},
    compare: [],
    relatedJobs: [],
    error: null,
    loading: false
  };

  async componentDidUpdate(prevProps, prevState) {
    if (!prevState.job || this.state.job.id !== prevState.job.id) {
      this.setState({ loading: true });

      const [allSkills, relatedJobs] = await Promise.all([
        getRelatedSkills(this.state.job.id),
        getRelatedJobs(this.state.job.id)
      ]);

      let newState = {};

      if (allSkills.length > 0) {
        const [skillsList, topSkills] = processSkills(allSkills);

        newState = {
          skillsList,
          topSkills,
          error: null
        };
      } else {
        newState = {
          skillsList: [],
          topSkills: {},
          error: `Hm, it appears we haven't talked to a ${
            this.state.job.title
          } yet... Please search for someone else or explore related occupations.`
        };
      }

      this.setState({ ...newState, relatedJobs, loading: false });
    }
  }

  handleJobSubmit = job => {
    this.setState({ job });
  };

  handleCompare = () => {
    this.setState(({ compare, skillsList, job: selectedJob }) => {
      if (!compare.find(j => j.job.id === selectedJob.id)) {
        return {
          compare: intersectSkills(compare, skillsList, selectedJob)
        };
      }
      // Avoid render if job was already added to compare
      return null;
    });
  };

  render() {
    const { job, error, loading, topSkills, compare, relatedJobs } = this.state;

    return (
      <Status.Provider value={{ loading, error }}>
        <Layout title={job && job.title}>
          <Controls
            onSelect={this.handleJobSubmit}
            onClick={this.handleCompare}
          />
          <TabContainer
            error={error}
            profile={
              Object.keys(topSkills).length > 0 && <Profile {...topSkills} />
            }
            compare={compare.length > 0 && <Compare data={compare} />}
            related={
              relatedJobs.length > 0 && (
                <div>
                  {relatedJobs.map(j => (
                    <p key={j.id} style={{ display: "inline-block" }}>
                      {j.title}
                    </p>
                  ))}
                </div>
              )
            }
          />
        </Layout>
      </Status.Provider>
    );
  }
}

export { App as default, Status };
