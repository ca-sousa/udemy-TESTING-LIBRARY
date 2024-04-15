import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Order phases for happy path", async () => {
  const user = userEvent.setup();

  // render app
  const { unmount } = render(<App />);

  // add ice cream scoops and toppings
  const scoopInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(scoopInput);
  await user.type(scoopInput, "1");

  const toppingInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(toppingInput);
  
  // find and click order summary button
  const orderSummaryButton = screen.getByRole("button", { name: "Order Sundae!"})
 await user.click(orderSummaryButton);

  // check summary subtotals 
  const scoopSubtotal = screen.getByText("Scoops: $2.00");
  expect(scoopSubtotal).toBeInTheDocument();
  const toppingSubtotal = screen.getByText("Toppings: $1.50");
  expect(toppingSubtotal).toBeInTheDocument();

  // check summary options
  const scoopSummary = screen.getByText("1 Vanilla");
  expect(scoopSummary).toBeInTheDocument();
  const toppingSummary = screen.getByText("Cherries");
  expect(toppingSummary).toBeInTheDocument();
  
  // accept terms and click button
  const termsCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i});
  const confirmCheckbox = screen.getByRole("button", { name: "Confirm order"})
  
  expect(confirmCheckbox).toBeDisabled();
  await user.click(termsCheckbox);
  expect(confirmCheckbox).toBeEnabled();

  await user.click(confirmCheckbox);

  // Expect "loading" to show
  const loading = screen.getByText("Loading");
  expect(loading).toBeVisible();
 
  // check confirmation page text
  const confirmationHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(confirmationHeader).toBeInTheDocument();
  
  // expect that loading has disappeared
  const loadingDisapear = screen.queryByText("Loading");
  expect(loadingDisapear).not.toBeInTheDocument()
 
  // find and click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {name:"Create new order"});
  expect(newOrderButton).toBeInTheDocument();
  await user.click(newOrderButton);

  // check that scoops and toppings have been reset
  const scoopsReset = await screen.findByText("Scoops total: $0.00");
  expect(scoopsReset).toBeInTheDocument();
  const toppingsReset = screen.getByText("Toppings total: $0.00");
  expect(toppingsReset).toBeInTheDocument();

  // explicitly unmount component to trigger network call cancellation on cleanup
  unmount();
});