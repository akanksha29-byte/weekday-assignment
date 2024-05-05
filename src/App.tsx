import { useEffect, useState, useRef } from "react";
import { useGetJDListQuery } from "./store/jdListApi";
import { INITIAL_STATE } from "./constants";
import CardsComponent from "./components/Cards";
import FilterComponent from "./components/FilterSection";
import "./App.css";
import { JDlist } from "./types";

function App() {
  const observerRef = useRef(null);

  const [filter, setFilter] = useState(INITIAL_STATE);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });

  const { data, isLoading, isError } = useGetJDListQuery({
    payload: pagination,
  });

  useEffect(() => {
    const hasMore = (data?.totalCount || 0) > (data?.jdList?.length || 0);
    if (isLoading) return;

    console.log("Creating IntersectionObserver");

    console.log(hasMore);

    const observer = new IntersectionObserver((entries) => {
      console.log("Intersection observed:", entries);
      if (entries[0]?.isIntersecting && hasMore) {
        console.log("Intersection observed and has more data, calling API");
        // Call your API here
      }
    });

    if (observerRef.current) {
      console.log("Start observing");
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        console.log("Stop observing");
        observer.unobserve(observerRef.current);
      }
    };
  }, [data, isLoading, observerRef.current]);

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
          (jd) => parseInt(filter?.minBasePay, 10) <= (jd?.minJdSalary || 0)
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

  return (
    <div className="app-container">
      <FilterComponent onSetFilterValue={handleSetFilterValue} />
      <CardsComponent
        observerRef={observerRef}
        data={getFilterData(data?.jdList || [])}
        onClickApplyLink={handleClickApplyLink}
      />
    </div>
  );
}

export default App;
