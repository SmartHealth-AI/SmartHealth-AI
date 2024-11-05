import { useMemo, useState } from "react";

import { Input, Menu } from "@mantine/core";

import { map, filter, find, isEmpty } from "lodash";



const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <g id="tick">
      <g id="vuesax/outline/tick">
        <g id="tick_2">
          <path
            id="Vector"
            d="M10.5799 15.5801C10.3799 15.5801 10.1899 15.5001 10.0499 15.3601L7.21994 12.5301C6.92994 12.2401 6.92994 11.7601 7.21994 11.4701C7.50994 11.1801 7.98994 11.1801 8.27994 11.4701L10.5799 13.7701L15.7199 8.6301C16.0099 8.3401 16.4899 8.3401 16.7799 8.6301C17.0699 8.9201 17.0699 9.4001 16.7799 9.6901L11.1099 15.3601C10.9699 15.5001 10.7799 15.5801 10.5799 15.5801Z"
            fill="#00AB56"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const Line = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1" height="16" viewBox="0 0 1 16" fill="none">
    <line x1="0.5" y1="2.18557e-08" x2="0.499999" y2="16" stroke="#B4B6C1" />
  </svg>
);

const AreaPhoneCodeTarget = ({ item, inputPhoneCodeRef, disabled }: any) => {
  return (
    <Menu.Target>
      <div
        className={`flex items-center gap-2 cursor-pointer text-sm ${
          disabled ? "text-[#909296]" : "text-main-600"
        } w-auto whitespace-nowrap pl-3 ${
          inputPhoneCodeRef?.current?.clientHeight ? `h-[${inputPhoneCodeRef?.current?.clientHeight}px]` : ""
        }`}
      >
        {!isEmpty(item) ? (
          <>
            <span>{item?.icon}</span>
            <span>{item?.sign}</span>
          </>
        ) : (
          <span className="text-xs uppercase">Chọn Mã</span>
        )}
        <Line />
      </div>
    </Menu.Target>
  );
};

export const AreaPhoneCode = ({ value, onChange, disabled, inputPhoneCodeRef }: any) => {
  const [search, setSearch] = useState("");


  return (
    <Menu width="426px" position="bottom-start" offset={20} disabled={disabled}>
      <AreaPhoneCodeTarget inputPhoneCodeRef={inputPhoneCodeRef} disabled={disabled} />
      <Menu.Dropdown className="p-0 rounded-lg">
        <div className="p-4">
          <Input
            placeholder="Tìm quốc gia"
            size="sm"
          
            className="mb-2"
            onChange={(e) => setSearch(e.target.value)}
          />
        
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};
