import { Button } from "@mantine/core";
import clsx from "clsx";
import { isUndefined } from "lodash";

const Component = (props: any) => {
  const animation = "duration-300 transaction-all";

  const filledVariantClassName = clsx("bg-orange-600 font-main", animation);

  const defaultVariantClassName = clsx("text-neutral-1000 font-main hover:border-orange-600 hover:bg-orange-600 hover:text-white", animation);

  const mergeClassName = clsx(
    "!py-[10[x] disabled:text-white disabled:bg-gray-400",
    { [defaultVariantClassName]: props?.variant === "default", [filledVariantClassName]: isUndefined(props.variant) || props.variant === "filled" },
    props.className,
  );

  return (
    <Button {...props} className={mergeClassName}>
      {props.children}
    </Button>
  );
};

export default Component;
