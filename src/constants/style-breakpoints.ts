const sizes = {
  mobile: '0px',
  tablet: '768px',
  desktop: '1028px',
};

export const devices = {
  mobile: `(min-width: ${sizes.mobile}) and (max-width: ${sizes.tablet})`,
  tablet: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.desktop})`,
  desktop: `(min-width: ${sizes.desktop})`,
};
