import * as React from 'react';
import { RefObject } from 'react';

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(name: string, params: any): void {
  navigationRef.current?.navigate(name, params);
}