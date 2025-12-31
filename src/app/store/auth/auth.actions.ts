export namespace AuthActions {
  const type = (action: string) => `[Auth] ${action}`;

  export class Login {
    static readonly type = type('Login');
    constructor(public payload: string) {}
  }

  export class UpdateToken {
    static readonly type = type('UpdateToken');
    constructor(public payload: string) {}
  }

  export class Logout {
    static readonly type = type('Logout');
  }
}
