import { render } from "@testing-library/react";

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (component: React.ReactElement) => render(component, { wrapper });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

export { customRender as render };
