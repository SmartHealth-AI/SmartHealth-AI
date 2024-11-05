import React from "react";
import PhoneNumberInput from "react-phone-number-input";
import { CountryCode } from "libphonenumber-js/core";
interface PhonInputProps {
  form: any;
  defaultCountry?: CountryCode;
  name: string;
  label: string;
}
const PhoneInput = (props: PhonInputProps) => {
  const { form, label, name, defaultCountry } = props;

  return (
    <div className="phone-country-input-container">
      <p className="mb-[8px] text-[#212529] text-[14px] font-[500]">{label}</p>
      <PhoneNumberInput
        international
        defaultCountry={"VN"}
        name={name}
        value={form?.values?.[name]}
        onChange={(e) => form.setFieldValue(name, e)}
        className={`h-[42px] ${form?.errors?.[name] ? "error" : ""}`}
        placeholder={label}
      />
      {form?.errors?.[name] && <p className="text-[#E84E49] text-[12px] mt-1">{form?.errors?.[name]}</p>}
    </div>
  );
};

export default PhoneInput;
