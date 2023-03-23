import reactStringReplace from "react-string-replace";

export const USDFormat = (num) => {
  return new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: "currency"
  }).format(num);
};

// export const hidePhoneNumber = (phoneNumbers, text) => {
//   let newDescription: string | React.ReactNodeArray = text;

//   phoneNumbers.forEach((phoneNumber, key) => {
//     newDescription = reactStringReplace(
//       newDescription,
//       phoneNumber.real,
//       () => (
//         <span key={key} onClick={() => togglePhoneNumber(key)}>
//           {phoneNumbers[key]?.hideReal
//             ? phoneNumbers[key]?.secured
//             : phoneNumbers[key]?.real}
//         </span>
//       )
//     );
//   });
//   newDescription = reactStringReplace(newDescription, "\n", () => <br />);
//   newDescription && setSecureDescription(newDescription);

// }
