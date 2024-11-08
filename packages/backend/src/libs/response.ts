export const success = (body: any) => {
    return buildResponse(200, body);
  };
  
  export const failure = (body: any) => {
    return buildResponse(500, body);
  };
  
  export const not_found = (body: any) => {
    return buildResponse(404, body);
  };
  
  const buildResponse = (statusCode: number, body: any) => ({
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": '*',
      // "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  });
  