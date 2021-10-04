enum Colors {
  base = 'white',
  text = '#434449',
  gray = '#f1f2f7',
  gray10 = '#f1f1f4',
  gray20 = '#e4e5e9',
  gray80 = '#6f7077',
  indigo = '#3f51b5',
  indigoDarken10 = '#364495',
  indigoLighten80 = '#b7c1f8',
  yellow = '#ffc107',
  green = '#4caf50',
  danger = '#ef5350',
  orange = 'orange',
  blue = '#3498db',
}

enum Widths {
  small = 425,
  medium = 426,
  large = 1024,
  huge = 1025,
}

export const theme = {
  colors: {
    base: Colors.base,
    text: Colors.text,
    gray: Colors.gray,
    gray10: Colors.gray10,
    gray20: Colors.gray20,
    gray80: Colors.gray80,
    indigo: Colors.indigo,
    indigoDarken10: Colors.indigoDarken10,
    indigoLighten80: Colors.indigoLighten80,
    yellow: Colors.yellow,
    green: Colors.green,
    danger: Colors.danger,
    orange: Colors.orange,
    blue: Colors.blue,
  },
  breakpoints: {
    large: `@media (min-width: ${Widths.huge}px)`,
    medium: `@media (min-width: ${Widths.medium}px) and (max-width: ${Widths.large}px)'`,
    small: `@media (max-width: ${Widths.small}px)`,
  },
}
