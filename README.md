# React App + Vite (basic install)

Follow prompt

```shell
npm create vite@latest
```

In the project folder, install vitest and jsdom

```shell
cd [project-name]
npm install --save-dev vitest jsdom
```

In package.json, add a script to run tests

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

In vite.config.ts, add jsdom as the test environment and all the trimmings...

```ts
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.test.tsx", "**/*.test.ts"],
    coverage: {
      include: ["**/*.tsx", "**/*.ts"],
      exclude: [...coverageConfigDefaults.exclude, "**/*/index.ts"],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
  },
});
```

Change tsconfig.node.json to:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

Change tsconfig.json to:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    "lib": ["dom", "esnext"],
    "strict": true,
    "noEmit": true,
    "module": "esnext",
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Change tsconfig.app.json to:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```

Install react-testing-library

```shell
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/node
```

In a new folder ./tests/ add a setup.ts file

```ts
import "@testing-library/jest-dom";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
```

In the same folder add a renderer.tsx file

```ts
import { render } from "@testing-library/react";

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (component: React.ReactElement) => render(component, { wrapper });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

export { customRender as render };
```

Create App.test.tsx

```ts
import { render, screen } from "./tests/renderer";
import App from "./App";

const setup = () => render(<App />);

describe("App", () => {
  it("should render the title", () => {
    setup();

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
```

## File preview

package.json

```json
{
  "name": "many-hooks",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.6.2",
    "@testing-library/react": "16.0.1",
    "@testing-library/user-event": "14.5.2",
    "@types/react": "18.3.12",
    "@types/react-dom": "18.3.1",
    "@vitejs/plugin-react-swc": "3.5.0",
    "eslint": "9.13.0",
    "eslint-plugin-react-hooks": "5.0.0",
    "eslint-plugin-react-refresh": "0.4.14",
    "globals": "15.11.0",
    "jsdom": "25.0.1",
    "typescript": "5.6.2",
    "typescript-eslint": "8.11.0",
    "vite": "5.4.10",
    "vitest": "2.1.4"
  }
}
```
