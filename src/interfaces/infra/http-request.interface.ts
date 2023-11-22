interface IRequestAWS<T> {
  [x: string]: unknown;
  [x: number]: unknown;
  body?: T;
  //queryParams:
  //adicionar os outros que forem necessários, path params, query params e etcs
}

export { IRequestAWS };
