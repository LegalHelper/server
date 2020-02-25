const width = window.innerWidth
const height = window.innerHeight

export const responsiveHeight = (h) => {
  return height*(h/100);
}

export const responsiveWidth = (w) => {
  return width*(w/100);
}
