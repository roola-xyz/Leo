// import "@testing-library/jest-dom";

import "storybook/test";
import { afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";

// after each test
afterEach(() => {
  cleanup();
});

// before each test
beforeAll(() => { });
