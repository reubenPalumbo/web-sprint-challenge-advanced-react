import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);
});

test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);

  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/Last name/i);
  const address = screen.getByLabelText(/Address/i);
  const city = screen.getByLabelText(/City/i);
  const state = screen.getByLabelText(/State/i);
  const zip = screen.getByLabelText(/Zip/i);

  const button = screen.getByRole("button", { name: /checkout/i });

  fireEvent.change(firstName, {
    target: { name: "firstName", value: "Reuben" },
  });
  fireEvent.change(lastName, {
    target: { name: "lastName", value: "Palumbo" },
  });
  fireEvent.change(address, {
    target: { name: "address", value: "14145 SW Teal Blvd, #51F" },
  });
  fireEvent.change(city, { target: { name: "city", value: "Beaverton" } });
  fireEvent.change(state, { target: { name: "state", value: "OR" } });
  fireEvent.change(zip, { target: { name: "zip", value: "97008" } });

  fireEvent.click(button);

  const end = await screen.findByTestId("successMessage");

  const nameEnd = screen.getByTestId(/name/i);
  const addressEnd = screen.getByTestId(/address/i);
  const locationEnd = screen.getByTestId(/location/i);

  expect(nameEnd).toHaveTextContent(/reuben palumbo/i);
  expect(addressEnd).toHaveTextContent(/14145 SW Teal Blvd, #51F/i);
  expect(locationEnd).toHaveTextContent(/Beaverton/i);
});
