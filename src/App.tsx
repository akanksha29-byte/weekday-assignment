import { useEffect, useState } from "react";
import { INITIAL_STATE } from "./constants";
import CardsComponent from "./components/Cards";
import FilterComponent from "./components/FilterSection";
import NoDataFoundComponent from "./components/NoDataFound";
import Loader from "./components/Loader";
import { lazyLoadOnScroll } from "./util";
import { useDispatch, useSelector } from "react-redux";
import { fetchJdList } from "./store/jdListSlice";
import { RootState } from "./store";
import "./App.css";
import { JDlist } from "./types";

function App() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(INITIAL_STATE);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });

  const {
    isLoading,
    jdList: data,
    totalCount,
  } = useSelector((state: RootState) => state?.jdReducer);

  useEffect(() => {
    dispatch(fetchJdList(pagination));
  }, [pagination.offset]);

  const updatePaginationData = () => {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset + 1,
    }));
  };

  const lastRef = lazyLoadOnScroll(
    totalCount || 0,
    data?.length || 0,
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
    const filteredData = getFilterData(data || []);
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
