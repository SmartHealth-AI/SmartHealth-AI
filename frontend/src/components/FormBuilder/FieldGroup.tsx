import { memo } from "react";

import map from "lodash/map";

import { Grid } from "@mantine/core";

import FormField from "./FormField";

export default memo(({ form, children, label }: any) => {
  return (
    <Grid gutter={8} align="center">
      {label && (
        <Grid.Col span={12} className="font-medium">
          {label}
        </Grid.Col>
      )}
      {map(children, (item, index) => (
        <Grid.Col span={item?.span || 12 / children?.length} key={index}>
          <FormField
            type={item.type}
            hasLabelLayout={item.hasLabelLayout}
            form={form}
            name={item.name}
            component={item.component}
            label={item.label}
            defaultValue={item.defaultValue}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
});
