export default {
  openapi: '3.0.0',
  info: {
    title: 'order',
    description: '',
    version: '1',
  },
  paths: {
    '/OrderService/createOrder': {
      post: {
        operationId: 'OrderService.createOrder',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/components/schemas/AddOrder',
          },
        },
        responses: {
          200: {
            description: '',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/Status',
                },
              },
            },
          },
        },
      },
    },
    '/OrderService/validateOrderId': {
      post: {
        operationId: 'OrderService.validateOrderId',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/components/schemas/orderId',
          },
        },
        responses: {
          200: {
            description: '',
            content: {
              '*/*': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Empty: {
        type: 'object',
        properties: {},
      },
      orderId: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
        },
      },
      AddProduct: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          orderedQty: {
            type: 'integer',
            format: 'int32',
          },
        },
      },
      AddOrder: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
          },
          products: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/AddProduct',
            },
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          productId: {
            type: 'string',
          },
          qty: {
            type: 'integer',
            format: 'int32',
          },
          price: {
            type: 'integer',
            format: 'int32',
          },
        },
      },
      Order: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          userId: {
            type: 'string',
          },
          products: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product',
            },
          },
          total: {
            type: 'integer',
            format: 'int32',
          },
        },
      },
      Status: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
          },
        },
      },
    },
  },
};
