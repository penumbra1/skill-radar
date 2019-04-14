import React from "react";
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

const TabsContainer = ({ activeTab, onChange, error, ...tabs }) => {
  return (
    <>
      <Tabs
        activeKey={activeTab}
        tabBarStyle={{
          margin: "0 1.5rem"
        }}
        onChange={onChange}
      >
        {Object.entries(tabs).map(([tab, content]) => (
          <TabPane
            tab={`${tab[0].toUpperCase()}${tab.slice(1)}`}
            key={tab}
            forceRender
            style={{
              maxWidth: "95vw",
              position: "relative"
            }}
          >
            <Tab error={error} fallback={text[tab]}>
              {content}
            </Tab>
          </TabPane>
        ))}
      </Tabs>
      <Backdrop show={!tabs[activeTab]} />
    </>
  );
};

export default TabsContainer;
