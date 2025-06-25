declare module 'designer/DesignerApp' {
  import { ComponentType } from 'react';
  const DesignerApp: ComponentType;
  export default DesignerApp;
}

declare module 'shared/components' {
  export * from '@flowcraft/shared/components';
}

declare module 'shared/themes' {
  export * from '@flowcraft/shared/themes';
}

declare module 'shared/hooks' {
  export * from '@flowcraft/shared/hooks';
}