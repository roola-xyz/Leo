import type { Preview } from "@storybook/react-vite";

import "./storybook.css";

const preview: Preview = {
  parameters: {
    /*
     * The theme keys dark mode off a `dark` class on <html> — the same class
     * every application sets from its stored preference — so the toolbar
     * toggle has to set that rather than a media query.
     */
    darkMode: {
      classTarget: "html",
      darkClass: "dark",
      lightClass: "light",
      stylePreview: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
