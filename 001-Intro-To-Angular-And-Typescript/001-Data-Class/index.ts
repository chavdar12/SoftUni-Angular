export class Request {
  method: string;
  uri: string;
  version: string;
  message: string;
  response: string | undefined = undefined;
  fulfilled = false;

  constructor(method: string, uri: string, version: string, message: string) {
    this.method = method;
    this.uri = uri;
    this.version = version;
    this.message = message;
  }
}

const myData = new Request('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
