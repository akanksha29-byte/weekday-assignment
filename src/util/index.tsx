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
