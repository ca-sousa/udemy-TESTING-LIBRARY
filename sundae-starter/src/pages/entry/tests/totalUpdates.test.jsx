import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update scoop subtotal when toopings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toopingTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toopingTotal).toHaveTextContent("0.00");

  const cherriesOption = await screen.findByRole("checkbox", {name: "Cherries" });
  await user.click(cherriesOption);
  expect(toopingTotal).toHaveTextContent("1.50")

  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudgeCheckbox);
  expect(toopingTotal).toHaveTextContent("3.00");
  
  // remove hot fudge and check subtotal
  await user.click(hotFudgeCheckbox);
  expect(toopingTotal).toHaveTextContent("1.50");
});