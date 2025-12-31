export namespace AppActions {
  const type = (action: string) => `[App] ${action}`;

  export class CollapseMenu {
    static readonly type = type('Collapse Menu');
    constructor() {}
  }

  export class ExpandMenu {
    static readonly type = type('Expand Menu');
    constructor() {}
  }
}
