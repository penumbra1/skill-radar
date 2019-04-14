import React from "react";
import Select from "antd/lib/select";
import { searchJobs } from "../../lib/data";
import Loader from "../Loader/Loader";

const Option = Select.Option;

export default class SearchInput extends React.Component {
  state = {
    options: [],
    // value null won't work: https://github.com/react-component/select/issues/265
    value: undefined,
    loadingOptions: false
  };

  handleSearch = async value => {
    this.setState({ loadingOptions: true });
    const jobs = await searchJobs(value);
    const options = jobs.map(j => <Option key={j.uuid}>{j.suggestion}</Option>);
    this.setState({ options, loadingOptions: false });
  };

  handleSelect = ({ key, label }) => {
    this.setState({ value: { key, label } });
    this.props.onSelect({ id: key, title: label });
  };

  render() {
    const { options } = this.state;
    const notFound = this.state.loadingOptions ? (
      <Loader fontSize="1.8rem" />
    ) : this.state.value && this.state.options.length === 0 ? (
      "Not found"
    ) : null;

    return (
      <Select
        placeholder="Start typing to select an occupation"
        value={this.state.value}
        labelInValue
        showSearch
        allowClear
        showArrow
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onSelect={this.handleSelect}
        notFoundContent={notFound}
        style={{ width: "350px" }}
      >
        {options}
      </Select>
    );
  }
}
