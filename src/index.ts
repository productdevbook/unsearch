export function handler(_event: any, _context: any, callback: any) {
  // eslint-disable-next-line no-console
  console.log('Hello World')
  callback(null, {
    statusCode: 200,
    body: 'Hello World',
  })
}
