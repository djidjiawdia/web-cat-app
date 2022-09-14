export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  state: DataStateEnum;
  data?: T;
  error?: any;
}
