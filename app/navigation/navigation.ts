import * as React from "react";
import { RefObject } from "react";
import { CommonActions } from "@react-navigation/native";

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(name: string, params: any): void {
  navigationRef.current?.navigate(name, params);
}

export function goBack(): void {
  navigationRef.current?.dispatch(CommonActions.goBack());
}
