declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    user_id: string;
    avatarFilename: string;
  }
}
