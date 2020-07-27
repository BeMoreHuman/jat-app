export enum UpdateDataStatuses {
  init = 'init',
  update = 'update',
}

export interface Environment {
  production: boolean;
  apiUrl: string;
}
