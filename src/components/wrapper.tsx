import { ReactElement, ReactNode } from "react";

type WrapperPropsType = {
  children: ReactNode | ReactElement
}

const Wrapper = ({ children }: WrapperPropsType) => children;

export default Wrapper;