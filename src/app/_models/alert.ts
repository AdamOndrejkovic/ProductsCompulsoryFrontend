export class Alert {
  id: string | undefined;
  type: AlertType | undefined;
  message: string | undefined;
  autoClose: boolean | undefined;
  // @ts-ignore
  keepAfterRouteChange: boolean;
  fade: boolean | undefined;

  constructor(init?:Partial<Alert>) {
    Object.assign(this, init)
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
