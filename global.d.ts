declare module "eslint-plugin-storybook";

declare module "*.svg" {
    const content: string;
    export default content;
}