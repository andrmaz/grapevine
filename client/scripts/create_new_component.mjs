import fs from 'fs'
;
(function create() {
  try {
    const name = process.argv[2]
    const path = `src/components/${name}`
    fs.mkdirSync(path)
    const file = `src/components/${name}/index.tsx`
    name.split(1)
    const component = name.charAt(0).toUpperCase() + name.slice(1)
    const data = `import * as React from 'react';import styled from '@emotion/styled';const ${component} = () : JSX.Element => {return(<div></div>)};export default ${component}`
    fs.writeFileSync(file, data)
    console.log(
      '\x1b[33m%s\x1b[0m',
      `Successfully created the ${component} component at ${file} !`
    )
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
