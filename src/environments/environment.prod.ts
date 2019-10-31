export const environment = {
  production: true,
  url: {
    server: 'http://localhost',
    socket: 'http://localhost',
  },
  port: {
    server: 3000,
    socket: 3001
  },
  makeURL: (url: string, port: number) => {
    return `${url}:${port}`;
  }
};
