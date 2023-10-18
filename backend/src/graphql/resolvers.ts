const resolvers = {
  Query: {
    async user(_: any, { id }: any) {
      return { id: "s", username: "sadas" };
    },
  },
  Mutation: {
    async deleteRecord(_: any, { id }: any, context: any) {
      return "42";
    },
  },
};

export default resolvers;
