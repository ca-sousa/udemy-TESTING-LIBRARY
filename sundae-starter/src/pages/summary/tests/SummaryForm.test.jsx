import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Check start conditions of the page", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmButton).toBeDisabled();
});

test("Checking Checkbox enables button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();
});

test("Unchecking Checkbox after being checked disable button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  await user.click(checkBox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkBox);
  expect(confirmButton).toBeDisabled();
});