import { memo, useMemo, useState } from "react";
import clsx from "clsx";
import { NumberInput } from "@mantine/core";
import { isEmpty } from "lodash";
import InputNumber from "rc-input-number";



export default memo(
  ({
    type,
    label,
    checked,
    labelClassName,
    status,
    upload,
    value,
    setValue,
    multiple,
    align = "text-end",
    onChange,
    size = "lg",
    format = ".",
    isFormat = true,
    rightSection,
    ...restProps
  }: any) => {
    const { withAsterisk, error } = restProps;
    const mergeLabelClassName = useMemo(() => clsx("cursor-pointer text-sm leading-none", labelClassName, { "text-main-600": checked }), [checked]);
    return (
      <div className="flex flex-col p-[3px] w-full">
        {!isEmpty(label)  }
        {isFormat ? (
          <>
            <InputNumber
              placeholder="Nhập số"
              value={value}
              parser={(value: any) => value.replace(/\D/g, "")}
              formatter={(value: any) => (Number.isInteger(+value) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, format) : "")}
              onChange={onChange}
              controls
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              rightSection={rightSection}
              rightSectionWidth={50}
              {...restProps}
            />
            
          </>
        ) : (
          <NumberInput
            placeholder="Nhập số"
            hideControls
            clsx={{ input: `${align}` }}
            size={size}
            value={value}
            // parser={(value) => value.replace(/\D/g, "")}
            // formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, format) : "")}
            onChange={onChange}
            rightSection={rightSection}
            rightSectionWidth={50}
            {...restProps}
          />
        )}
      </div>
    );
  },
);
