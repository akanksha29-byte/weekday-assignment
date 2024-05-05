export const getCurrencyType = (currCode: string) => {
  switch (currCode) {
    case "USD":
      return <span>&#36;</span>;
    default:
      return <span>&#8377;</span>;
  }
};
