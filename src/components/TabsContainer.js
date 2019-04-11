import React, { PureComponent } from "react";
import { Tabs } from "antd";
import Backdrop from "./Backdrop/Backdrop";
import Tab from "./Tab/Tab";

const TabPane = Tabs.TabPane;

const text = {
  profile:
    "Are you cut out to be a police detective? Or a marine photographer? Compare skill profiles across hundreds of occupations and find out.",
  compare:
    "Hit the compare button, add a few occupations here and see which skills they have in common.",
  related: "Discover occupations with a similar skill profile."
};

class TabsContainer extends PureComponent {
  state = { activeKey: undefined };

  handleChange = activeKey => {
    this.setState({ activeKey });
  };

  render() {
    const { error, ...tabs } = this.props;
    const activeKey = this.state.activeKey || Object.keys(tabs)[0];

    return (
      <>
        <Tabs
          activeKey={activeKey}
          tabBarStyle={{ margin: "0 1.5rem" }}
          onChange={this.handleChange}
        >
          {Object.entries(tabs).map(([tab, content]) => (
            <TabPane
              tab={`${tab[0].toUpperCase()}${tab.slice(1)}`}
              key={tab}
              forceRender
            >
              <Tab message={error || text[tab]}>{content}</Tab>
            </TabPane>
          ))}
        </Tabs>
        <Backdrop show={!tabs[activeKey]} />
      </>
    );
  }
}

export default TabsContainer;
