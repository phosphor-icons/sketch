import { icons as iconData } from "@phosphor-icons/core";
import * as Icons from "@phosphor-icons/react";

export const icons = iconData.map((entry) => ({
  ...entry,
  Icon: Icons[entry.pascal_name],
}));
