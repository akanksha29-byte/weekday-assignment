const NoDataFound = () => {
  return (
    <div className="no-data-found-container">
      <img
        className="no-data-found-img mt-20"
        src="https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png"
        alt="search-failed"
      />
      <div className="mt-20 font-weight-bold">
        No Jobs available for this category at the moment
      </div>
    </div>
  );
};

export default NoDataFound;
