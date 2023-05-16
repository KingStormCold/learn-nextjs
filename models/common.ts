import { NextPage } from "next";
import { AppProps } from "next/app";
import type { ReactElement, ReactNode } from 'react';
import { EmotionCache } from '@emotion/react';

export interface LayoutProps {
    children: ReactNode
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    emotionCache?: EmotionCache;
}