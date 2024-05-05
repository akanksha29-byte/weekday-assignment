import { useRef, useCallback } from "react";
export const getCurrencyType = (currCode: string) => {
  switch (currCode) {
    case "USD":
      return <span>&#36;</span>;
    default:
      return <span>&#8377;</span>;
  }
};

export const truncateText = (str: string, len: number) => {
  if (str?.length <= len) {
    return {
      isTruncated: false,
      str,
    };
  }

  return {
    isTruncated: true,
    str: str?.substring(0, len),
  };
};

export const lazyLoadOnScroll = (
  totalCount: number,
  dataCount: number,
  isLoading: boolean,
  performAction: () => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const hasMore = totalCount > dataCount;

  return useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect(); // Disconnect the previous observer
        observer.current = null; // Reset the observer reference
      }

      if (node && hasMore) {
        observer.current = new IntersectionObserver((entries) => {
          console.log("Intersection observed:", entries);
          if (entries[0]?.isIntersecting) {
            performAction();
          }
        });

        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );
};
