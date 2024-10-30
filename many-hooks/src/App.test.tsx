import { render, screen } from "./tests/renderer";
import App from "./App";

const setup = () => render(<App />);

describe("App", () => {
  it("should render the title", () => {
    setup();

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
