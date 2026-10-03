import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const theme = create(
  {
    brandTitle: "Leo | Design System",
    brandUrl: "https://atomixplus.github.io/Leo/",
    brandImage: "leo.png",
    base: "dark",
  },
  {
    brandTitle: "Leo | Design System",
    brandUrl: "https://atomixplus.github.io/Leo/",
    brandImage: "leo.png",
    base: "light",
  },
);

addons.setConfig({
  theme,
});
