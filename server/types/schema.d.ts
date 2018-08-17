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
    user: IUser | null;
    posts: Array<IPost> | null;
    post: IPost | null;
    introduction: IIntroduction | null;
  }

  interface IUserOnQueryArguments {
    username?: string | null;
  }

  interface IPostsOnQueryArguments {
    id?: number | null;
    display?: boolean | null;
  }

  interface IPostOnQueryArguments {
    id?: number | null;
  }

  interface IIntroductionOnQueryArguments {
    id: number;
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

  interface IIntroduction {
    __typename: 'Introduction';
    id: number;
    content: string | null;
    user: IUser | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    login: IUser | null;
    createToken: IUser | null;
    addPv: IPost | null;
    register: Array<IError>;
  }

  interface ILoginOnMutationArguments {
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

  interface IRegisterOnMutationArguments {
    username: string;
    password: string;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }
}

// tslint:enable
