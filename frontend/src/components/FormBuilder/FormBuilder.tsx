import React, { useMemo } from "react";

import { isFunction, map } from "lodash";

import { Card, Grid } from "@mantine/core";

import Button from "@/components/Button";

import FormField from "./FormField";
import PhoneInput from "../PhoneInput";

export const FormBuilder = ({
  form,
  fields,
  layout = "vertical",
  submitLoading,
  onCancel,
  submitClassName,
  submitText,
  onSubmit,
  withCardComponent = true,
  gutter = 16,
  size = "lg",
  radius = "md",
  hideSubmitBtn = false,
  enabledForm = false,
  className = "w-full",
}: any) => {
  if (enabledForm) {
    return (
      <Grid gutter={gutter} className={className}>
        {map(fields, (item, index) => (
          <Grid.Col span={item?.span || 12} key={index}>
            <FormField
              layout={layout}
              type={item.type}
              render={item.render}
              form={form}
              name={item.name}
              label={item.label}
              labelAlign={item.labelAlign}
              children={item.children}
              component={item.component}
              hasLabelLayout={item.hasLabelLayout}
              note={item.note}
              defaultValue={item.defaultValue}
              description={item?.description}
            />
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  return (
    <form onSubmit={form.onSubmit((values: any) => onSubmit(values))}>
      {withCardComponent ? (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Grid gutter={gutter}>
            <Grid.Col span={6}>
              {map(fields, (item, index) => (
                <Grid.Col span={item?.span || 12} key={index}>
                  <FormField
                    layout={layout}
                    type={item.type}
                    render={item.render}
                    form={form}
                    name={item.name}
                    label={item.label}
                    labelAlign={item.labelAlign}
                    children={item.children}
                    component={item.component}
                    hasLabelLayout={item.hasLabelLayout}
                    note={item.note}
                    defaultValue={item.defaultValue}
                    description={item?.description}
                  />
                </Grid.Col>
              ))}
            </Grid.Col>
            <Grid.Col span={12}>
              <Grid className="flex justify-end">
                {isFunction(onCancel) && (
                  <Grid.Col span={3}>
                    <Button style={{ width: "100%" }} onClick={onCancel} variant="outline">
                      Huỷ
                    </Button>
                  </Grid.Col>
                )}
                <Grid.Col span={isFunction(onCancel) ? 3 : 3}>
                  <Button style={{ width: "100%", backgroundColor: "#ED6203" }} type="submit" loading={submitLoading}>
                    {submitText || "Lưu"}
                  </Button>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Card>
      ) : (
        <Grid gutter={gutter}>
          {map(fields, (item, index) => (
            <Grid.Col span={item?.span || 12} key={index}>
              {item.type === "phone_country" ? (
                <PhoneInput defaultCountry="VN" name={item.name} form={form} label={item.label} />
              ) : (
                <FormField
                  layout={layout}
                  type={item.type}
                  render={item.render}
                  form={form}
                  name={item.name}
                  label={item.label}
                  labelAlign={item.labelAlign}
                  children={item.children}
                  component={{ ...item.component, size, radius }}
                  hasLabelLayout={item.hasLabelLayout}
                  note={item.note}
                  defaultValue={item.defaultValue}
                  description={item?.description}
                />
              )}
            </Grid.Col>
          ))}
          {!hideSubmitBtn && !isFunction(onCancel) && (
            <Grid.Col span={12}>
              <Grid className="flex justify-end">
                {isFunction(onCancel) && (
                  <Grid.Col span={3}>
                    <Button radius={radius} size={size} style={{ width: "100%" }} onClick={onCancel} variant="outline">
                      Huỷ
                    </Button>
                  </Grid.Col>
                )}
                <Grid.Col span={isFunction(onCancel) ? 3 : 12}>
                  <Button
                    size={size}
                    radius={radius}
                    style={{ width: "100%", backgroundColor: "#ED6203" }}
                    type="submit"
                    loading={submitLoading}
                    className={submitClassName}
                  >
                    {submitText || "Lưu"}
                  </Button>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          )}
        </Grid>
      )}
    </form>
  );
};
