import * as React from 'react';
import {colors, BrandingColor, CanvasColor} from '@workday/canvas-kit-react/tokens';
import {CanvasAppletIcon, CanvasIconTypes} from '@workday/design-assets-types';
import {CSSObject} from '@emotion/styled';
import Icon, {IconProps} from './Icon';
import {createComponent} from '@workday/canvas-kit-react/common';

export interface AppletIconStyles {
  /**
   * The icon color hue. Must use a member of the `AppletIcon.Colors` static enum.
   * @default AppletIcon.Colors.Blueberry
   */
  color?: BrandingColor;
}

export const appletIconStyles = ({
  color = BrandingColor.Blueberry,
}: AppletIconStyles): CSSObject => {
  // Check if valid color
  if (
    !(Object.keys(BrandingColor) as (keyof typeof BrandingColor)[])
      .map(color => BrandingColor[color])
      .includes(color)
  ) {
    throw Error(`Color "${color}" not found`);
  }

  const colorNames: {[key: number]: CanvasColor} = {
    100: `${color}100` as CanvasColor,
    200: `${color}200` as CanvasColor,
    300: `${color}300` as CanvasColor,
    400: `${color}400` as CanvasColor,
    500: `${color}500` as CanvasColor,
  };

  return {
    '& .color-100': {
      fill: colors.frenchVanilla100,
    },
    '& .color-200': {
      fill: colors[colorNames[200]],
    },
    '& .color-300': {
      fill: colors[colorNames[300]],
    },
    '& .color-400': {
      fill: colors[colorNames[400]],
    },
    '& .color-400-alpha-20': {
      fill: colors[colorNames[400]],
    },
    '& .color-500': {
      fill: colors[colorNames[500]],
    },
  };
};

export interface AppletIconProps extends AppletIconStyles, Pick<IconProps, 'shouldMirror'> {
  /**
   * The icon to display from `@workday/canvas-applet-icons-web`.
   */
  icon: CanvasAppletIcon;
  /**
   * The size of the AppletIcon in `px`.
   * @default 92
   */
  size?: number;
}

export const AppletIcon = createComponent('span')({
  displayName: 'AppletIcon',
  Component: (
    {size = 92, icon, color, shouldMirror, ...elemProps}: AppletIconProps,
    ref,
    Element
  ) => {
    return (
      <Icon
        src={icon}
        type={CanvasIconTypes.Applet}
        styles={appletIconStyles({color})}
        as={Element}
        size={size}
        ref={ref}
        shouldMirror={shouldMirror}
        {...elemProps}
      />
    );
  },
  subComponents: {
    Colors: BrandingColor,
  },
});

export default AppletIcon;
