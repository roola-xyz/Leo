# Leo <img src="./src/assets/leo.png" width="100" height="150"/> ![Version](https://img.shields.io/badge/Version-0.0.4-blue) [![Storybook](https://img.shields.io/badge/Storybook-Live-FF4785?logo=storybook)](https://atomixplus.github.io/Leo/) 

![Code_Coverage](https://img.shields.io/badge/Code_Coverage-100%25-brightgreen)
[![Testing](https://github.com/AtomixPlus/Leo/actions/workflows/testing.yml/badge.svg)](https://github.com/AtomixPlus/Leo/actions/workflows/coverage.yml?branch=main)
[![Linting](https://github.com/AtomixPlus/Leo/actions/workflows/linting.yml/badge.svg)](https://github.com/AtomixPlus/Leo/actions/workflows/linting.yml?branch=main)
[![Building](https://github.com/AtomixPlus/Leo/actions/workflows/building.yml/badge.svg)](https://github.com/AtomixPlus/Leo/actions/workflows/building.yml?branch=main)
[![Deploying](https://github.com/AtomixPlus/Leo/actions/workflows/deploying.yml/badge.svg)](https://github.com/AtomixPlus/Leo/actions/workflows/deploying.yml?branch=main)

Thank you for your interest in contributing to this project! 🎉

**We welcome contributions of all kinds — bug fixes, features, documentation, and improvements.**

This guide outlines how to contribute effectively, including branching strategy, pull requests, code quality, and best practices for adding new features or fixing issues. Following these guidelines ensures a smooth workflow for both contributors and maintainers.

<br>


<!--
# ============================================================================
# 📑 TABLE OF CONTENTS 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟
# ============================================================================
#
# This section outlines the **structure of the README** and provides a clear
# roadmap for contributors and users navigating the Leo repository 🦁.
#
# ────────────────────────────────────────────────────────────────────────────
# ✅ OBJECTIVES
# ────────────────────────────────────────────────────────────────────────────
#
# • Make it easy to locate key sections like installation, Storybook, testing, 
#   and contribution guidelines
# • Provide quick links for better navigation and readability
# • Ensure new contributors can understand the workflow without confusion
#
# ────────────────────────────────────────────────────────────────────────────
# 🛠️ BEST PRACTICES
# ────────────────────────────────────────────────────────────────────────────
#
# • Use descriptive section headers
# • Include links to key sections within the README
# • Keep numbering and indentation consistent for readability
# • Add badges or icons to highlight tools, versions, or CI status
#
# ────────────────────────────────────────────────────────────────────────────
# ⚡ IMPORTANT
# ────────────────────────────────────────────────────────────────────────────
#
# • Update the table of contents whenever a new section is added or renamed
# • Ensure links are accurate and reflect the current README structure
# • Maintain consistency with emojis, numbering, and formatting for clarity
#
# ============================================================================
-->
# 📑 Table of Contents

[![Pnpm](https://img.shields.io/badge/Pnpm-v10.26.0-informational?style=flat&logo=pnpm&color=F9AD00)](https://pnpm.io/)
[![npm](https://img.shields.io/badge/npm-v10.8.2-informational?style=flat&logo=npm&color=CC3534)](https://pnpm.io/)
[![Node.js](https://img.shields.io/badge/Node.js-v20.20.2-informational?style=flat&logo=nodedotjs&color=3c873a)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-v7.2.6-informational?style=flat&logo=vite&color=646CFF)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-v4.0.15-informational?style=flat&logo=vite&color=646CFF)](https://vitest.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-v10.1.4-FF4785?style=flat&logo=storybook&logoColor=FF4785)](https://storybook.js.org/)
[![TypeScript](https://img.shields.io/badge/Typescript-v5.9.3-informational?style=flat&logo=typescript&color=3178c6)](https://www.typescriptlang.org/)
[![React.js](https://img.shields.io/badge/React.js-v18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.1.17-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prettier](https://img.shields.io/badge/Prettier-v3.9.9-F7B93E?style=flat&logo=prettier&logoColor=white)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/ESLint-v10.12.0-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)


- 1️⃣ [Prerequisites](#prerequisites)  
- 2️⃣ [Installation](#installation)  
- 3️⃣ [Creating Issues](#creating-issues)  
- 4️⃣ [Branching](#branching)  
- 5️⃣ [Pull Requests](#pull-requests)  
- 6️⃣ [Commit Messages](#commit-messages)  
  - 6️⃣.1️⃣ [Chores and Minor Fixes](#chores-and-minor-fixes)  
- 7️⃣ [Workflow Summary](#workflow-summary)  
- 8️⃣ [Styling Guide](#styling-guide)  
- 9️⃣ [Code Quality](#code-quality)  
- 🔟 [Storybook](#storybook)  
  - 🔟.1️⃣ [Running Storybook](#running-storybook)  
  - 🔟.2️⃣ [Building Storybook](#building-storybook)  
  - 🔟.3️⃣ [Writing Stories](#writing-stories)  
  - 🔟.4️⃣ [Using Stories for Testing](#using-stories-for-testing)  
- 1️⃣1️⃣ [Testing](#testing)  
  - 1️⃣1️⃣.1️⃣ [Running Tests](#running-tests)  
  - 1️⃣1️⃣.2️⃣ [Writing Tests](#writing-tests)  
- 1️⃣2️⃣ [Linting & Formatting](#linting--formatting)  
- 1️⃣3️⃣ [Security and Reporting Issues](#security-and-reporting-issues)  
- 1️⃣4️⃣ [Final Notes](#final-notes)  
- 1️⃣5️⃣ [Thank You](#thank-you)  



<br><br><br>






















<!--
# ============================================================================
# ⚙️ PREREQUISITES
# ============================================================================
#
# This section defines the **software and tools required** to contribute to the
# Leo project 🦁. Ensuring these are correctly installed is the first step before
# installing dependencies or running the project.
#
# ────────────────────────────────────────────────────────────────────────────
# ✅ OBJECTIVES
# ────────────────────────────────────────────────────────────────────────────
#
# • Confirm that all contributors use supported versions of Node.js and pnpm
# • Prevent inconsistencies caused by different package managers
# • Ensure a smooth setup for development, testing, and Storybook
#
# ────────────────────────────────────────────────────────────────────────────
# 🛠️ REQUIRED TOOLS
# ────────────────────────────────────────────────────────────────────────────
#
# • **Node.js** - LTS version recommended
# • **pnpm** - The project enforces pnpm via the `packageManager` field; other
#   package managers are not supported
# • Optional: Recommended IDE with TypeScript support for a better developer
#   experience
#
# ────────────────────────────────────────────────────────────────────────────
# ⚡ IMPORTANT
# ────────────────────────────────────────────────────────────────────────────
#
# • Check Node.js version: `node -v`
# • Verify pnpm version: `pnpm -v`
# • Installing the correct versions prevents issues during `pnpm install`,
#   running Storybook, and executing tests
# • Keep tools up to date to match the versions specified in the repository
#
# ============================================================================
-->
<h1 id="prerequisites">🧰 Prerequisites</h1>

<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v20.19.6-informational?style=flat&logo=nodedotjs&color=3c873a" alt="Node.js"></a>
<a href="https://pnpm.io/"><img src="https://img.shields.io/badge/Pnpm-v10.26.0-informational?style=flat&logo=pnpm&color=F9AD00" alt="pnpm"></a>
<a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-v10.8.2-informational?style=flat&logo=npm&color=CC3534" alt="npm"></a>
<a href="https://bun.com/"><img src="https://img.shields.io/badge/bun-v10.8.2-informational?style=flat&logo=bun&color=FEBBD0" alt="Bun"></a>
<a href="https://yarnpkg.com/"><img src="https://img.shields.io/badge/yarn-v10.8.2-informational?style=flat&logo=yarn&color=2C8EBB&logoColor=FFFFFF" alt="Bun"></a>

Before contributing, ensure you have the following tools installed and correctly configured.


| Tool     | Version          | Required | Notes |
|----------|------------------|----------|-------|
| [Node.js](https://nodejs.org/)  | LTS (v18+ v20+) | ✅ Yes   | Use an active LTS release |
| [pnpm](https://pnpm.io/)     | Latest stable    | ✅ Yes   | Primary and recommended package manager |
| [npm](https://www.npmjs.com/)      | Bundled with Node.js | ✅ Yes | Fully supported alternative |
| [yarn](https://www.npmjs.com/)      | Latest stable | ❌ Optional | Supported, but not preferred |
| [bun](https://bun.com/)      | Latest stable | ❌ Optional | Supported, but not preferred |


<br>

**⚠️ Important**: Multiple package managers are supported, but use one package manager consistently per branch to avoid lockfile conflicts.

---




### 📦 Package Manager Guidance

- pnpm is the preferred package manager for Leo repositories.
- npm is fully supported if pnpm is not available.
- yarn is Supported, but not preferred
- bun is supported, but not preferred

<br>


### 💡  Best practice 

Pick one package manager and stick with it throughout your work on a branch or pull request.

  - Lockfiles (`pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lockb`) must not be mixed
  - CI may assume `pnpm` or `npm` unless otherwise specified

<br><br><br>






















<!--
# ============================================================================
# ⚡ INSTALLING DEPENDENCIES
# ============================================================================
#
# This section defines how to **set up the Leo project locally** by installing
# all required dependencies and preparing the development environment 🦁.
#
# ────────────────────────────────────────────────────────────────────────────
# ✅ OBJECTIVES
# ────────────────────────────────────────────────────────────────────────────
#
# • Ensure the correct versions of Node.js and pnpm are installed
# • Install all project dependencies consistently across all contributors
# • Prepare the local environment for development, testing, and Storybook
# • Avoid conflicts caused by different package managers or missing dependencies
#
# ────────────────────────────────────────────────────────────────────────────
# 🛠️ BEST PRACTICES
# ────────────────────────────────────────────────────────────────────────────
#
# • Use the version of Node.js specified in the repository (LTS recommended)
# • Always use `pnpm` — other package managers are not supported
# • Install dependencies with:
#
#   ```bash
#   pnpm install
#   ```
#
# • If dependencies are updated, run `pnpm install` again to sync
# • Do not manually modify the lockfile unless absolutely necessary
#
# ────────────────────────────────────────────────────────────────────────────
# ⚡ IMPORTANT
# ────────────────────────────────────────────────────────────────────────────
#
# • Ensure `pnpm` is installed globally: `npm install -g pnpm`
# • Check Node.js version: `node -v`
# • Verify pnpm version: `pnpm -v`
# • Follow the repository’s `packageManager` field to enforce consistency
# • Running `pnpm install` is required before starting Storybook, tests, or development
#
# ============================================================================
-->
<h1 id="installation">⚡ Installation</h1>
<a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-v7.2.6-informational?style=flat&logo=vite&color=646CFF" alt="Vite"></a>
<a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-v4.0.15-informational?style=flat&logo=vite&color=646CFF" alt="Vitest"></a>
<a href="https://storybook.js.org/"><img src="https://img.shields.io/badge/Storybook-v10.1.4-FF4785?style=flat&logo=storybook&logoColor=FF4785" alt="Storybook"></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Typescript-v5.9.3-informational?style=flat&logo=typescript&color=3178c6" alt="TypeScript"></a>
<a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React.js-v18.3.1-61DAFB?logo=react&logoColor=white" alt="React.js"></a>
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-v4.1.17-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>

<br>

Leo supports multiple package managers to fit different workflows. 

The recommended and primary package manager is `pnpm`.


### ⭐ Pnpm (Recommended)

`pnpm` is faster, more efficient with disk space, and ensures consistent dependency resolution across the monorepo.

```bash
pnpm install
```
✅ Use pnpm whenever possible, especially for development and CI.

---

<br>




### ⚡ Bun (Optional)

Leo also supports Bun for faster installs and task execution.

```bash
bun install
```
⚠️ Bun support is experimental. If you encounter issues, fall back to pnpm.

---

<br>




### ⚡ Npm (Optional)

Leo also supports Npm for faster installs and task execution.

```bash
npm install
```
⚠️ Npm support is experimental. If you encounter issues, fall back to pnpm.

---

<br>




### ⚡ Yarn (Optional)

```bash
yarn install
```
⚠️ Yarn support is experimental. If you encounter issues, fall back to pnpm.

---

<br>



### 💡 Best Practices
- Always install dependencies before running tests or Storybook
- Do not mix package managers in the same project
- Lockfiles (`pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lock`) should match the package manager used

<br><br><br>






















<!--
# ============================================================================
# 🖼️📚 STORYBOOK
# ============================================================================
#
# This section defines how **Leo components are developed, previewed, documented, 
# and tested in isolation** using Storybook 🦁.
#
# ────────────────────────────────────────────────────────────────────────────
# ✅ OBJECTIVES
# ────────────────────────────────────────────────────────────────────────────
#
# • Enable visual development of components without relying on the app
# • Document components for other developers and team members
# • Provide interactive examples for testing UI behavior and states
# • Serve as a source for automated browser tests via play functions
#
# ────────────────────────────────────────────────────────────────────────────
# 🛠️ BEST PRACTICES
# ────────────────────────────────────────────────────────────────────────────
#
# • Each component has its own story file: `Component.stories.tsx`
# • Use `Meta<typeof Component>` for type-safe story metadata
# • Define `args` for all props and variants of the component
# • Use `play` functions to simulate user interactions and automated tests
# • Group stories logically by component category for easy navigation
#
# ────────────────────────────────────────────────────────────────────────────
# ⚡ IMPORTANT
# ────────────────────────────────────────────────────────────────────────────
#
# • Storybook stories are **the source of truth** for component behavior
# • Play functions double as browser tests, ensuring visual correctness and functionality
# • Keep stories small and focused: one state or variant per story
# • Avoid exposing sensitive data in stories
#
# ============================================================================
-->
<h1 id="storybook">📚 Storybook
  <a href="https://storybook.js.org/"><img src="https://img.shields.io/badge/Storybook-v10.1.4-FF4785?style=flat&logo=storybook&logoColor=FF4785" alt="Storybook"></a>
</h1>


**Leo** uses Storybook to develop, preview, and document UI components in isolation.

**Storybook lets you:**

- 📦 Build and test components interactively.
- 🔍 Preview different states and variations of components.
- 📝 Document component behavior for other developers.

This section explains how to **create** stories, **run**, **build**, and **deploy** Storybook.

---

<br>



### ⚡ Running Storybook

To run Storybook in development mode and preview changes live:

```bash
pnpm storybook
```
- This starts a local server (usually at [http://localhost:6006](http://localhost:6006)).
- Hot reload is enabled, so updates to components or stories are reflected immediately.
- Use Storybook’s built-in controls to test different props, states, and themes.

---

<br>



### 📦 Building Storybook

To generate a static **Storybook** site that can be deployed (e.g., GitHub Pages):

```bash
pnpm storybook:build
```
- This creates a storybook-static folder in your project root.
- The output can be deployed to a static host for team previews or documentation purposes.

---

<br>



### ✏️ Writing Stories

Each component should have its own story file (<b>Component.stories.tsx</b>) following these conventions:

<details>
  <summary><b>1️⃣ File Structure</b></summary>
  
  The components/ folder contains all reusable UI components for the library. Using Button as an example, each component has its own folder with the following structure:

  ```
    📁 src/
      📁 assets/
      📁 components/
        📁 Button/
          📄 Button.tsx
          📄 Button.test.tsx
          📄 Button.stories.tsx
          📄 index.ts
      📁 tools/
      📄 index.ts
  ```

  #### ✅ Why this structure?
  - Keeps everything about a component cohesive
  - No long file names like **Button.styles.tsx**, **Button.spec.tsx** in the same folder
  - **Storybook**, **tests**, and **components** live side-by-side
  
  <br>
</details>


<details>
  <summary><b>2️⃣ Meta Definition</b></summary>

  - Use `Meta<typeof Component>` from `@storybook/react-vite`.
  - Include title, component, parameters, tags, and argTypes.
  - Use `satisfies Meta<typeof Component>` to ensure type safety.

  ```ts
    import Button from './Button';

    const meta = {
      title: "Leo/Button",
      component: Button,
      parameters: {
        layout: "centered",
      },
      tags: ["autodocs"],
      argTypes: {
        propName: {
          control: "select",
          options: ["option1", "option2"],
        },
      },
    } satisfies Meta<typeof ComponentName>;

    export default meta;

  ```

  <br>
</details>




<details>
  <summary><b>3️⃣ Helper Functions</b></summary>

  - ✅  Reusable functions for common assertions help reduce repetition.
  - ✅  **Example:** `assertComponentExists` for checking if component rendered.

  ```ts
  const assertButtonExists = async (canvasElement: HTMLElement) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toBeInTheDocument();
    return button;
  };
  ```

  <br>
</details>




<details>
  <summary><b>4️⃣ Defining Stories</b></summary>

  - ✅ Each story defines args for props.
  - ✅ Optional play function for interactive tests using canvasElement.
  - ✅ Use within and userEvent to simulate user interactions.
  - ✅ Write Play functions to automate interaction testing for stories.

  ```ts
  export const Default: Story = {
    args: {
      children: "Button",
    },
    play: async ({ canvasElement }) => {
      const button = await assertButtonExists(canvasElement);
      await expect(button).toHaveTextContent("Button");
    },
  };
  ```

  <br>
</details>


<details>
  <summary><b>5️⃣ Variant Stories</b></summary>

  - ✅ Follow a consistent naming scheme for variants (e.g., **Secondary**, **Destructive**, **Outline**).
  - ✅ Keep play functions simple and focused on component-specific behavior.

  ```ts
  export const Secondary: Story = {
    args: {
      variant: "secondary",
      children: "Secondary",
    },
    play: async ({ canvasElement }) => {
      const button = await assertButtonExists(canvasElement);
      await userEvent.click(button);
      await expect(button).toHaveTextContent("Secondary");
    },
  };
  ```

  <br>
</details>




<details>
  <summary><b>6️⃣ Size/State Stories</b></summary>

  - ✅ Include stories for sizes (Small, Large) and states (Disabled).
  - ✅ Ensure play verifies accessibility props like isDisabled.

  ```ts
  export const Disabled: Story = {
    args: {
      isDisabled: true,
      children: "Disabled",
    },
    play: async ({ canvasElement }) => {
      const button = await assertButtonExists(canvasElement);
      await expect(button).toBeDisabled();
    },
  };
  ```

  <br>
</details>



<details>
  <summary><b>7️⃣ Using Stories for Testing</b></summary>

  Leo uses the Storybook stories as the source for automated browser tests:

  - ✅ Each play function can be executed by Vitest or @storybook/test to validate interactions.
  - ✅ Writing robust play functions ensures both documentation and automated tests are accurate.
  - ✅ Test stories should cover variants, sizes, and states (e.g., disabled, hover, focus).

  **Example:** Testing a button click:

  ```ts
  export const Clickable: Story = {
    args: { children: "Click Me" },

    play: async ({ canvasElement }) => {
      const button = await assertComponentExists(canvasElement);
      await userEvent.click(button);
      await expect(button).toHaveTextContent("Click Me");
    },
  };
  ```

  <br>
</details>



<details>
  <summary><b>8️⃣ Template Example for New Components</b></summary>

  Key points for writing stories:

  - **Meta definition:** Use satisfies `Meta<typeof Component>` for type safety.
  - **Args:** Define props for the component, including variants and sizes.
  - **Play functions:** Use within(canvasElement) and userEvent to simulate interactions.
  - **Reusable helpers:** Define assertion functions like assertComponentExists for consistency.
  - **Naming:** Keep story names descriptive (Default, Secondary, Disabled) and aligned with variants or states.

  <br>

  ```ts
  import type { Meta, StoryObj } from "@storybook/react-vite";
  import { ComponentName } from "./index";
  import { within, expect, userEvent } from "storybook/test";

  const meta = {
    title: "Leo/ComponentName",
    component: ComponentName,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    argTypes: {
      propName: { control: "text" },
      variant: { control: "select", options: ["default", "secondary"] },
    },
  } satisfies Meta<typeof ComponentName>;

  export default meta;
  type Story = StoryObj<typeof meta>;

  const assertComponentExists = async (canvasElement: HTMLElement) => {
    const canvas = within(canvasElement);
    const el = canvas.getByRole("button");
    await expect(el).toBeInTheDocument();
    return el;
  };

  export const Default: Story = {
    args: { children: "Default" },
    play: async ({ canvasElement }) => {
      const el = await assertComponentExists(canvasElement);
      await expect(el).toHaveTextContent("Default");
    },
  };

  export const Secondary: Story = {
    args: { variant: "secondary", children: "Secondary" },
    play: async ({ canvasElement }) => {
      const el = await assertComponentExists(canvasElement);
      await userEvent.click(el);
      await expect(el).toHaveTextContent("Secondary");
    },
  };
  ```

  <br>
</details>


<br>


### 💡 Best Practices
- ✅ Group stories by component categories for easy navigation.
- ✅ Keep stories small and focused: each story should demonstrate a single state or behavior.
- ✅ Avoid including sensitive data in stories.
- ✅ Use Storybook addons for a11y checks, viewport testing, and controls to improve documentation quality.

<br>


### 🦁 Storybook in Leo

Storybook is a core part of Leo’s development workflow, not just a documentation tool. It acts as the single source of truth for how components look, behave, and are expected to function across all states.

**By writing clear, focused stories**:

- 🎯 Developers can build and validate components in isolation.
- 🧪 The same stories power automated tests through play functions and browser runners.
- 📘 Consumers of the design system get accurate, always-up-to-date documentation.
- 🔄 Visual changes, regressions, and interaction bugs are caught early.

In Leo, if it isn’t represented in Storybook, it isn’t complete.
Well-written stories reduce the need for duplicated tests, improve collaboration across teams, and ensure long-term maintainability of the component library.

**When contributing**:

- Treat stories as production artifacts.
- Keep them intentional, minimal, and behavior-focused.
- Use play functions to encode real user expectations.

Storybook is where Leo’s components live, evolve, and prove themselves.


<br><br><br>






<!--
============================================================================
🧪 TESTING
============================================================================

This section defines how **Leo components and apps are tested** using unit tests, 
component tests, Storybook stories, mocks, and browser tests.

────────────────────────────────────────────────────────────────────────────
✅ OBJECTIVES
────────────────────────────────────────────────────────────────────────────

• Verify correctness of functions, components, and interactions
• Use Storybook stories as test sources for UI behavior
• Support both fast unit tests and slower browser tests
• Ensure CI/CD pipelines catch regressions
• Mock dependencies to isolate units under test

────────────────────────────────────────────────────────────────────────────
🛠️ BEST PRACTICES
────────────────────────────────────────────────────────────────────────────

• Each component should have its own test file (`Component.test.tsx` or `.spec.tsx`)
• Unit tests should be small, fast, and deterministic
• Use Storybook stories for visual and interaction tests when possible
• Use Happy DOM or Testing Library for DOM testing
• Use mocks (`vi.fn()`) to isolate APIs, services, or external dependencies
• Organize tests to mirror the source folder structure
• Include Playwright or other browser tests for interactive or end-to-end scenarios

────────────────────────────────────────────────────────────────────────────
⚡ IMPORTANT
────────────────────────────────────────────────────────────────────────────

• Prefer behavior-driven tests rather than implementation details
• Run tests before committing to catch regressions early
• Use Storybook stories as the single source of truth for component behavior
• Keep tests focused: one unit of behavior per test
• Store artifacts (screenshots, videos, traces) for debugging browser tests
• Fully parallelize tests where possible, but limit workers in CI for stability

────────────────────────────────────────────────────────────────────────────
💡 TIP
────────────────────────────────────────────────────────────────────────────

• Use `describe` and `it` blocks to organize unit tests
• Use `expect()` for assertions and `vi.fn()` for mocks
• Combine Storybook `play` functions with browser tests for automated UI validation
• Run `pnpm test --coverage` to see code coverage
• Group tests logically by component or feature for clarity and maintainability

============================================================================
-->
<h1 id="testing">🧪 Testing
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-v4.0.15-informational?style=flat&logo=vite&color=646CFF" alt="Vitest"></a>
  <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-1.57.0-1E8D22?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMzYuNDQ0IDIyMS41NTZDMTIzLjU1OCAyMjUuMjEzIDExNS4xMDQgMjMxLjYyNSAxMDkuNTM1IDIzOC4wMzJDMTE0Ljg2OSAyMzMuMzY0IDEyMi4wMTQgMjI5LjA4IDEzMS42NTIgMjI2LjM0OEMxNDEuNTEgMjIzLjU1NCAxNDkuOTIgMjIzLjU3NCAxNTYuODY5IDIyNC45MTVWMjE5LjQ4MUMxNTAuOTQxIDIxOC45MzkgMTQ0LjE0NSAyMTkuMzcxIDEzNi40NDQgMjIxLjU1NlpNMTA4Ljk0NiAxNzUuODc2TDYxLjA4OTUgMTg4LjQ4NEM2MS4wODk1IDE4OC40ODQgNjEuOTYxNyAxODkuNzE2IDYzLjU3NjcgMTkxLjM2TDEwNC4xNTMgMTgwLjY2OEMxMDQuMTUzIDE4MC42NjggMTAzLjU3OCAxODguMDc3IDk4LjU4NDcgMTk0LjcwNUMxMDguMDMgMTg3LjU1OSAxMDguOTQ2IDE3NS44NzYgMTA4Ljk0NiAxNzUuODc2Wk0xNDkuMDA1IDI4OC4zNDdDODEuNjU4MiAzMDYuNDg2IDQ2LjAyNzIgMjI4LjQzOCAzNS4yMzk2IDE4Ny45MjhDMzAuMjU1NiAxNjkuMjI5IDI4LjA3OTkgMTU1LjA2NyAyNy41IDE0NS45MjhDMjcuNDM3NyAxNDQuOTc5IDI3LjQ2NjUgMTQ0LjE3OSAyNy41MzM2IDE0My40NDZDMjQuMDQgMTQzLjY1NyAyMi4zNjc0IDE0NS40NzMgMjIuNzA3NyAxNTAuNzIxQzIzLjI4NzYgMTU5Ljg1NSAyNS40NjMzIDE3NC4wMTYgMzAuNDQ3MyAxOTIuNzIxQzQxLjIzMDEgMjMzLjIyNSA3Ni44NjU5IDMxMS4yNzMgMTQ0LjIxMyAyOTMuMTM0QzE1OC44NzIgMjg5LjE4NSAxNjkuODg1IDI4MS45OTIgMTc4LjE1MiAyNzIuODFDMTcwLjUzMiAyNzkuNjkyIDE2MC45OTUgMjg1LjExMiAxNDkuMDA1IDI4OC4zNDdaTTE2MS42NjEgMTI4LjExVjEzMi45MDNIMTg4LjA3N0MxODcuNTM1IDEzMS4yMDYgMTg2Ljk4OSAxMjkuNjc3IDE4Ni40NDcgMTI4LjExSDE2MS42NjFaIiBmaWxsPSIjMkQ0NTUyIi8+CjxwYXRoIGQ9Ik0xOTMuOTgxIDE2Ny41ODRDMjA1Ljg2MSAxNzAuOTU4IDIxMi4xNDQgMTc5LjI4NyAyMTUuNDY1IDE4Ni42NThMMjI4LjcxMSAxOTAuNDJDMjI4LjcxMSAxOTAuNDIgMjI2LjkwNCAxNjQuNjIzIDIwMy41NyAxNTcuOTk1QzE4MS43NDEgMTUxLjc5MyAxNjguMzA4IDE3MC4xMjQgMTY2LjY3NCAxNzIuNDk2QzE3My4wMjQgMTY3Ljk3MiAxODIuMjk3IDE2NC4yNjggMTkzLjk4MSAxNjcuNTg0Wk0yOTkuNDIyIDE4Ni43NzdDMjc3LjU3MyAxODAuNTQ3IDI2NC4xNDUgMTk4LjkxNiAyNjIuNTM1IDIwMS4yNTVDMjY4Ljg5IDE5Ni43MzYgMjc4LjE1OCAxOTMuMDMxIDI4OS44MzcgMTk2LjM2MkMzMDEuNjk4IDE5OS43NDEgMzA3Ljk3NiAyMDguMDYgMzExLjMwNyAyMTUuNDM2TDMyNC41NzIgMjE5LjIxMkMzMjQuNTcyIDIxOS4yMTIgMzIyLjczNiAxOTMuNDEgMjk5LjQyMiAxODYuNzc3Wk0yODYuMjYyIDI1NC43OTVMMTc2LjA3MiAyMjMuOTlDMTc2LjA3MiAyMjMuOTkgMTc3LjI2NSAyMzAuMDM4IDE4MS44NDIgMjM3Ljg2OUwyNzQuNjE3IDI2My44MDVDMjgyLjI1NSAyNTkuMzg2IDI4Ni4yNjIgMjU0Ljc5NSAyODYuMjYyIDI1NC43OTVaTTIwOS44NjcgMzIxLjEwMkMxMjIuNjE4IDI5Ny43MSAxMzMuMTY2IDE4Ni41NDMgMTQ3LjI4NCAxMzMuODY1QzE1My4wOTcgMTEyLjE1NiAxNTkuMDczIDk2LjAyMDMgMTY0LjAyOSA4NS4yMDRDMTYxLjA3MiA4NC41OTUzIDE1OC42MjMgODYuMTUyOSAxNTYuMjAzIDkxLjA3NDZDMTUwLjk0MSAxMDEuNzQ3IDE0NC4yMTIgMTE5LjEyNCAxMzcuNyAxNDMuNDVDMTIzLjU4NiAxOTYuMTI3IDExMy4wMzggMzA3LjI5IDIwMC4yODMgMzMwLjY4MkMyNDEuNDA2IDM0MS42OTkgMjczLjQ0MiAzMjQuOTU1IDI5Ny4zMjMgMjk4LjY1OUMyNzQuNjU1IDMxOS4xOSAyNDUuNzE0IDMzMC43MDEgMjA5Ljg2NyAzMjEuMTAyWiIgZmlsbD0iIzJENDU1MiIvPgo8cGF0aCBkPSJNMTYxLjY2MSAyNjIuMjk2VjIzOS44NjNMOTkuMzMyNCAyNTcuNTM3Qzk5LjMzMjQgMjU3LjUzNyAxMDMuOTM4IDIzMC43NzcgMTM2LjQ0NCAyMjEuNTU2QzE0Ni4zMDIgMjE4Ljc2MiAxNTQuNzEzIDIxOC43ODEgMTYxLjY2MSAyMjAuMTIzVjEyOC4xMUgxOTIuODY5QzE4OS40NzEgMTE3LjYxIDE4Ni4xODQgMTA5LjUyNiAxODMuNDIzIDEwMy45MDlDMTc4Ljg1NiA5NC42MTIgMTc0LjE3NCAxMDAuNzc1IDE2My41NDUgMTA5LjY2NUMxNTYuMDU5IDExNS45MTkgMTM3LjEzOSAxMjkuMjYxIDEwOC42NjggMTM2LjkzM0M4MC4xOTY2IDE0NC42MSA1Ny4xNzkgMTQyLjU3NCA0Ny41NzUyIDE0MC45MTFDMzMuOTYwMSAxMzguNTYyIDI2LjgzODcgMTM1LjU3MiAyNy41MDQ5IDE0NS45MjhDMjguMDg0NyAxNTUuMDYyIDMwLjI2MDUgMTY5LjIyNCAzNS4yNDQ1IDE4Ny45MjhDNDYuMDI3MiAyMjguNDMzIDgxLjY2MyAzMDYuNDgxIDE0OS4wMSAyODguMzQyQzE2Ni42MDIgMjgzLjYwMiAxNzkuMDE5IDI3NC4yMzMgMTg3LjYyNiAyNjIuMjkxSDE2MS42NjFWMjYyLjI5NlpNNjEuMDg0OCAxODguNDg0TDEwOC45NDYgMTc1Ljg3NkMxMDguOTQ2IDE3NS44NzYgMTA3LjU1MSAxOTQuMjg4IDg5LjYwODcgMTk5LjAxOEM3MS42NjE0IDIwMy43NDMgNjEuMDg0OCAxODguNDg0IDYxLjA4NDggMTg4LjQ4NFoiIGZpbGw9IiNFMjU3NEMiLz4KPHBhdGggZD0iTTM0MS43ODYgMTI5LjE3NEMzMjkuMzQ1IDEzMS4zNTUgMjk5LjQ5OCAxMzQuMDcyIDI2Mi42MTIgMTI0LjE4NUMyMjUuNzE2IDExNC4zMDQgMjAxLjIzNiA5Ny4wMjI0IDE5MS41MzcgODguODk5NEMxNzcuNzg4IDc3LjM4MzQgMTcxLjc0IDY5LjM4MDIgMTY1Ljc4OCA4MS40ODU3QzE2MC41MjYgOTIuMTYzIDE1My43OTcgMTA5LjU0IDE0Ny4yODQgMTMzLjg2NkMxMzMuMTcxIDE4Ni41NDMgMTIyLjYyMyAyOTcuNzA2IDIwOS44NjcgMzIxLjA5OEMyOTcuMDkzIDM0NC40NyAzNDMuNTMgMjQyLjkyIDM1Ny42NDQgMTkwLjIzOEMzNjQuMTU3IDE2NS45MTcgMzY3LjAxMyAxNDcuNSAzNjcuNzk5IDEzNS42MjVDMzY4LjY5NSAxMjIuMTczIDM1OS40NTUgMTI2LjA3OCAzNDEuNzg2IDEyOS4xNzRaTTE2Ni40OTcgMTcyLjc1NkMxNjYuNDk3IDE3Mi43NTYgMTgwLjI0NiAxNTEuMzcyIDIwMy41NjUgMTU4QzIyNi44OTkgMTY0LjYyOCAyMjguNzA2IDE5MC40MjUgMjI4LjcwNiAxOTAuNDI1TDE2Ni40OTcgMTcyLjc1NlpNMjIzLjQyIDI2OC43MTNDMTgyLjQwMyAyNTYuNjk4IDE3Ni4wNzcgMjIzLjk5IDE3Ni4wNzcgMjIzLjk5TDI4Ni4yNjIgMjU0Ljc5NkMyODYuMjYyIDI1NC43OTEgMjY0LjAyMSAyODAuNTc4IDIyMy40MiAyNjguNzEzWk0yNjIuMzc3IDIwMS40OTVDMjYyLjM3NyAyMDEuNDk1IDI3Ni4xMDcgMTgwLjEyNiAyOTkuNDIyIDE4Ni43NzNDMzIyLjczNiAxOTMuNDExIDMyNC41NzIgMjE5LjIwOCAzMjQuNTcyIDIxOS4yMDhMMjYyLjM3NyAyMDEuNDk1WiIgZmlsbD0iIzJFQUQzMyIvPgo8cGF0aCBkPSJNMTM5Ljg4IDI0Ni4wNEw5OS4zMzI0IDI1Ny41MzJDOTkuMzMyNCAyNTcuNTMyIDEwMy43MzcgMjMyLjQ0IDEzMy42MDcgMjIyLjQ5NkwxMTAuNjQ3IDEzNi4zM0wxMDguNjYzIDEzNi45MzNDODAuMTkxOCAxNDQuNjExIDU3LjE3NDIgMTQyLjU3NCA0Ny41NzA0IDE0MC45MTFDMzMuOTU1NCAxMzguNTYzIDI2LjgzNCAxMzUuNTcyIDI3LjUwMDEgMTQ1LjkyOUMyOC4wOCAxNTUuMDYzIDMwLjI1NTcgMTY5LjIyNCAzNS4yMzk3IDE4Ny45MjlDNDYuMDIyNSAyMjguNDMzIDgxLjY1ODMgMzA2LjQ4MSAxNDkuMDA1IDI4OC4zNDJMMTUwLjk4OSAyODcuNzE5TDEzOS44OCAyNDYuMDRaTTYxLjA4NDggMTg4LjQ4NUwxMDguOTQ2IDE3NS44NzZDMTA4Ljk0NiAxNzUuODc2IDEwNy41NTEgMTk0LjI4OCA4OS42MDg3IDE5OS4wMThDNzEuNjYxNSAyMDMuNzQzIDYxLjA4NDggMTg4LjQ4NSA2MS4wODQ4IDE4OC40ODVaIiBmaWxsPSIjRDY1MzQ4Ii8+CjxwYXRoIGQ9Ik0yMjUuMjcgMjY5LjE2M0wyMjMuNDE1IDI2OC43MTJDMTgyLjM5OCAyNTYuNjk4IDE3Ni4wNzIgMjIzLjk5IDE3Ni4wNzIgMjIzLjk5TDIzMi44OSAyMzkuODcyTDI2Mi45NzEgMTI0LjI4MUwyNjIuNjA3IDEyNC4xODVDMjI1LjcxMSAxMTQuMzA0IDIwMS4yMzIgOTcuMDIyNCAxOTEuNTMyIDg4Ljg5OTRDMTc3Ljc4MyA3Ny4zODM0IDE3MS43MzUgNjkuMzgwMiAxNjUuNzgzIDgxLjQ4NTdDMTYwLjUyNiA5Mi4xNjMgMTUzLjc5NyAxMDkuNTQgMTQ3LjI4NCAxMzMuODY2QzEzMy4xNzEgMTg2LjU0MyAxMjIuNjIzIDI5Ny43MDYgMjA5Ljg2NyAzMjEuMDk3TDIxMS42NTUgMzIxLjVMMjI1LjI3IDI2OS4xNjNaTTE2Ni40OTcgMTcyLjc1NkMxNjYuNDk3IDE3Mi43NTYgMTgwLjI0NiAxNTEuMzcyIDIwMy41NjUgMTU4QzIyNi44OTkgMTY0LjYyOCAyMjguNzA2IDE5MC40MjUgMjI4LjcwNiAxOTAuNDI1TDE2Ni40OTcgMTcyLjc1NloiIGZpbGw9IiMxRDhEMjIiLz4KPHBhdGggZD0iTTE0MS45NDYgMjQ1LjQ1MUwxMzEuMDcyIDI0OC41MzdDMTMzLjY0MSAyNjMuMDE5IDEzOC4xNjkgMjc2LjkxNyAxNDUuMjc2IDI4OS4xOTVDMTQ2LjUxMyAyODguOTIyIDE0Ny43NCAyODguNjg3IDE0OSAyODguMzQyQzE1Mi4zMDIgMjg3LjQ1MSAxNTUuMzY0IDI4Ni4zNDggMTU4LjMxMiAyODUuMTQ1QzE1MC4zNzEgMjczLjM2MSAxNDUuMTE4IDI1OS43ODkgMTQxLjk0NiAyNDUuNDUxWk0xMzcuNyAxNDMuNDUxQzEzMi4xMTIgMTY0LjMwNyAxMjcuMTEzIDE5NC4zMjYgMTI4LjQ4OSAyMjQuNDM2QzEzMC45NTIgMjIzLjM2NyAxMzMuNTU0IDIyMi4zNzEgMTM2LjQ0NCAyMjEuNTUxTDEzOC40NTcgMjIxLjEwMUMxMzYuMDAzIDE4OC45MzkgMTQxLjMwOCAxNTYuMTY1IDE0Ny4yODQgMTMzLjg2NkMxNDguNzk5IDEyOC4yMjUgMTUwLjMxOCAxMjIuOTc4IDE1MS44MzIgMTE4LjA4NUMxNDkuMzkzIDExOS42MzcgMTQ2Ljc2NyAxMjEuMjI4IDE0My43NzYgMTIyLjg2N0MxNDEuNzU5IDEyOS4wOTMgMTM5LjcyMiAxMzUuODk4IDEzNy43IDE0My40NTFaIiBmaWxsPSIjQzA0QjQxIi8+Cjwvc3ZnPgo=" alt="Playwright"></a>
  <a href="https://github.com/AtomixPlus/Leo/actions/workflows/coverage.yml?branch=main"><img src="https://github.com/AtomixPlus/Leo/actions/workflows/testing.yml/badge.svg" alt="Testing"></a>
  <a href="https://github.com/AtomixPlus/Leo/actions/workflows/testing.yml?branch=main"><img src="https://img.shields.io/badge/Code_Coverage-100%25-brightgreen" alt="Code Coverage"></a>
</h1>

Leo employs Vitest and React Testing Library, along with Storybook stories, to create a comprehensive testing environment. We write separate unit tests for individual component logic and behaviors, ensuring accuracy at the smallest level. 

Browser-based tests leverage Storybook stories to verify that components behave correctly in realistic scenarios. Additionally, Playwright tests are used for end-to-end and browser interaction testing, validating that components function properly across different browsers and workflows. 

This multi-layered approach ensures consistency between development, documentation, and automated testing, covering both unit-level and integration-level behaviors.

<br>

## 🧱 Testing Layers

Leo uses a layered testing approach to ensure components are correct, accessible, and reliable across environments. Testing is centered around Storybook stories as the source of truth, with unit and browser tests validating behavior at different levels.


Leo uses multiple testing layers, each serving a specific purpose:

<details>
  <summary><b>1️⃣ Unit Tests</b></summary>

  - Fast, isolated tests for functions and component logic
  - Run in a simulated DOM environment (Happy DOM)
  - Best for pure logic, utilities, and small component behaviors

  **Tools**:
  - Vitest
  - Happy DOM

  <br>
</details>


<details>
  <summary><b>2️⃣ Story Tests</b></summary>

  - Storybook stories double as tests
  - Each story documents and validates a specific state or behavior
  - `play` functions simulate user interactions and assertions

  **Why this matters**:
  - Stories are the single source of truth
  - Documentation and tests never drift apart
  - Less duplicated test code

  **Tools**:
  - Storybook
  - Vitest addon for Storybook

  <br>
</details>


<details>
  <summary><b>3️⃣ Browser Tests</b></summary>

  - Run stories in a real browser environment
  - Validate interactions, focus management, keyboard navigation, and layout behavior
  - Ideal for complex UI interactions and regression coverage

  **Tools**:
  - Playwright (Chromium, Firefox, WebKit)
  - Storybook + Playwright integration

  <br>
</details>

<br>

### 🧠 Key Principles

- 📖 Stories are tests — if it’s not in a story, it’s not fully tested
- 🎯 Test behavior, not implementation details
- 🧩 One state or behavior per test
- ⚡ Keep unit tests fast; reserve browsers for real interaction testing
- 🧪 Prefer deterministic tests (no arbitrary timeouts)


<br>

### 🚀 When to Add Tests

Add or update tests when you:

- Introduce a new component
- Add a new variant, size, or state
- Change component behavior or interactions
- Fix a bug (add a test to prevent regressions)


### 🎯 Testing Goals

Our testing strategy is designed to:

- ✅ Validate component logic and rendering
- ✅ Ensure UI behavior matches documented stories
- ✅ Catch regressions early during development
- ✅ Support fast local feedback and reliable CI runs
- ✅ Test components in isolation and in real browsers

<br>


**💡 Tip**: Always run the full test suite before submitting a PR to ensure both logic and browser behavior are validated.




<br><br><br>






















<!--
============================================================================
🎭 PLAYWRIGHT
============================================================================

This section defines how **Leo components and apps are tested in real browsers** 
using Playwright 🧪.

────────────────────────────────────────────────────────────────────────────
✅ OBJECTIVES
────────────────────────────────────────────────────────────────────────────

• Run automated browser tests against components or pages
• Validate UI behavior, interactions, and accessibility
• Ensure cross-browser compatibility (Chromium, Firefox, WebKit)
• Integrate with Storybook to test components using stories

────────────────────────────────────────────────────────────────────────────
🛠️ BEST PRACTICES
────────────────────────────────────────────────────────────────────────────

• Use Storybook stories as the source of truth for component behavior
• Define tests using `test()` or `expect()` from Playwright
• Keep tests deterministic and CI-friendly
• Test interactions like clicks, form input, hover, focus, and keyboard navigation
• Include visual checks using screenshots or snapshots where necessary
• Use `beforeEach`/`afterEach` for setup and teardown

────────────────────────────────────────────────────────────────────────────
⚡ IMPORTANT
────────────────────────────────────────────────────────────────────────────

• Prefer testing components via Storybook stories when possible
• Avoid hard-coding waits; use Playwright’s locator-based interactions
• Use `headless: true` in CI for faster, non-UI tests
• Keep tests focused: one behavior or state per test
• Store artifacts (screenshots, videos, traces) for debugging failures
• Fully parallelize tests when possible, but limit workers in CI for stability

────────────────────────────────────────────────────────────────────────────
💡 TIP
────────────────────────────────────────────────────────────────────────────

• Use Playwright projects to test multiple browsers or devices
• Leverage `playwright/test` fixtures for reusable setup (pages, contexts)
• Use `expect(locator).toBeVisible()` or `.toBeChecked()` for assertions
• Combine with Storybook `play` functions to cover interactions automatically

============================================================================
-->
<h1 id="playwright">📚 Playwright 
  <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-1.57.0-1E8D22?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMzYuNDQ0IDIyMS41NTZDMTIzLjU1OCAyMjUuMjEzIDExNS4xMDQgMjMxLjYyNSAxMDkuNTM1IDIzOC4wMzJDMTE0Ljg2OSAyMzMuMzY0IDEyMi4wMTQgMjI5LjA4IDEzMS42NTIgMjI2LjM0OEMxNDEuNTEgMjIzLjU1NCAxNDkuOTIgMjIzLjU3NCAxNTYuODY5IDIyNC45MTVWMjE5LjQ4MUMxNTAuOTQxIDIxOC45MzkgMTQ0LjE0NSAyMTkuMzcxIDEzNi40NDQgMjIxLjU1NlpNMTA4Ljk0NiAxNzUuODc2TDYxLjA4OTUgMTg4LjQ4NEM2MS4wODk1IDE4OC40ODQgNjEuOTYxNyAxODkuNzE2IDYzLjU3NjcgMTkxLjM2TDEwNC4xNTMgMTgwLjY2OEMxMDQuMTUzIDE4MC42NjggMTAzLjU3OCAxODguMDc3IDk4LjU4NDcgMTk0LjcwNUMxMDguMDMgMTg3LjU1OSAxMDguOTQ2IDE3NS44NzYgMTA4Ljk0NiAxNzUuODc2Wk0xNDkuMDA1IDI4OC4zNDdDODEuNjU4MiAzMDYuNDg2IDQ2LjAyNzIgMjI4LjQzOCAzNS4yMzk2IDE4Ny45MjhDMzAuMjU1NiAxNjkuMjI5IDI4LjA3OTkgMTU1LjA2NyAyNy41IDE0NS45MjhDMjcuNDM3NyAxNDQuOTc5IDI3LjQ2NjUgMTQ0LjE3OSAyNy41MzM2IDE0My40NDZDMjQuMDQgMTQzLjY1NyAyMi4zNjc0IDE0NS40NzMgMjIuNzA3NyAxNTAuNzIxQzIzLjI4NzYgMTU5Ljg1NSAyNS40NjMzIDE3NC4wMTYgMzAuNDQ3MyAxOTIuNzIxQzQxLjIzMDEgMjMzLjIyNSA3Ni44NjU5IDMxMS4yNzMgMTQ0LjIxMyAyOTMuMTM0QzE1OC44NzIgMjg5LjE4NSAxNjkuODg1IDI4MS45OTIgMTc4LjE1MiAyNzIuODFDMTcwLjUzMiAyNzkuNjkyIDE2MC45OTUgMjg1LjExMiAxNDkuMDA1IDI4OC4zNDdaTTE2MS42NjEgMTI4LjExVjEzMi45MDNIMTg4LjA3N0MxODcuNTM1IDEzMS4yMDYgMTg2Ljk4OSAxMjkuNjc3IDE4Ni40NDcgMTI4LjExSDE2MS42NjFaIiBmaWxsPSIjMkQ0NTUyIi8+CjxwYXRoIGQ9Ik0xOTMuOTgxIDE2Ny41ODRDMjA1Ljg2MSAxNzAuOTU4IDIxMi4xNDQgMTc5LjI4NyAyMTUuNDY1IDE4Ni42NThMMjI4LjcxMSAxOTAuNDJDMjI4LjcxMSAxOTAuNDIgMjI2LjkwNCAxNjQuNjIzIDIwMy41NyAxNTcuOTk1QzE4MS43NDEgMTUxLjc5MyAxNjguMzA4IDE3MC4xMjQgMTY2LjY3NCAxNzIuNDk2QzE3My4wMjQgMTY3Ljk3MiAxODIuMjk3IDE2NC4yNjggMTkzLjk4MSAxNjcuNTg0Wk0yOTkuNDIyIDE4Ni43NzdDMjc3LjU3MyAxODAuNTQ3IDI2NC4xNDUgMTk4LjkxNiAyNjIuNTM1IDIwMS4yNTVDMjY4Ljg5IDE5Ni43MzYgMjc4LjE1OCAxOTMuMDMxIDI4OS44MzcgMTk2LjM2MkMzMDEuNjk4IDE5OS43NDEgMzA3Ljk3NiAyMDguMDYgMzExLjMwNyAyMTUuNDM2TDMyNC41NzIgMjE5LjIxMkMzMjQuNTcyIDIxOS4yMTIgMzIyLjczNiAxOTMuNDEgMjk5LjQyMiAxODYuNzc3Wk0yODYuMjYyIDI1NC43OTVMMTc2LjA3MiAyMjMuOTlDMTc2LjA3MiAyMjMuOTkgMTc3LjI2NSAyMzAuMDM4IDE4MS44NDIgMjM3Ljg2OUwyNzQuNjE3IDI2My44MDVDMjgyLjI1NSAyNTkuMzg2IDI4Ni4yNjIgMjU0Ljc5NSAyODYuMjYyIDI1NC43OTVaTTIwOS44NjcgMzIxLjEwMkMxMjIuNjE4IDI5Ny43MSAxMzMuMTY2IDE4Ni41NDMgMTQ3LjI4NCAxMzMuODY1QzE1My4wOTcgMTEyLjE1NiAxNTkuMDczIDk2LjAyMDMgMTY0LjAyOSA4NS4yMDRDMTYxLjA3MiA4NC41OTUzIDE1OC42MjMgODYuMTUyOSAxNTYuMjAzIDkxLjA3NDZDMTUwLjk0MSAxMDEuNzQ3IDE0NC4yMTIgMTE5LjEyNCAxMzcuNyAxNDMuNDVDMTIzLjU4NiAxOTYuMTI3IDExMy4wMzggMzA3LjI5IDIwMC4yODMgMzMwLjY4MkMyNDEuNDA2IDM0MS42OTkgMjczLjQ0MiAzMjQuOTU1IDI5Ny4zMjMgMjk4LjY1OUMyNzQuNjU1IDMxOS4xOSAyNDUuNzE0IDMzMC43MDEgMjA5Ljg2NyAzMjEuMTAyWiIgZmlsbD0iIzJENDU1MiIvPgo8cGF0aCBkPSJNMTYxLjY2MSAyNjIuMjk2VjIzOS44NjNMOTkuMzMyNCAyNTcuNTM3Qzk5LjMzMjQgMjU3LjUzNyAxMDMuOTM4IDIzMC43NzcgMTM2LjQ0NCAyMjEuNTU2QzE0Ni4zMDIgMjE4Ljc2MiAxNTQuNzEzIDIxOC43ODEgMTYxLjY2MSAyMjAuMTIzVjEyOC4xMUgxOTIuODY5QzE4OS40NzEgMTE3LjYxIDE4Ni4xODQgMTA5LjUyNiAxODMuNDIzIDEwMy45MDlDMTc4Ljg1NiA5NC42MTIgMTc0LjE3NCAxMDAuNzc1IDE2My41NDUgMTA5LjY2NUMxNTYuMDU5IDExNS45MTkgMTM3LjEzOSAxMjkuMjYxIDEwOC42NjggMTM2LjkzM0M4MC4xOTY2IDE0NC42MSA1Ny4xNzkgMTQyLjU3NCA0Ny41NzUyIDE0MC45MTFDMzMuOTYwMSAxMzguNTYyIDI2LjgzODcgMTM1LjU3MiAyNy41MDQ5IDE0NS45MjhDMjguMDg0NyAxNTUuMDYyIDMwLjI2MDUgMTY5LjIyNCAzNS4yNDQ1IDE4Ny45MjhDNDYuMDI3MiAyMjguNDMzIDgxLjY2MyAzMDYuNDgxIDE0OS4wMSAyODguMzQyQzE2Ni42MDIgMjgzLjYwMiAxNzkuMDE5IDI3NC4yMzMgMTg3LjYyNiAyNjIuMjkxSDE2MS42NjFWMjYyLjI5NlpNNjEuMDg0OCAxODguNDg0TDEwOC45NDYgMTc1Ljg3NkMxMDguOTQ2IDE3NS44NzYgMTA3LjU1MSAxOTQuMjg4IDg5LjYwODcgMTk5LjAxOEM3MS42NjE0IDIwMy43NDMgNjEuMDg0OCAxODguNDg0IDYxLjA4NDggMTg4LjQ4NFoiIGZpbGw9IiNFMjU3NEMiLz4KPHBhdGggZD0iTTM0MS43ODYgMTI5LjE3NEMzMjkuMzQ1IDEzMS4zNTUgMjk5LjQ5OCAxMzQuMDcyIDI2Mi42MTIgMTI0LjE4NUMyMjUuNzE2IDExNC4zMDQgMjAxLjIzNiA5Ny4wMjI0IDE5MS41MzcgODguODk5NEMxNzcuNzg4IDc3LjM4MzQgMTcxLjc0IDY5LjM4MDIgMTY1Ljc4OCA4MS40ODU3QzE2MC41MjYgOTIuMTYzIDE1My43OTcgMTA5LjU0IDE0Ny4yODQgMTMzLjg2NkMxMzMuMTcxIDE4Ni41NDMgMTIyLjYyMyAyOTcuNzA2IDIwOS44NjcgMzIxLjA5OEMyOTcuMDkzIDM0NC40NyAzNDMuNTMgMjQyLjkyIDM1Ny42NDQgMTkwLjIzOEMzNjQuMTU3IDE2NS45MTcgMzY3LjAxMyAxNDcuNSAzNjcuNzk5IDEzNS42MjVDMzY4LjY5NSAxMjIuMTczIDM1OS40NTUgMTI2LjA3OCAzNDEuNzg2IDEyOS4xNzRaTTE2Ni40OTcgMTcyLjc1NkMxNjYuNDk3IDE3Mi43NTYgMTgwLjI0NiAxNTEuMzcyIDIwMy41NjUgMTU4QzIyNi44OTkgMTY0LjYyOCAyMjguNzA2IDE5MC40MjUgMjI4LjcwNiAxOTAuNDI1TDE2Ni40OTcgMTcyLjc1NlpNMjIzLjQyIDI2OC43MTNDMTgyLjQwMyAyNTYuNjk4IDE3Ni4wNzcgMjIzLjk5IDE3Ni4wNzcgMjIzLjk5TDI4Ni4yNjIgMjU0Ljc5NkMyODYuMjYyIDI1NC43OTEgMjY0LjAyMSAyODAuNTc4IDIyMy40MiAyNjguNzEzWk0yNjIuMzc3IDIwMS40OTVDMjYyLjM3NyAyMDEuNDk1IDI3Ni4xMDcgMTgwLjEyNiAyOTkuNDIyIDE4Ni43NzNDMzIyLjczNiAxOTMuNDExIDMyNC41NzIgMjE5LjIwOCAzMjQuNTcyIDIxOS4yMDhMMjYyLjM3NyAyMDEuNDk1WiIgZmlsbD0iIzJFQUQzMyIvPgo8cGF0aCBkPSJNMTM5Ljg4IDI0Ni4wNEw5OS4zMzI0IDI1Ny41MzJDOTkuMzMyNCAyNTcuNTMyIDEwMy43MzcgMjMyLjQ0IDEzMy42MDcgMjIyLjQ5NkwxMTAuNjQ3IDEzNi4zM0wxMDguNjYzIDEzNi45MzNDODAuMTkxOCAxNDQuNjExIDU3LjE3NDIgMTQyLjU3NCA0Ny41NzA0IDE0MC45MTFDMzMuOTU1NCAxMzguNTYzIDI2LjgzNCAxMzUuNTcyIDI3LjUwMDEgMTQ1LjkyOUMyOC4wOCAxNTUuMDYzIDMwLjI1NTcgMTY5LjIyNCAzNS4yMzk3IDE4Ny45MjlDNDYuMDIyNSAyMjguNDMzIDgxLjY1ODMgMzA2LjQ4MSAxNDkuMDA1IDI4OC4zNDJMMTUwLjk4OSAyODcuNzE5TDEzOS44OCAyNDYuMDRaTTYxLjA4NDggMTg4LjQ4NUwxMDguOTQ2IDE3NS44NzZDMTA4Ljk0NiAxNzUuODc2IDEwNy41NTEgMTk0LjI4OCA4OS42MDg3IDE5OS4wMThDNzEuNjYxNSAyMDMuNzQzIDYxLjA4NDggMTg4LjQ4NSA2MS4wODQ4IDE4OC40ODVaIiBmaWxsPSIjRDY1MzQ4Ii8+CjxwYXRoIGQ9Ik0yMjUuMjcgMjY5LjE2M0wyMjMuNDE1IDI2OC43MTJDMTgyLjM5OCAyNTYuNjk4IDE3Ni4wNzIgMjIzLjk5IDE3Ni4wNzIgMjIzLjk5TDIzMi44OSAyMzkuODcyTDI2Mi45NzEgMTI0LjI4MUwyNjIuNjA3IDEyNC4xODVDMjI1LjcxMSAxMTQuMzA0IDIwMS4yMzIgOTcuMDIyNCAxOTEuNTMyIDg4Ljg5OTRDMTc3Ljc4MyA3Ny4zODM0IDE3MS43MzUgNjkuMzgwMiAxNjUuNzgzIDgxLjQ4NTdDMTYwLjUyNiA5Mi4xNjMgMTUzLjc5NyAxMDkuNTQgMTQ3LjI4NCAxMzMuODY2QzEzMy4xNzEgMTg2LjU0MyAxMjIuNjIzIDI5Ny43MDYgMjA5Ljg2NyAzMjEuMDk3TDIxMS42NTUgMzIxLjVMMjI1LjI3IDI2OS4xNjNaTTE2Ni40OTcgMTcyLjc1NkMxNjYuNDk3IDE3Mi43NTYgMTgwLjI0NiAxNTEuMzcyIDIwMy41NjUgMTU4QzIyNi44OTkgMTY0LjYyOCAyMjguNzA2IDE5MC40MjUgMjI4LjcwNiAxOTAuNDI1TDE2Ni40OTcgMTcyLjc1NloiIGZpbGw9IiMxRDhEMjIiLz4KPHBhdGggZD0iTTE0MS45NDYgMjQ1LjQ1MUwxMzEuMDcyIDI0OC41MzdDMTMzLjY0MSAyNjMuMDE5IDEzOC4xNjkgMjc2LjkxNyAxNDUuMjc2IDI4OS4xOTVDMTQ2LjUxMyAyODguOTIyIDE0Ny43NCAyODguNjg3IDE0OSAyODguMzQyQzE1Mi4zMDIgMjg3LjQ1MSAxNTUuMzY0IDI4Ni4zNDggMTU4LjMxMiAyODUuMTQ1QzE1MC4zNzEgMjczLjM2MSAxNDUuMTE4IDI1OS43ODkgMTQxLjk0NiAyNDUuNDUxWk0xMzcuNyAxNDMuNDUxQzEzMi4xMTIgMTY0LjMwNyAxMjcuMTEzIDE5NC4zMjYgMTI4LjQ4OSAyMjQuNDM2QzEzMC45NTIgMjIzLjM2NyAxMzMuNTU0IDIyMi4zNzEgMTM2LjQ0NCAyMjEuNTUxTDEzOC40NTcgMjIxLjEwMUMxMzYuMDAzIDE4OC45MzkgMTQxLjMwOCAxNTYuMTY1IDE0Ny4yODQgMTMzLjg2NkMxNDguNzk5IDEyOC4yMjUgMTUwLjMxOCAxMjIuOTc4IDE1MS44MzIgMTE4LjA4NUMxNDkuMzkzIDExOS42MzcgMTQ2Ljc2NyAxMjEuMjI4IDE0My43NzYgMTIyLjg2N0MxNDEuNzU5IDEyOS4wOTMgMTM5LjcyMiAxMzUuODk4IDEzNy43IDE0My40NTFaIiBmaWxsPSIjQzA0QjQxIi8+Cjwvc3ZnPgo=" alt="Playwright"></a>
  <a href="https://github.com/AtomixPlus/Leo/actions/workflows/coverage.yml?branch=main"><img src="https://github.com/AtomixPlus/Leo/actions/workflows/testing.yml/badge.svg" alt="Testing"></a>
  <a href="https://github.com/AtomixPlus/Leo/actions/workflows/testing.yml?branch=main"><img src="https://img.shields.io/badge/Code_Coverage-100%25-brightgreen" alt="Code Coverage"></a>
</h1>


**Leo** uses *Playwright** to test UI components in real browsers.

**Playwright lets you:**

- 🖥️ Run browser tests across Chromium, Firefox, and WebKit.
- 🎬 Capture screenshots, videos, and traces for failures.
- 🔄 Automate user interactions such as clicks, typing, hover, and focus.
- 🧪 Leverage Storybook stories as the source of automated browser tests.

---

<br>


### ⚡ Running Playwright

To run Storybook in development mode and preview changes live:

```bash
pnpm storybook
```
- This starts a local server (usually at [http://localhost:6006](http://localhost:6006)).
- Hot reload is enabled, so updates to components or stories are reflected immediately.
- Use Storybook’s built-in controls to test different props, states, and themes.

---

<br>

### 📦 Building Playwright

To generate a static **Storybook** site that can be deployed (e.g., GitHub Pages):

```bash
pnpm storybook:build
```
- This creates a storybook-static folder in your project root.
- The output can be deployed to a static host for team previews or documentation purposes.

---

<br>


### ✏️ Writing Browser Tests

Each component should have its own story file (<b>Component.stories.tsx</b>) following these conventions:

- ✅ Prefer using Storybook stories as the source for Playwright tests.
- ✅ Write play functions in stories to simulate interactions.
- ✅ Use locator to target components in the story canvas.
- ✅ Capture screenshots and videos for CI or debugging.

<details>
  <summary><b>1️⃣ File Structure</b></summary>
  
  The components/ folder contains all reusable UI components for the library. Using Button as an example, each component has its own folder with the following structure:

  ```
    📁 src/
      📁 assets/
      📁 components/
        📁 Button/
          📄 Button.tsx
          📄 Button.spec.tsx
          📄 Button.stories.tsx
          📄 index.ts
      📁 tools/
      📄 index.ts
  ```

  #### ✅ Why this structure?
  - Keeps everything about a component cohesive
  - No long file names like **Button.styles.tsx**, **Button.spec.tsx** in the same folder
  - **Storybook**, **tests**, and **components** live side-by-side
  
  <br>
</details>




<br>

### 💡 Best Practices
- ✅ Reuse story play functions to avoid duplicating test logic.
- ✅ Test multiple browsers and devices to catch layout or behavior differences.
- ✅ Keep tests deterministic; avoid relying on local storage, network, or timing.
- ✅ Capture artifacts (video, screenshot, trace) on failure for easier debugging.
- ✅ Use descriptive test names matching component stories and variants.


<br><br>



### ⚡ Running Tests with Playwright

Run tests with the user interface:
```bash
pnpm playwright test
```

Run tests with the user interface:
```bash
pnpm playwright test --headed
```


### ✏️ Writing Browser Tests

This section provides everything contributors need to write **browser tests** using Playwright. Playwright allows you to test components and applications in a real browser environment.


Each component should have its own test file (<b>Component.spec.tsx</b>) following these conventions:

<details>
  <summary><b>1️⃣ File Structure</b></summary>
  
  - Place Playwright tests alongside the component or under for clarity.
  - Use `.spec.ts` suffix for Playwright tests.

  ```
    📁 src/
      📁 assets/
      📁 components/
        📁 Button/
          📄 Button.tsx
          📄 Button.spec.ts
          📄 Button.stories.tsx
          📄 index.ts
      📁 tools/
      📄 index.ts
  ```
  - Unit tests live alongside the implementation.
  - Larger integration tests or story-based tests can live under tests/.

  #### ✅ Why this structure?
  - Keeps end-to-end tests separate from unit tests
  - Mirrors component structure for easier navigation
  - Helps in scaling browser tests efficiently

  <br>
</details>



<details>
<summary><b>2️⃣ Basic Playwright Test</b></summary>

**Example:** Testing a button click

  ```ts
  import { test, expect } from 'playwright/test';

  test("Primary button", async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=components-button--primary`);
      const button = page.getByRole("button", { name: /button/i });
      await expect(button).toBeVisible();
      await button.click();
  });
  ```

  <br>
</details>





### 🦁 Playwright in Leo

Playwright represents Leo’s reality check.
It validates that components and interactions work exactly as users experience them — in real browsers, under real conditions.

Playwright is not about volume — it is about confidence at critical paths.

**By leveraging Playwright effectively**:

- 🧪 Real user interactions are validated end-to-end.
- 🌍 Cross-browser behavior is verified across Chromium, Firefox, and WebKit.
- 🖱️ Complex interactions (focus, keyboard, pointer, gestures) are tested reliably.
- 📸 Visual and interaction regressions are caught before release.

In Leo, Playwright tests exist to answer one question: 

**“Does this work for users?”**

Whenever possible, Playwright tests are driven by Storybook stories, ensuring alignment between documentation, development, and testing.

**When contributing**:

- Prefer testing through Storybook over custom pages.
- Avoid brittle selectors — rely on roles and accessible names.
- Never use arbitrary timeouts; trust Playwright’s locators.
- Keep browser tests focused on behavior, not internal structure.

Playwright is the final safety net — the place where Leo proves its components hold up in the real world.


<br><br><br>






















<!--
============================================================================
🎭 PLAYWRIGHT
============================================================================

This section defines how **Leo components and apps are tested in real browsers** 
using Playwright 🧪.

────────────────────────────────────────────────────────────────────────────
✅ OBJECTIVES
────────────────────────────────────────────────────────────────────────────

• Run automated browser tests against components or pages
• Validate UI behavior, interactions, and accessibility
• Ensure cross-browser compatibility (Chromium, Firefox, WebKit)
• Integrate with Storybook to test components using stories

────────────────────────────────────────────────────────────────────────────
🛠️ BEST PRACTICES
────────────────────────────────────────────────────────────────────────────

• Use Storybook stories as the source of truth for component behavior
• Define tests using `test()` or `expect()` from Playwright
• Keep tests deterministic and CI-friendly
• Test interactions like clicks, form input, hover, focus, and keyboard navigation
• Include visual checks using screenshots or snapshots where necessary
• Use `beforeEach`/`afterEach` for setup and teardown

────────────────────────────────────────────────────────────────────────────
⚡ IMPORTANT
────────────────────────────────────────────────────────────────────────────

• Prefer testing components via Storybook stories when possible
• Avoid hard-coding waits; use Playwright’s locator-based interactions
• Use `headless: true` in CI for faster, non-UI tests
• Keep tests focused: one behavior or state per test
• Store artifacts (screenshots, videos, traces) for debugging failures
• Fully parallelize tests when possible, but limit workers in CI for stability

────────────────────────────────────────────────────────────────────────────
💡 TIP
────────────────────────────────────────────────────────────────────────────

• Use Playwright projects to test multiple browsers or devices
• Leverage `playwright/test` fixtures for reusable setup (pages, contexts)
• Use `expect(locator).toBeVisible()` or `.toBeChecked()` for assertions
• Combine with Storybook `play` functions to cover interactions automatically

============================================================================
-->
<h1 id="vitest">🧪 Vitest  
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-v4.0.15-informational?style=flat&logo=vite&color=646CFF" alt="Vitest"></a>
  <a href="https://github.com/AtomixPlus/Leo/actions/workflows/coverage.yml?branch=main"><img src="https://github.com/AtomixPlus/Leo/actions/workflows/testing.yml/badge.svg" alt="Testing"></a>
  <a href="https://github.com/AtomixPlus/Leo/actions/workflows/testing.yml?branch=main"><img src="https://img.shields.io/badge/Code_Coverage-100%25-brightgreen" alt="Code Coverage"></a>
</h1>


Leo uses Vitest as the primary test runner for fast, modern, and Vite-native testing. Vitest powers unit tests, story-based tests, and integrates seamlessly with Storybook and Playwright to provide a unified testing strategy.

Vitest is intentionally chosen for its:

- ⚡ Extremely fast startup and execution
- 🧩 Native Vite & ESM support
- 🧠 First-class TypeScript support
- 🎭 Tight integration with Storybook stories
- 🌍 Ability to run both DOM and browser tests

--- 

<br>



### 🎯 Purpose of Vitest in Leo

Vitest is responsible for validating component logic, rendering, and behavior at development time and in CI.

Vitest is used to:

- ✅ Run unit tests for utilities, hooks, and component logic
- ✅ Execute Storybook stories as tests
- ✅ Power browser tests via the Vitest + Playwright integration
- ✅ Generate accurate coverage reports
- ✅ Ensure components remain renderable and interactive

--- 

<br>

Vitest acts as the orchestration layer for all testing types.


| Test Type       | Tooling             | Purpose                    |
| --------------- | ------------------- | -------------------------- |
| Unit Tests      | Vitest              | Logic, helpers, hooks      |
| Component Tests | Vitest + Happy DOM  | Rendering & props          |
| Story Tests     | Storybook + Vitest  | Visual + interaction tests |
| Browser Tests   | Vitest + Playwright | Real browser behavior      |

<br>





### 🧠 Testing Philosophy

Leo follows a story-first testing approach:

- 📖 Stories define behavior
- 🧪 Vitest executes stories
- 🎭 Playwright validates real browsers

**This ensures**:
- Documentation ≙ Tests ≙ Reality
- No duplicated test logic
- UI behavior is validated where it’s actually used




### 🎭 Stories as Tests (Recommended)

Storybook stories are treated as first-class tests.

- Stories are executed automatically by Vitest
- play functions double as interaction tests
- No extra test files required


```ts
export const Disabled: Story = {
  args: { isDisabled: true },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toBeDisabled();
  },
};
```



### ⚡ Vitest + Playwright

Vitest integrates with Playwright to run real browser tests using the same stories:

- Chromium, Firefox, WebKit support
- Headless by default in CI
- Same assertion API (expect)

This eliminates test duplication and ensures browser accuracy.



✅ Best Practices

- ✅ Prefer Storybook stories over standalone tests
- ✅ Test behavior, not implementation
- ✅ Keep tests deterministic and fast
- ✅ Avoid hard-coded timeouts
- ✅ One behavior per test
- ✅ Run tests before committing






🚨 Important Notes

- Vitest is the single source of truth for testing
- Storybook stories must remain testable
- Breaking a story breaks tests
- Coverage should never regress without justification

Vitest ensures Leo remains fast, reliable, documented, and test-safe—from local development to CI and production.




### ⚡ Running Tests
Leo uses Vitest as the primary test runner, with support for unit, story-based, and browser tests.

To run tests in development mode and preview errors live:



<details>
<summary><b>▶️ Run all tests (watch mode)</b></summary>

  Runs tests in development mode with live reloading and instant feedback:

  ```bash
  pnpm vitest
  ```

  <br>
</details>


<details>
<summary><b>📊 Run tests with code coverage</b></summary>

  Generates coverage reports for unit and story-based tests:

  ```bash
  pnpm vitest --coverage
  ```

  Coverage output is written to the coverage/ directory.

  <br>
</details>


<details>
<summary><b>🧭 Run tests with the Vitest UI</b></summary>

  Launches the interactive Vitest UI for inspecting test results, errors, and coverage:

  ```bash
  pnpm vitest --ui
  ```

  <br>
</details>


<details>
<summary><b>🧪 Run specific test projects</b></summary>

  Launches the interactive Vitest UI for inspecting test results, errors, and coverage:

  ```bash
  pnpm vitest --project unit
  pnpm vitest --project browser
  ```

  - **Unit** → Runs unit and story-based tests (`Component.test.tsx`) in a DOM environment
  - **Browser** → Runs real browser tests using `Playwright` and `Storybook`

  <br>
</details>



<br>



### ✏️ Writing Unit Tests

This section gives contributors everything they need to write proper tests: unit tests, component tests, story-based tests, mocks, browser tests, and best practices.

Each component should have its own test file (<b>Component.test.tsx</b>) following these conventions:

<details>
  <summary><b>1️⃣ File Structure</b></summary>
  
  - Test files should mirror the structure of your source code for clarity.
  - Use the `.test.ts` or `.test.tsx ` suffix when creating unit tests.

  ```
    📁 src/
      📁 assets/
      📁 components/
        📁 Button/
          📄 Button.tsx
          📄 Button.test.tsx
          📄 Button.stories.tsx
          📄 index.ts
      📁 tools/
      📄 index.ts
  ```
  - Unit tests live alongside the implementation.
  - Larger integration tests or story-based tests can live under tests/.

  #### ✅ Why this structure?
  - Keeps everything about a component cohesive
  - No long file names like **Button.test.tsx**, **Button.spec.tsx** in the same folder
  - **Storybook**, **tests**, and **components** live side-by-side
  
  <br>
</details>


<details>
  <summary><b>2️⃣ Writing Unit Tests</b></summary>
  
  Unit tests are small, isolated tests that verify a single function or component works as expected.
  
  **Example**: Simple utility function

  ```ts
  import { describe, it, expect } from 'vitest';
  import { sum } from '@/utils/sum';

  describe('sum utility', () => {
    it('adds two numbers correctly', () => {
      expect(sum(2, 3)).toBe(5);
    });

    it('returns the number itself if only one argument is provided', () => {
      expect(sum(4)).toBe(4);
    });
  });

  ```

  #### Guidelines:

  - Use describe blocks to group related tests.
  - Each test should have a clear, descriptive name.
  - Test both expected and edge cases.
  - Keep tests small and focused.
  
  <br>
</details>



<details>
  <summary><b>3️⃣ Testing React Components</b></summary>
  
  Use Happy DOM for DOM testing. For React, you can use @testing-library/react.

  **Example**: React component test

  ```ts
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import Button from '@/components/Button/Button';

  describe('Button component', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies primary class when primary prop is true', () => {
      render(<Button primary>Click me</Button>);
      expect(screen.getByText('Click me')).toHaveClass('primary');
    });
  });
  ```
  
  <br>
</details>



<details>
  <summary><b>4️⃣ Storybook Stories as Tests</b></summary>
  
  All Storybook stories can automatically run as tests using storybookTest.

  **Writing story-based tests**:

  ```ts
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import Button from '@/components/Button/Button';

  describe('Button component', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies primary class when primary prop is true', () => {
      render(<Button primary>Click me</Button>);
      expect(screen.getByText('Click me')).toHaveClass('primary');
    });
  });
  ```

  - Storybook stories are automatically converted to tests.
  - The tests run in Happy DOM or Playwright depending on your config.
  - This ensures your UI components are always renderable and functional.
  <br>
</details>



<details>
  <summary><b>5️⃣ Mocking and Dependencies</b></summary>
  
  - Mock APIs and network requests to isolate the unit under test.
  - Vitest supports vi.fn() for mocks and spies:

  ```ts
  import { vi } from 'vitest';

  const mockFetch = vi.fn(() => Promise.resolve({ data: 'test' }));

  ```

  - Use dependency injection where possible for easier testing.

  <br>
</details>




<details>
  <summary><b>6️⃣ Writing Browser Tests</b></summary>
  
  For components that require a real browser environment, use Playwright:

  ```ts
  test('Button click triggers handler', async ({ page }) => {
    await page.setContent('<button id="btn">Click</button>');
    const button = await page.$('#btn');
    await button?.click();
    // assert click effects here
  });
  ```

  - Playwright tests run headless by default.
  - Useful for testing interactive UI and Storybook stories.

  <br>
</details>




<details>
  <summary><b>7️⃣ Coverage Tips</b></summary>
  
  - Use `--coverage` to see which parts of the code are untested:

  ```bash
  pnpm test --coverage
  ```

  - Aim for high coverage on core logic and critical components, not necessarily every minor helper.

  <br>
</details>

<br>

### 💡 Best Practices
- ✅ Name tests clearly: "should do X when Y"
- ✅ Keep tests isolated and deterministic.
- ✅ Avoid testing implementation details; test behavior.
- ✅ Run tests before committing: npm run test.
- ✅ Add tests for new features, bug fixes, and components.
- ✅ Prefer Storybook stories as tests for UI components for faster maintenance.





### ✅ Vitest in Leo

Vitest is the foundation of Leo’s confidence layer.
It ensures that core logic, component contracts, and edge cases behave exactly as expected — quickly, deterministically, and close to the source.

Vitest is used to validate what a component or utility does, not how it looks.

**By maintaining a strong Vitest suite**:

- 🎯 Core logic is verified early, before UI or browser concerns.
- 🧩 Component APIs remain stable and predictable over time.
- ⚡ Fast feedback enables rapid iteration without fear of regressions.
- 🔒 Bugs are caught at the smallest possible surface area.

In Leo, unit tests exist to protect intent.
They encode assumptions, document behavior, and act as guardrails during refactors.

**When contributing**:

- Write unit tests for logic, not visuals.
- Test behavior, not implementation details.
- Keep tests small, focused, and deterministic.
- Prefer clarity over cleverness.

Vitest ensures Leo’s foundation remains solid — so higher-level tests can focus on user experience, not correctness.








<br><br><br>






















<!--
 # ============================================================================
 # 🛠️📝 LINTING & FORMATTING
 # ============================================================================
 #
 # This section defines the **code style, formatting rules, and linting practices**
 # contributors must follow to maintain consistency and quality across Leo 🦁.
 #
 # ────────────────────────────────────────────────────────────────────────────
 # ✅ OBJECTIVES
 # ────────────────────────────────────────────────────────────────────────────
 #
 # • Enforce consistent coding patterns
 # • Prevent runtime issues caused by unsafe types or bad practices
 # • Maintain readability, clarity, and maintainability
 #
 # ────────────────────────────────────────────────────────────────────────────
 # 🛡️ RULES ENFORCED
 # ────────────────────────────────────────────────────────────────────────────
 #
 # • ESLint: React conventions, unused variables, imports, hooks rules
 # • TypeScript ESLint: Strong typing, avoid `any`, prevent unsafe patterns
 # • Prettier: Auto-formatting of code (indentation, line breaks, quotes)
 # • No console logs or debugging artifacts in production 💥
 #
 # ────────────────────────────────────────────────────────────────────────────
 # 🏷️ NAMING & STYLE GUIDELINES
 # ────────────────────────────────────────────────────────────────────────────
 #
 # • Use descriptive, consistent names for variables and functions
 # • Follow camelCase for JS/TS identifiers
 # • Prefer explicit types over implicit or `any`
 # • Keep functions and components small and focused
 #
 # ────────────────────────────────────────────────────────────────────────────
 # ⚠️ IMPORTANT
 # ────────────────────────────────────────────────────────────────────────────
 #
 # • Linting is enforced in CI — PRs cannot be merged if lint fails ⚠️
 # • Always run `pnpm lint` and `pnpm lint --fix` locally before committing
 # • Rules may be updated; follow updates in `.eslintrc` and `prettier.config.js`
 #
 # ============================================================================
-->

# 🧹 Linting & Formatting [![Prettier](https://img.shields.io/badge/Prettier-v3.7.4-F7B93E?style=flat&logo=prettier&logoColor=white)](https://prettier.io/) [![ESLint](https://img.shields.io/badge/ESLint-v9.39.2-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/) [![Linting](https://github.com/AtomixPlus/Leo/actions/workflows/linting.yml/badge.svg)](https://github.com/AtomixPlus/Leo/actions/workflows/linting.yml?branch=main)


Leo enforces a consistent code style and set of best practices across the codebase using `ESLint`, `TypeScript`, and `Prettier`. These tools help ensure readability, maintainability, accessibility, and long-term stability of the system.

All contributions must pass linting before being merged.


### ✅ Linting Rules

- ESLint: Enforces code quality, best practices, and React conventions
- TypeScript ESLint: Prevents unsafe types, unused variables, and invalid patterns
- React Hooks: Hooks rules are strictly enforced
- Imports: Keep imports clean, ordered, and unused imports removed
- No Console: Avoid console.log in production code

<br>



## 🧪 Running Lint

Run linting before opening a pull request
```bash
pnpm lint
```

To automatically fix common issues:
```bash
pnpm lint --fix
```
<br>

## 🎯 Formatting Guidelines
- Prettier handles formatting automatically
- Do not manually format files
- Let your editor or CI apply formatting rules
- Formatting issues will fail CI checks
<br>

## 🚫 CI Enforcement
- Linting runs on every pull request
- Pull requests cannot be merged if linting fails
- Keep commits clean and focused to avoid lint noise
<br>

## 💡 Best Practices
- Fix lint warnings, not just errors
- Prefer explicit types over any
- Follow existing patterns—consistency matters
- If you need to disable a rule, document why

<br><br>










<h1 id="creating-issues">🐞 Creating Issues
  <a href="https://github.com/AtomixPlus/Leo/issues"><img src="https://img.shields.io/github/issues/AtomixPlus/Leo.svg?style=flat&color=red" alt="Open Issues"></a>
  <a href="https://github.com/AtomixPlus/Leo/issues?q=is%3Aissue+is%3Aclosed"><img src="https://img.shields.io/github/issues-closed/AtomixPlus/Leo.svg?style=flat&color=green" alt="Closed Issues"></a>
</h1>

We love contributions! If you encounter a bug, have a feature request, or want to propose an improvement, please create an issue in this repository.

### Steps to Create an Issue

<details>
  <summary><b>1️⃣ Check existing issues</b></summary>
    Before opening a new issue, search the open issues to see if it has already been reported.
  <br>
</details>

<details>
  <summary><b>2️⃣ Open a new issue</b></summary>
    Click the “New issue” button in the Issues tab.
  <br>
</details>

<details>
  <summary><b>3️⃣ Choose a template (if available)</b></summary>
  
  - Bug Report: Describe the problem, steps to reproduce, and expected vs. actual behavior.
  - Feature Request: Explain the feature, why it’s useful, and any ideas for implementation.
  <br>
</details>

<details>
  <summary><b>4️⃣ Provide details</b></summary>
  
  Include:
  - Environment (OS, browser, versions, etc.) if relevant
  - Code snippets or screenshots
  - Steps to reproduce (for bugs)

  <br>
</details>


<details>
  <summary><b>5️⃣ Submit the issue</b></summary>
  
  After filling in the details, click Submit new issue.

  <br>
</details>

<br>


### 💡 Best Practices

- Be clear and concise.
- Be respectful and constructive.
- Include links to relevant discussions or resources if applicable.

💡 Tip: Well-documented issues help us resolve them faster!

<br><br>




<!--
# ============================================================================
# 🌿 BRANCHING
# ============================================================================
#
# This section defines the **branching workflow and naming conventions** used in 
# Leo 🦁 to ensure smooth collaboration, clear history, and easy code reviews.
#
# ────────────────────────────────────────────────────────────────────────────
# ✅ OBJECTIVES
# ────────────────────────────────────────────────────────────────────────────
#
# • Maintain a clean and organized Git history
# • Ensure features, fixes, and chores are developed in isolated branches
# • Facilitate code review and testing before merging to main
# • Reduce merge conflicts and improve collaboration
#
# ────────────────────────────────────────────────────────────────────────────
# 🛠️ BEST PRACTICES
# ────────────────────────────────────────────────────────────────────────────
#
# • **Main branch:** Stable production code; only fully reviewed and tested code is merged
# • **Dev branch:** Primary development branch; all features are merged here first
# • **Feature branches:** Use descriptive names prefixed with work type
#
#   Examples:
#     git checkout -b feature/add-button-component
#     git checkout -b fix/fix-button-disabled-state
#     git checkout -b chore/update-dependencies
#
# • Always branch off from `dev` unless hotfixing production
# • Keep branches small and focused on a single task, feature, or fix
#
# ────────────────────────────────────────────────────────────────────────────
# ⚡ IMPORTANT
# ────────────────────────────────────────────────────────────────────────────
#
# • Merge only after review and successful test runs
# • Use conventional commit messages for clarity (`feat`, `fix`, `chore`, `docs`, `test`, `refactor`)
# • Regularly pull from `dev` to stay up to date and avoid conflicts
#
# ============================================================================
-->
<h1 id="creating-branches">🌿 Creating Branches
  <a href="https://github.com/AtomixPlus/Leo/actions/workflows/deploying.yml?branch=main"><img src="https://github.com/AtomixPlus/Leo/actions/workflows/deploying.yml/badge.svg" alt="Deploying"></a>
</h1>

We follow a feature-driven branching workflow:

- **main:** The stable production branch. Only fully tested and reviewed code is merged here.
- **dev:** The main development branch. All feature branches should merge here first for testing and review.
- **Feature branches:** Use descriptive names prefixed with the type of work:

```bash
git checkout -b feature/add-button-component
git checkout -b fix/fix-button-disabled-state
git checkout -b chore/update-dependencies
```
- Always branch from dev.
- Keep branches small and focused on a single feature, fix, or chore.


<br><br>



# 📝 Pull Requests [![Pull Requests](https://img.shields.io/github/issues-pr/AtomixPlus/Leo?branch=main)](https://github.com/AtomixPlus/Leo/pulls) ![Closed PRs](https://img.shields.io/github/issues-pr-closed/AtomixPlus/Leo?branch=main)


### Creating a PR

<details>
  <summary><b>1️⃣ Fork the repository and clone your fork locally.</b></summary>

  ```bash
  git checkout -b feature/my-new-component
  ```
  <br>
</details>



<details>
  <summary><b>2️⃣ Create a branch for your work:</b></summary>

  ```bash
  git checkout -b feature/my-new-component
  ```
  <br>
</details>


<details>
  <summary><b>3️⃣ Make your changes:</b></summary>

  - Add or update components.
  - Write or update stories in Storybook.
  - Add or update tests in Vitest.

  <br>
</details>

<details>
  <summary><b>4️⃣ Test your changes locally:</b></summary>

  ```bash
  pnpm install
  pnpm test
  pnpm storybook
  ```

  <br>
</details>


<details>
  <summary><b>5️⃣ Commit changes with descriptive messages:</b></summary>
  
  ```bash
  feat(Button): add new variant "ghost"
  fix(InputField): correct validation on empty input
  ```
  Follow conventional commit style where possible: feat, fix, chore, docs, test, refactor.

  <br>
</details>


<details>
  <summary><b>6️⃣ Push your branch:</b></summary>
  
  ```bash
  git push origin feature/my-new-component
  ```

  <br>
</details>


<details>
  <summary><b>7️⃣ Open a PR against the dev branch on the main repository.</b></summary>
  
  ```bash
  git push origin feature/my-new-component
  ```

  <br>
</details>


<br><br>




# 📝 Commit Messages

Consistent commit messages help maintain a clean project history and make it easier for everyone to understand changes.

<details>
  <summary><b>Please follow these guidelines:</b></summary>
  
  Use the following conventional format for commit messages:

  ```bash
  <type>(<scope>): <subject>
  ```
  - **type**: The category of the change. Examples:
    - **feat** — a new feature
    - **fix** — a bug fix
    - **docs** — documentation only changes
    - **style** — formatting, missing semi-colons, etc; no code change
    - **refactor** — code change that neither fixes a bug nor adds a feature
    - **test** — adding or correcting tests
    - **chore** — maintenance tasks, build scripts, etc

  - **scope** (optional): The section of the code affected (e.g., Button, Login).
  - **subject**: A short, imperative description of the change (max ~50 characters).

  **Examples**

  ```bash
  feat(Button): add loading state
  fix(Login): correct password validation
  docs(Readme): update installation instructions
  style(Header): adjust spacing and indentation
  refactor(Auth): simplify login logic
  test(User): add unit tests for registration
  chore(Build): update dependencies
  ```

  <br>
</details>

<br>



### Chores and Minor Fixes

- For small changes (e.g., fixing typos, updating README, or bumping versions):
- Use the chore/ prefix in branch names.

<details>
  <summary><b>Commit with messages like:</b></summary>
  
  ```bash
  chore(readme): fix typo in installation instructions
  chore(deps): update tailwindcss to v4.1.17
  ```

  <br>
</details>

<br>

### 💡 Best Practices
- ✅ Use imperative mood: “Add feature” instead of “Added feature.”
- ✅ Keep the subject concise and descriptive.
- ✅ Include additional details in the body if necessary (separate with a blank line).
- ✅ Reference issues if relevant: fixes #123.

<br><br>





# 📌 Workflow Summary

- ✅ Fork the repository
- ✅ Create a branch from dev
- ✅ Implement changes
- ✅ Write/Update stories and tests
- ✅ Run tests and storybook
- ✅ Commit with clear message
- ✅ Push branch and open PR against dev
- ✅ Address review comments
- ✅ PR merged after approval


<br><br>




<!--
# ============================================================================
# 🎨 STYLING GUIDE
# ============================================================================
#
# This section defines how **styles are applied and maintained** across Leo 🦁,
# with a focus on consistency, reusability, and accessibility.
#
# ────────────────────────────────────────────────────────────────────────────
# ✅ OBJECTIVES
# ────────────────────────────────────────────────────────────────────────────
#
# • Ensure a consistent look and feel across all components
# • Promote reusable design patterns and utility classes
# • Maintain responsive and accessible UIs
# • Leverage Tailwind CSS effectively without inline styles
#
# ────────────────────────────────────────────────────────────────────────────
# 🛠️ BEST PRACTICES
# ────────────────────────────────────────────────────────────────────────────
#
# • Use Tailwind CSS utility classes consistently
# • Extract common styles into shared patterns or components
# • Use responsive variants (`sm:`, `md:`, `lg:`) for layouts
# • Apply dark mode variants (`dark:`) where applicable
# • Use theme tokens for colors, spacing, and fonts
# • Keep components small, composable, and easy to extend
# • Verify styles visually in Storybook before merging changes
#
# ────────────────────────────────────────────────────────────────────────────
# ⚡ IMPORTANT
# ────────────────────────────────────────────────────────────────────────────
#
# • Avoid hardcoding styles that break consistency
# • Inline styles should only be used when absolutely necessary
# • Always check accessibility (contrast, focus states, semantic HTML)
# • Update stories or documentation when style patterns change
#
# ============================================================================
-->


<h1 id="styling-guide">🎨 Styling Guide
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-v4.1.17-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
</h1>

- **Tailwind CSS**: Use utility classes consistently; avoid inline styles unless absolutely necessary.
- **Reusable Patterns**: Extract shared styles and components instead of duplicating classes.
- **Responsive**: Use Tailwind’s responsive prefixes to ensure proper layouts on all screen sizes.
- **Dark Mode**: Use dark: variants where applicable; maintain accessibility.
- **Accessibility**: Ensure sufficient contrast, visible focus states, and semantic structure.
- **Component Composition**: Keep components small, composable, and easy to extend.
- **Theme Tokens**: Use theme colors, spacing, and fonts from Tailwind config rather than hard-coded values.
- **Testing Styles**: Verify styles in Storybook for visual correctness and interactive states.

<br><br>






<!--
# ============================================================================
# 🧹 CODE QUALITY
# ============================================================================
#
# This section defines **coding standards, component design principles, and 
# best practices** for maintaining high-quality, maintainable, and reusable code 🦁.
#
# ────────────────────────────────────────────────────────────────────────────
# ✅ OBJECTIVES
# ────────────────────────────────────────────────────────────────────────────
#
# • Ensure all components are fully typed with TypeScript
# • Promote reusable, composable, and functional components
# • Maintain tree-shakeable, dependency-light components
# • Keep documentation and Storybook examples up-to-date
#
# ────────────────────────────────────────────────────────────────────────────
# 🛠️ BEST PRACTICES
# ────────────────────────────────────────────────────────────────────────────
#
# • Use functional components and React hooks
# • Fully type all props and function signatures
# • Keep components small, focused, and modular
# • Avoid unnecessary dependencies or side effects
# • Write Storybook stories and Vitest tests for all components
# • Ensure consistent naming conventions for files, props, and variables
#
# ────────────────────────────────────────────────────────────────────────────
# ⚡ IMPORTANT
# ────────────────────────────────────────────────────────────────────────────
#
# • Updating a component may require updating stories, tests, and documentation
# • Always run linting and tests before merging
# • Follow the existing project patterns to maintain consistency
# • Any breaking changes must be communicated and documented
#
# ============================================================================
-->


<h1 id="code-quality">🧹 Code Quality
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Typescript-v5.9.3-informational?style=flat&logo=typescript&color=3178c6" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-v4.1.17-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React.js-v18.3.1-61DAFB?logo=react&logoColor=white" alt="React.js"></a>
</h1>

- **TypeScript**: All components must be fully typed.
- **Tailwind CSS**: Use utility classes consistently.
- **Storybook**: Add new stories and update stories.
- **Reusable**: Keep components small and composable
- **Functional**: Prefer functional components and hooks
- **Tree-shakeable**: Components should avoid unnecessary dependencies.
- **Documentation**: Update README and Storybook documentation if applicable.

<br><br>



# 🛡 Security and Reporting Issues

- Report any security vulnerability to the maintainers via email: ijeffrouk@gmail.com.
- Do not open a public issue for security vulnerabilities.

<br><br>



# 🏁 Conclusion

Thank you for contributing to **Leo** 🦁

Your contributions help keep the design system reliable, accessible, and easy to evolve.
Whether you’re fixing a bug, adding a component, improving tests, or refining documentation — every improvement matters.

Final Checklist Before Submitting

- ✅ Code builds locally
- ✅ Stories are added or updated
- ✅ Tests pass (or stories include play functions)
- ✅ One package manager used consistently
- ✅ Changes are scoped and well-documented

If you’re unsure about anything, open a draft PR or ask — collaboration is encouraged.

**Happy building** 🚀
