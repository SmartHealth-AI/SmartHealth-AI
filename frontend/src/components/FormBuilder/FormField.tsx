import { memo, useMemo, useState } from "react";

import clsx from "clsx";

import { Grid, Text } from "@mantine/core";

import TagInput from "@/components/TagInput";
import TextInput from "@/components/TextInput";
import TextPhoneInput from "@/components/TextPhoneInput";
import TextArea from "@/components/TextArea";
import NumberInput from "@/components/NumberInput";
import PasswordInput from "@/components/PasswordInput";
import FieldGroup from "./FieldGroup";
import dynamic from "next/dynamic";


export default memo(
  ({
    render,
    type,
    layout,
    name,
    label,
    note,
    hasLabelLayout = true,
    children,
    labelAlign = "center",
    form,
    component,
    defaultValue,
    checked,
    max,
    min,
    minDate,
    maxDate,
    description,
    isError,
  }: any) => {
    const [mb] = useState("mb-2");
    const mergeLabel = useMemo(() => {
      if (layout === "vertical") return label;
      return null;
    }, [layout, label]);

    const mergeHasLabelLayout = useMemo(() => layout !== "vertical" && label && (type !== "checkbox" || (type === "checkbox" && hasLabelLayout)), []);

    const childrenRender: any = useMemo(() => {
      switch (type) {
       
       
        case "password":
          return (
            <PasswordInput
              label={mergeLabel}
              labelProps={{ className: clsx(mb, { "w-full text-center": labelAlign === "center" }) }}
              {...component}
              {...form.getInputProps(name)}
            />
          );

        case "textPhone":
          return (
            <TextPhoneInput
              label={mergeLabel}
              labelProps={{ className: clsx(mb, { "w-full text-center": labelAlign === "center" }) }}
              {...form.getInputProps(name)}
              {...component}
            />
          );

        

        case "fieldGroup":
          return <FieldGroup label={label} children={children} form={form} />;

        
        case "number":
          return (
            <NumberInput
              align={component?.align}
              label={mergeLabel}
              labelProps={{ className: mb }}
              max={max}
              min={min}
              {...form.getInputProps(name)}
              {...component}
            />
          );

        case "textArea":
          return <TextArea label={mergeLabel} labelProps={{ className: mb }} {...component} {...form.getInputProps(name)} />;

        default:
          return (
            <TextInput
              defaultValue={form.getInputProps(name)?.value}
              label={mergeLabel}
              labelProps={{ className: clsx(mb, { "w-full text-center": labelAlign === "center" }) }}
              sx={{
                "::placeholder": {
                  color: "#BDBDBD",
                },
              }}
              {...{ ...form.getInputProps(name), value: undefined }}
              {...component}
            />
          );
      }
    }, [type, form, mergeLabel, component]);

    return (
      <Grid gutter={6} justify="space-between" align={labelAlign}>
        {mergeHasLabelLayout && (
          <Grid.Col span={4}>
            <Text style={{ fontSize: 14 }}>
              {type === "checkbox" && hasLabelLayout ? "" : label}
            </Text>
          </Grid.Col>
        )}
        <Grid.Col id={name} span={mergeHasLabelLayout ? 8 : 12}>
          {childrenRender}
        </Grid.Col>
        {note && (
          <>
            <Grid.Col span={4}></Grid.Col>
            <Grid.Col span={mergeHasLabelLayout ? 8 : 12}>
              <Text c="dimmed" fz="xs">
                {note}
              </Text>
            </Grid.Col>
          </>
        )}
        {description && (
          <>
            <Grid.Col span={4}></Grid.Col>
            <Grid.Col span={mergeHasLabelLayout ? 8 : 12}>
              <Text  style={{ fontSize: 12, color: "GrayText" }}>
                {description}
              </Text>
            </Grid.Col>
          </>
        )}
      </Grid>
    );
  },
);
