import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

// credits: https://newbedev.com/angular-serialize-unserialize-in-json-httprequest-and-httpresponse-object

export function serializeRequest(req: HttpRequest<unknown>): string {
  const request = req.clone(); // Make a clone, useful for doing destructive things
  return JSON.stringify({
    headers: Object.fromEntries( // Just a helper to make this into an object, not really required but makes the output nicer
      request.headers.keys().map( // Get all of the headers
        (key: string) => [key, request.headers.getAll(key)] // Get all of the corresponding values for the headers
      )
    ),
    method: request.method, // The Request Method, e.g. GET, POST, DELETE
    url: request.url, // The URL
    params: Object.fromEntries( // Just a helper to make this into an object, not really required but makes the output nicer
      request.headers.keys().map( // Get all of the headers
        (key: string) => [key, request.headers.getAll(key)] // Get all of the corresponding values for the headers
      )
    ), // The request parameters
    withCredentials: request.withCredentials, // Whether credentials are being sent
    responseType: request.responseType, // The response type
    body: request.serializeBody() // Serialize the body, all well and good since we are working on a clone
  })
}

export function deserializeRequest<T = unknown>(req: string): HttpRequest<T> {
  const request = JSON.parse(req);
  const headers = new HttpHeaders(request.headers);
  const params = new HttpParams(); // Probably some way to make this a one-liner, but alas, there are no good docs
  for(const parameter in request.params){
    request.params[parameter].forEach((paramValue: string) => params.append(parameter, paramValue));
  }
  return new HttpRequest(request.method, request.url, request.body, {
    headers,
    params,
    responseType: request.respnseType,
    withCredentials: request.withCredentials
  });
}
