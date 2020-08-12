/// <reference types="react-scripts" />
declare interface Window {
  less: {
    modifyVars: (arg: any) => Promise<any>;
  };
}
