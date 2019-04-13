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
    activeTab: "profile",
    error: null,
    loading: false
  };

  async componentDidUpdate(prevProps, prevState) {
    // Avoid rerender on tab change
    if (
      (!prevState.job || this.state.job.id === prevState.job.id) &&
      prevState.activeTab !== this.state.activeTab
    )
      return null;

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
        const error = this.state.job.title
          ? `Hm, it appears we haven't talked to a ${
              this.state.job.title
            } yet... Please search for someone else or explore related occupations.`
          : "Ouch, something went wrong, please try another search.";
        skillsState = {
          topSkillsList: [],
          topSkillsByType: {},
          error
        };
      }

      this.setState({
        ...skillsState,
        relatedJobs,
        loading: false,
        activeTab: "profile"
      });
    }
  }

  handleSearch = job => {
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

  handleRelated = e => {
    const { id, title } = e.target.dataset;
    this.setState({ job: { id, title } });
  };

  handleTabChange = tabKey => {
    this.setState({ activeTab: tabKey });
  };

  render() {
    const {
      job,
      topSkillsByType,
      compare,
      relatedJobs,
      activeTab,
      error,
      loading
    } = this.state;

    return (
      <Status.Provider value={{ loading, error }}>
        <Layout title={job && job.title}>
          <Controls
            onSelect={this.handleSearch}
            onClick={this.handleCompare}
            job={this.state.job}
          />
          <TabsContainer
            error={error}
            activeTab={activeTab}
            onChange={this.handleTabChange}
            profile={
              !isEmpty(topSkillsByType) && <Profile {...topSkillsByType} />
            }
            compare={!isEmpty(compare) && <Compare data={compare} />}
            related={
              !isEmpty(relatedJobs) && (
                <Related jobs={relatedJobs} onClick={this.handleRelated} />
              )
            }
          />
        </Layout>
      </Status.Provider>
    );
  }
}

export { App as default, Status };
