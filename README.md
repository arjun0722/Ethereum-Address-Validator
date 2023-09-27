## Features

- **Ethereum Address Validation**: The application validates Ethereum addresses to ensure they are 42 characters in length and properly formatted.

- **Duplicate Address Handling**: Duplicate Ethereum addresses are identified and can be handled using two buttons: "Keep the First One" and "Combine Balance." These buttons are only active when there are no errors related to invalid addresses beacuse we cant combine invalid address and keep first invalid first address.

- **User-Friendly Interface**: The application provides a user-friendly interface with a numbered list for easy identification of Ethereum addresses.Also we can scroll both line number and address .

NOTE : Be ansure remove the last unacquired space , like line no 10 have no address so before click on next pls make sure press backspace and Next button won't work until you wrote any address there .

## Usage

1. Enter Ethereum addresses in the textarea provided in `NumberedTextArea.tsx`.

2. Click the "Submit" button to validate the addresses. Any errors related to invalid Ethereum addresses will be displayed.

3. If there are no errors regarding invalid addresses, you can use the "Keep the First One" and "Combine Balance" buttons to manage duplicate addresses.

4. The "Keep the First One" button will remove duplicate addresses and keep the first occurrence.

5. The "Combine Balance" button will combine the balances of duplicate addresses.
