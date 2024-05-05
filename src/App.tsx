import { useEffect, useState } from "react";
import { useGetJDListQuery } from "./store/jdListApi";
import { INITIAL_STATE } from "./constants";
import CardsComponent from "./components/Cards";
import FilterComponent from "./components/FilterSection";
import NoDataFoundComponent from "./components/NoDataFound";
import Loader from "./components/Loader";
import { lazyLoadOnScroll } from "./util";
// import { useDispatch } from "react-redux";
// import { setJDList } from "./store/jdListSlice";
import "./App.css";
import { JDlist } from "./types";

function App() {
  // const dispatch = useDispatch();

  const [filter, setFilter] = useState(INITIAL_STATE);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });

  const { data, isLoading, isError } = useGetJDListQuery({
    limit: pagination?.limit,
    offset: pagination?.offset,
  });

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     // Dispatch setJDList action to append new data
  //     dispatch(setJDList(data));
  //   }
  // }, [data, isLoading, dispatch]);

  const updatePaginationData = () => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset + 1,
    }));
  };

  const lastRef = lazyLoadOnScroll(
    data?.totalCount || 0,
    data?.jdList?.length || 0,
    isLoading,
    updatePaginationData
  );

  const handleClickApplyLink = (link: string) => {
    window.open(link);
  };

  const handleSetFilterValue = (type: string, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const getFilterData = (jdList: JDlist[]) => {
    let jdListData = [...jdList];
    if (jdList?.length) {
      if (filter?.companyName) {
        jdListData = jdListData?.filter((jd) =>
          jd?.companyName
            .toLowerCase()
            .includes(filter?.companyName.toLocaleLowerCase())
        );
      }

      if (filter?.location) {
        jdListData = jdListData?.filter(
          (jd) =>
            jd?.location.toLowerCase() === filter?.location?.toLocaleLowerCase()
        );
      }

      if (filter?.minBasePay) {
        jdListData = jdListData?.filter(
          (jd) => parseInt(filter?.minBasePay, 10) >= jd?.minJdSalary
        );
      }

      if (filter?.minExp) {
        jdListData = jdListData?.filter(
          (jd) => (jd?.minExp || 0) <= parseInt(filter?.minExp, 10)
        );
      }

      if (filter?.role) {
        jdListData = jdListData?.filter(
          (jd) =>
            jd?.jobRole.toLowerCase() === filter?.role?.toLocaleLowerCase()
        );
      }
    }

    return jdListData;
  };

  const getMainComponent = () => {
    const filteredData = getFilterData(data?.jdList || []);
    if (isLoading) {
      return <Loader />;
    }

    if (!filteredData?.length) {
      return <NoDataFoundComponent />;
    }
    return (
      <>
        <CardsComponent
          observerRef={lastRef}
          data={filteredData}
          onClickApplyLink={handleClickApplyLink}
        />
      </>
    );
  };

  return (
    <div className="app-container">
      <div className="header-component">👋 User</div>
      <FilterComponent onSetFilterValue={handleSetFilterValue} />
      {getMainComponent()}
    </div>
  );
}

export default App;
