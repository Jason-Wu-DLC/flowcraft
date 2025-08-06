// qiankun微前端类型声明
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
  }
}

// Fabric.js类型声明
declare module 'fabric' {
  export const fabric: any;
}

// Monaco Editor类型声明
declare module 'monaco-editor' {
  export * from 'monaco-editor/esm/vs/editor/editor.api';
}

export {}; 