export default {
    handler: `src/functions/handlers.createProduct`,
    events: [
        {
            http: {
                method: "post",
                path: "products",
                cors: true,
                request: {
                    schemas: {
                        "application/json": {
                            schema: {
                                definitions: {},
                                $schema: "http://json-schema.org/draft-04/schema#",
                                type: "object",
                                title: "The Root Schema",
                                required: ["title", "description", "price"],
                                properties: {
                                    title: {
                                        type: "string",
                                        title: "product title",
                                        default: "",
                                    },
                                    description: {
                                        type: "string",
                                        title: "product title",
                                        default: "",
                                    },
                                    price: {
                                        type: 'number',
                                        title: 'product price',
                                    },
                                    count: {
                                        type: 'number',
                                        title: 'product stock count',
                                        default: 0,
                                    }
                                },
                            },
                            name: "PostCreateProduct",
                            description: "Validation model for creating Products",
                        },
                    },
                },
            },
        },
    ],
};