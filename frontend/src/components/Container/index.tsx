import { clsx } from "clsx";
import { FC, ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
  classNames?: string;
}

const Container: FC<IProps> = ({ children, classNames }) => {
  return (
    <div className={clsx("3xl:max-w-[1600px] 2xl:max-w-[1440px] xl:max-w-[1200px]  w-full mx-auto px-4 lg:w-[95vw] xl:w-full", classNames ?? "")}>
      {children}
    </div>
  );
};

export default Container;

const ContainerCartStyled = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-right: 16px;
  padding-left: 16px;
`;

export const ContainerCart: FC<IProps> = ({ children, classNames }) => {
  return <ContainerCartStyled className={classNames ?? ""}>{children}</ContainerCartStyled>;
};
