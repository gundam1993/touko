// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    posts: Array<IPost> | null;
    post: IPost | null;
    user: IUser | null;
    introduction: IIntroduction | null;
  }

  interface IPostsOnQueryArguments {
    id?: number | null;
    display?: boolean | null;
  }

  interface IPostOnQueryArguments {
    id?: number | null;
  }

  interface IUserOnQueryArguments {
    username?: string | null;
  }

  interface IIntroductionOnQueryArguments {
    id: number;
  }

  interface IPost {
    __typename: 'Post';
    id: number;
    title: string | null;
    content: string | null;
    user: IUser | null;
    display: boolean | null;
    pv: number | null;
    created_at: string | null;
    updated_at: string | null;
  }

  interface IUser {
    __typename: 'User';
    id: number;
    username: string | null;
    password: string | null;
    token: string | null;

    /**
     * the list of Posts by this user
     */
    posts: Array<IPost> | null;
  }

  interface IIntroduction {
    __typename: 'Introduction';
    id: number;
    content: string | null;
    user: IUser | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    register: IUser | null;
    createToken: IUser | null;
    addPv: IPost | null;
  }

  interface IRegisterOnMutationArguments {
    username: string;
    password: string;
  }

  interface ICreateTokenOnMutationArguments {
    username: string;
    password: string;
  }

  interface IAddPvOnMutationArguments {
    postId: number;
  }
}

// tslint:enable
