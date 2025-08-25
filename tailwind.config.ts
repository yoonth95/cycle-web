import type { Config } from "tailwindcss";

interface ConfigWithSafelist extends Config {
  safelist?: (
    | string
    | {
        pattern: RegExp;
        variants?: string[];
      }
  )[];
}

const config: ConfigWithSafelist = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(py|px|pt|pr|pb|pl|m|mt|mr|mb|ml|gap)-\[\d+px\]/,
    },
  ],
};

export default config;
