export interface JDlist {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
}

export interface InitialState {
  jdList: JDlist[];
  totalCount: number;
}

export interface FetchJDListRequestPayload {
  offset: number;
  limit: number;
}

export interface JDListApiResponse extends InitialState {}

export interface CommonProps {
  onClickApplyLink: (link: string) => void;
}
export interface CardsComponentProps extends CommonProps {
  data: JDlist[];
  observerRef: React.LegacyRef<HTMLDivElement> | undefined;
}
export interface CardComponentProps extends CommonProps {
  data: JDlist;
}
