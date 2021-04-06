import React from "react";

import { StyledButton } from "./Button.jsx";

export default {
  title: "Components/StyledButton",
  component: StyledButton,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["Primary", "Secondary"],
      },
    },
    textColor: {
      control: {
        type: "color",
        defaultValue: "#ffffff",
      },
    },
  },
};

const Template = (args) => <StyledButton {...args}>TEST</StyledButton>;

export const Primary = Template.bind({});
Primary.args = { variant: "Primary" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "Secondary" };
