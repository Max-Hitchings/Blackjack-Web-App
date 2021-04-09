import React from "react";

import { StyledTextField } from "./TextField.jsx";

export default {
  title: "Components/StyledTextField",
  component: StyledTextField,
};

const Template = (args) => <StyledTextField {...args} />;

export const Main = Template.bind({});
Main.args = { widthFull: true };
