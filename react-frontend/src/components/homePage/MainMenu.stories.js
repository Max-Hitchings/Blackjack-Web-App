import React from "react";

import MainMenu from "./MainMenu.jsx";

export default {
  title: "Pages/MainMenu",
  component: MainMenu,
};

const Template = (args) => <MainMenu {...args} />;

export const Main = Template.bind({});
