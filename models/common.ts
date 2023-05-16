import { NextPage } from "next";
import { AppProps } from "next/app";
import type { ReactElement, ReactNode } from 'react';
import { EmotionCache } from '@emotion/react';

export interface LayoutProps {
    children: ReactElement
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    emotionCache?: EmotionCache;
}