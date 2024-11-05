import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import { Input } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";

import { isEmpty } from "lodash";

import Close from "@/icons/Close";

import { validateOnlyNumber } from "@/utils/validate";

import { AreaPhoneCode } from "./AreaPhoneCode";

const InputPhoneNumber = ({
  value: valueProps,
  onChange,
  error,
  placeholder,
  label,
  labelProps,
  enablePhoneStyle = false,
  withAsterisk,
  disabled = false,
  useFormatNumber = false
}: any) => {
  const inputPhoneCodeRef: any = useRef();
  const inputRef: any = useRef();

  const { ref, focused } = useFocusWithin();

  const [value, setValue] = useState<any>("");

  const [areaPhoneCode, setAreaPhoneCode] = useState<string>("+84");

  const isShowClearValue = useMemo(() => !isEmpty(value) && focused, [focused, value]);

  const isShowAreaPhoneCode = useMemo(() => enablePhoneStyle || validateOnlyNumber(value), [value]);

  const onChangeHandler = useCallback(
    ({ value, code }: any) => {
      if (onChange) {
        onChange(value);
        // if (!isShowAreaPhoneCode) onChange(value);
        // else onChange(`${code}${value}`);
      }
    },
    [isShowAreaPhoneCode],
  );

  const onClearValueHandler = useCallback(() => {
    setValue("");
    onChangeHandler({ value: "", code: "" });
    inputRef.current.focus();
  }, [onChangeHandler]);

  const onSetValueHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let phoneVal = event.target.value;
      if (useFormatNumber) {
        phoneVal = phoneVal.replace(/\D/g, '');
      }

      setValue(phoneVal);
      onChangeHandler({ value: phoneVal, code: areaPhoneCode });
    },
    [areaPhoneCode, onChangeHandler],
  );

  const onSetAreaPhoneCodeHandler = useCallback(
    ({ code }: any) => {
      setAreaPhoneCode(code);
      onChangeHandler({ value, code });
    },
    [value, areaPhoneCode, onChangeHandler],
  );

  useEffect(() => {
    setValue(valueProps);
  }, [valueProps]);

  return (
    <Input.Wrapper withAsterisk={withAsterisk} label={label} classNames={{ label: labelProps?.className, error: "mt-[0.3125rem]" }} error={error}>
      <div
        ref={ref}
        style={{ transition: "border-color 100ms ease" }}
        className={classNames("flex items-center w-full border rounded-lg overflow-hidden", {
          "border-[#ced4da]": isEmpty(error) && !focused,
          "border-main-600": isEmpty(error) && focused,
          "border-negative-500": !isEmpty(error),
        })}
      >
        {isShowAreaPhoneCode && (
          <div className={`cursor-pointer relative ${disabled ? "bg-[#f1f3f5] opacity-[0.6] " : ""}`}>
            <AreaPhoneCode value={areaPhoneCode} onChange={onSetAreaPhoneCodeHandler} disabled={disabled} inputPhoneCodeRef={inputPhoneCodeRef} />
          </div>
        )}
        <Input
          ref={inputRef}
          error={!!error}
          placeholder={placeholder}
          className="w-full mb-0"
          value={value}
          disabled={disabled}
          variant="unstyled"
          classNames={{ input: classNames({ "pl-2": isShowAreaPhoneCode }) }}
          rightSectionProps={{ onClick: onClearValueHandler }}
          rightSection={
            <span className={classNames("cursor-pointer text-neutral-600", { hidden: !isShowClearValue })}>
              <Close size={24} />
            </span>
          }
          onChange={onSetValueHandler}
        />
      </div>
    </Input.Wrapper>
  );
};
export default InputPhoneNumber;
