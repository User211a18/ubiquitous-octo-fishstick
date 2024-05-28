import { InputHTMLAttributes, ReactNode } from "react";

export interface HeadlingProps extends InputHTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}