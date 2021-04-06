import React from "react";

import JoinGamePage from "./JoinGamePage.jsx";

export default {
  title: "Pages/JoinGamePage",
  component: JoinGamePage,
};

const Template = (args) => <JoinGamePage {...args} />;

export const Main = Template.bind({});
