import type { CSSProperties } from "react";

type LogoSizeVars = CSSProperties & {
  "--logo-w": string;
  "--logo-w-sm": string;
  "--logo-h": string;
  "--logo-h-sm": string;
};

const REM_SPACING_UNIT = 0.25;

function parseTailwindSizeToken(token: string): string {
  const value = Number(token);

  if (Number.isFinite(value)) {
    return `${value * REM_SPACING_UNIT}rem`;
  }

  return token;
}

function matchValue(className: string | undefined, pattern: RegExp): string | undefined {
  const match = className?.match(pattern);

  return match?.[1];
}

function getResponsiveSize(
  className: string | undefined,
  arbitraryPattern: RegExp,
  scalePattern: RegExp,
  fallback: string,
): string {
  const arbitraryValue = matchValue(className, arbitraryPattern);

  if (arbitraryValue) {
    return arbitraryValue;
  }

  const scaleValue = matchValue(className, scalePattern);

  if (scaleValue) {
    return parseTailwindSizeToken(scaleValue);
  }

  return fallback;
}

export function getLogoSizeVars(
  className: string | undefined,
  defaults: {
    width: string;
    widthSm: string;
    height: string;
    heightSm: string;
  },
): LogoSizeVars {
  const width = getResponsiveSize(
    className,
    /(?:^|\s)w-\[([^\]]+)\]/,
    /(?:^|\s)w-([0-9.]+)/,
    defaults.width,
  );
  const widthSm = getResponsiveSize(
    className,
    /(?:^|\s)sm:w-\[([^\]]+)\]/,
    /(?:^|\s)sm:w-([0-9.]+)/,
    defaults.widthSm,
  );
  const height = getResponsiveSize(
    className,
    /(?:^|\s)h-\[([^\]]+)\]/,
    /(?:^|\s)h-([0-9.]+)/,
    defaults.height,
  );
  const heightSm = getResponsiveSize(
    className,
    /(?:^|\s)sm:h-\[([^\]]+)\]/,
    /(?:^|\s)sm:h-([0-9.]+)/,
    defaults.heightSm,
  );

  return {
    "--logo-w": width,
    "--logo-w-sm": widthSm,
    "--logo-h": height,
    "--logo-h-sm": heightSm,
  };
}
