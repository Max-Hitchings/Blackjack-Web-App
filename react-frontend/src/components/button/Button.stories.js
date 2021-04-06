import React from "react";

import { StyledButton } from "./Button.jsx";

export default {
  title: "Components/StyledButton",
  component: StyledButton,
  argTypes: {
    variant: {
      control: {
        type: "inline-radio",
        options: ["Primary", "Secondary"],
      },
    },
    textColor: {
      control: "color",
      defaultValue: "black",
    },
    borderRadius: { control: "number", defaultValue: 20 },
    m: { control: "number", defaultValue: 0 },
    p: { control: "number", defaultValue: 30 },
  },
};

const Template = (args) => <StyledButton {...args}>TEST</StyledButton>;

export const Primary = Template.bind({});
Primary.args = { variant: "Primary" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "Secondary" };
