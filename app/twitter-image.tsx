import { renderShareCard } from "@/lib/og-card";

export const alt = "CreditCovered — Credit Life Insurance. Death. Disability. Retrenchment. Maternity.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderShareCard(size);
}
