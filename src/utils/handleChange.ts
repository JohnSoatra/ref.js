import { OnChange } from "../types/ref";

export default function handleChange(
  onChange: OnChange | undefined,
  ...props: Parameters<OnChange>
) {
  if (onChange) {
    onChange(...props);
  }
}
