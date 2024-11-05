import { forwardRef } from "react";

import classNames from "classnames";

import { TagsInput as Component } from "react-tag-input-component";

import styled from "styled-components";

const ComponentStyled = styled.div`
  .rti--container {
    min-height: 50px;
    border-color: #ced4da !important;
    padding: 6px 12px;
    font-size: 14px !important;

    &:focus-within {
      outline: none !important;
      box-shadow: none !important;
    }

    &:hover {
      border-color: #ed6203 !important;
    }

    .rti--tag {
      button {
        padding-right: 0;
        color: #38383d !important;
        opacity: 0.5;
      }
    }
  }
`;

export const TagsInput = forwardRef(({ descriptionBehavior, value, ...props }: any, ref: any) => {
  console.log({ props });
  return (
    <ComponentStyled>
      <Component
        classNames={{ tag: "!py-2 !px-[14px] !rounded-full font-main !bg-neutral-300 text-neutral-1000 text-xs font-semibold", input: "w-auto" }}
        value={value || []}
        {...props}
      />
      {descriptionBehavior && <div className="text-xs	mt-1.5 italic">{descriptionBehavior}</div>}
    </ComponentStyled>
  );
});

export default TagsInput;
