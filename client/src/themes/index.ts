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

enum Devices {
  mobile = 426,
  tablet = 768,
  laptop = 1024,
}

enum Heights {
  header = 62,
}

enum Widths {
  header = 768,
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
    small: `@media (max-width: ${Devices.mobile}px)`,
    medium: `@media (max-width: ${Devices.tablet}px)`,
    large: `@media (max-width: ${Devices.laptop}px)`,
  },
  sizes: {
    header: {height: Heights.header, width: Widths.header},
  },
}
