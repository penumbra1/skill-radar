import React, { PureComponent } from "react";
import { Tabs } from "antd";
import ContentAnimation from "./animations/animations";
import Message from "./Message/Message";
import Backdrop from "./Message/Backdrop";

const TabPane = Tabs.TabPane;

const text = {
  profile:
    "Are you cut out to be a police detective? Or a marine photographer? Compare skill profiles across hundreds of occupations and find out.",
  compare:
    "Hit the compare button, add a few occupations here and see which skills they have in common.",
  related: "Discover occupations with a similar skill profile."
};

class TabContainer extends PureComponent {
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
              <ContentAnimation show={!!content}>{content}</ContentAnimation>
              <ContentAnimation show={!content}>
                <Message>{error || text[tab]}</Message>
              </ContentAnimation>
            </TabPane>
          ))}
        </Tabs>
        <Backdrop show={!tabs[activeKey]} />
      </>
    );
  }
}

export default TabContainer;
