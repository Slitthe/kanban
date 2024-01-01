import { PropsWithChildren } from 'react';
import { RootState, useAppSelector } from '../../store';
import * as classNames from 'classnames';

function ThemeWrapper({ children }: PropsWithChildren) {
    const themeMode = useAppSelector((state: RootState) => state.theme.mode);
    return <div className={classNames('h-full', themeMode)}>{children}</div>;
}

export default ThemeWrapper;
