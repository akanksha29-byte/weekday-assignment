export interface JDlist  {
    jdUid: string,
    jdLink: string,
    jobDetailsFromCompany: string;
    maxJdSalary: number,
    minJdSalary: number,
    salaryCurrencyCode: string,
    location: string,
    minExp: number,
    maxExp: number,
    jobRole: string,
    companyName: string,
    logoUrl:string
}


export interface InitialState  {
    jdList: JDlist[]
    totalCount: number;
}

export interface FetchJDListRequestPayload {
    offset: number,
    limit: number
}

export interface JDListApiResponse extends InitialState {}