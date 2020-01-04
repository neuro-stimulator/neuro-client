import { SERVER_HTTP_PORT, SERVER_SOCKET_PORT } from 'diplomka-share';

export const environment = {
  production: false,
  url: {
    server: '',
    socket: '',
  },
  port: {
    server: SERVER_HTTP_PORT,
    socket: SERVER_SOCKET_PORT
  },
  makeURL: (url: string, port: number) => {
    // return `${url}:${port}`;
    return '';
  },
  maxOutputCount: 8,
  patternSize: 32
};
