export default {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: {
          type: 'string',
          description: 'Nome do usuário',
          minLength: 3,
        },
        email: {
          type: 'string',
          description: 'Email do usuário',
          format: 'email',
        },
      },
    },
  },
} as const;
