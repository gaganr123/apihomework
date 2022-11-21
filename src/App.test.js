import { render, screen } from "@testing-library/react";

import Appcrud from "./Appcrud";

test("renders learn react link", () => {
  render(<Appcrud />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
