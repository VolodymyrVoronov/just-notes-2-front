const getIconSize = (width: number): number => {
  let iconSize = 32;

  if (width > 576) {
    iconSize = 36;
  }

  if (width > 768) {
    iconSize = 40;
  }

  if (width > 1200) {
    iconSize = 45;
  }

  return iconSize;
};

export default getIconSize;
