import React, { Component } from "react";
import {
  isEmpty,
  processSkills,
  getRelatedSkills,
  intersectSkills,
  getRelatedJobs
} from "../lib/utils";
import Layout from "./Layout/Layout";
import Controls from "./Controls/Controls";
import TabsContainer from "./TabsContainer";
import Profile from "./data/Profile/Profile";
import Compare from "./data/Compare/Compare";
import Related from "./data/Related/Related";

const Status = React.createContext();

// CONSIDER: Use PureComponent for shallow compare.
// State.compare is mutable via push(), but the entire App
// doesn't need to rerender as it's only used for the Compare component
class App extends Component {
  state = {
    job: null,
    topSkillsList: [],
    topSkillsByType: {},
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

      let skillsState = {};

      if (!isEmpty(allSkills)) {
        const [topSkillsList, topSkillsByType] = processSkills(allSkills);

        skillsState = {
          topSkillsList,
          topSkillsByType,
          error: null
        };
      } else {
        skillsState = {
          topSkillsList: [],
          topSkillsByType: {},
          error: `Hm, it appears we haven't talked to a ${
            this.state.job.title
          } yet... Please search for someone else or explore related occupations.`
        };
      }

      this.setState({ ...skillsState, relatedJobs, loading: false });
    }
  }

  handleJobSubmit = job => {
    this.setState({ job });
  };

  handleCompare = () => {
    this.setState(({ compare, topSkillsList, job: selectedJob }) => {
      if (!compare.find(j => j.job.id === selectedJob.id)) {
        return {
          compare: intersectSkills(compare, topSkillsList, selectedJob)
        };
      }
      // Avoid render if job was already added to compare
      return null;
    });
  };

  render() {
    const {
      job,
      error,
      loading,
      topSkillsByType,
      compare,
      relatedJobs
    } = this.state;

    return (
      <Status.Provider value={{ loading, error }}>
        <Layout title={job && job.title}>
          <Controls
            onSelect={this.handleJobSubmit}
            onClick={this.handleCompare}
          />
          <TabsContainer
            error={error}
            profile={
              !isEmpty(topSkillsByType) && <Profile {...topSkillsByType} />
            }
            compare={!isEmpty(compare) && <Compare data={compare} />}
            related={!isEmpty(relatedJobs) && <Related jobs={relatedJobs} />}
          />
        </Layout>
      </Status.Provider>
    );
  }
}

export { App as default, Status };
