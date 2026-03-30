import type { Preview } from "@storybook/react";
import "./preview.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "#faf9f6" },
        { name: "surface-container-low", value: "#f4f3f1" },
        { name: "surface-container", value: "#efeeeb" },
        { name: "white", value: "#ffffff" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
