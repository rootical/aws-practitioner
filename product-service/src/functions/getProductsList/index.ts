export default {
  handler: `src/functions/handlers.getProductsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
      },
    },
  ],
};