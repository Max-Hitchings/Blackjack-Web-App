import React from "react";

import { StyledButton } from "./Button.jsx";

export default {
  title: "Components/StyledButton",
  component: StyledButton,
};

const Template = (args) => <StyledButton {...args}>TEST</StyledButton>;

export const Primary = Template.bind({});
Primary.args = { color: "red", p: "30", m: "0" };

export const Secondary = Template.bind({});
Secondary.args = { color: "blue", p: "30", m: "0" };
