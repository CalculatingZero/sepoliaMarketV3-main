import React from "react";
import styles from "./ContainerAR.module.css";

type Props = {
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
};

/**
 * A container component that sets the max-width of its children, and centers them on the page.
 * @param maxWidth: The max-width of the container. Can be "sm", "md", "lg", "xl", or "2xl".
 */
export default function ContainerAR({ maxWidth, children }: Props) {
  return (
    <div className={`${styles.container} ${styles[maxWidth]}`}>{children}</div>
  );
}
