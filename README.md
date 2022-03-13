# grapevine

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![CodeQL](https://github.com/andrmaz/grapevine/actions/workflows/codeql-analysis.yml/badge.svg)
[![Build and Test](https://github.com/andrmaz/grapevine/actions/workflows/build-and-test.yml/badge.svg?event=status)](https://github.com/andrmaz/grapevine/actions/workflows/build-and-test.yml)

Web-based marketing software application

## Design tokens

### Spacing

This app uses an 8px unit. All spaces are a multiple of 8px:

- `8px`
- `16px`
- `24px`
- `32px`
- `48px`
- `64px`
- `96px`
- `128px`

When it comes to max widths, arbitrary values can be used.

### Font

For font sizes, the `rem` unit should be used.

The scale is:

- `1rem`
- `1.25rem`
- `1.5rem`
- `2rem`

Because the base font size is 16px, this works out in pixels to:

- `16px`
- `20px`
- `24px`
- `32px`

### Responsiveness

***Devices*** :<br>
This app uses a desktop first approach by picking a series of breakpoints.  
A breakpoint is a specific viewport width that lets us segment all devices into a small set of possible experiences.  
Any device under the specified breakpoint will be put in the same bucket, and can be styled separately.
    
***Colors*** :<br>
By default we use a light mode first approach.<br>
To detect if the user has requested dark color theme use media queries as follows :<br>
`@media (prefers-color-scheme: dark)`
    
***Animations*** :<br>
Start without animations, and enable them if the user wishes.<br>
By switching it up so that the transition is set from within a media query, we ensure that the animation is disabled by default for users on browsers/devices that don't support this property.<br>
`@media (prefers-reduced-motion: no-preference)`
