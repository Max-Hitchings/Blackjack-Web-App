import React from "react";

import { Test } from "./Test.jsx";
import "./Test.css";

export default {
  title: "Components/Test",
  component: Test,
};

const Template = (args) => <Test {...args}>TEST</Test>;

export const Primary = Template.bind({});
