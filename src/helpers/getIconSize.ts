const getIconSize = (
  width: number,
  xs = 32,
  sm = 36,
  md = 40,
  lg = 45,
): number => {
  let iconSize = xs;

  if (width > 576) {
    iconSize = sm;
  }

  if (width > 768) {
    iconSize = md;
  }

  if (width > 1200) {
    iconSize = lg;
  }

  return iconSize;
};

export default getIconSize;
