import React from "react";
import reactStringReplace from "react-string-replace";
import PhoneNumber from "../components/PhoneNumber";

export const USDFormat = (num) => {
  return new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: "currency"
  }).format(num);
};

export const hidePhoneNumber = (text) => {
  const regexp = new RegExp(
    "\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+",
    "g"
  );
  const phone_numbers = [...text.matchAll(regexp)]
    .filter((item) => item[0].length > 7)
    .map((item) => ({
      real: item[0],
      secured: item[0].replace(/\d{4}$/, "XXXX"),
      hideReal: true
    }))

  let newDescription: string | React.ReactNodeArray = text;

  phone_numbers.forEach((phoneNumber, key) => {
    newDescription = reactStringReplace(
      newDescription,
      phoneNumber.real,
      () => <PhoneNumber {...phoneNumber} />,
    );
  });

  return newDescription;
}
