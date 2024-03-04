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

test("Hover action on Popover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const initialPopover = screen.queryByText('No ice cream will actually be delivered');
  expect(initialPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText('Terms and Conditions');
  await user.hover(termsAndConditions);
  const popover = screen.getByText('No ice cream will actually be delivered');
  expect(popover).toBeInTheDocument();


  await user.unhover(termsAndConditions);
  const finalPopover = screen.queryByText('No ice cream will actually be delivered');
  expect(finalPopover).not.toBeInTheDocument();
});