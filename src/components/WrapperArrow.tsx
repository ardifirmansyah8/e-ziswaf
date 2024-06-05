import { ReactNode } from "react";

export default function WrapperArrow(props: {
  children: ReactNode;
  slideCount?: number;
  currentSlide?: number;
}) {
  const { children, currentSlide, slideCount, ...others } = props;
  return <span {...others}>{children}</span>;
}
