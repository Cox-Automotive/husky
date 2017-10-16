import del from 'del'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as tempy from 'tempy'
import index from '../'

describe('upgrade', () => {
  it('should run working command and return 0 status', () => {
    const dir = tempy.directory()
    const filename = path.join(dir, 'package.json')

    fs.writeFileSync(
      filename,
      JSON.stringify({
        scripts: {
          precommit: 'npm test'
        }
      })
    )

    index(dir)

    expect(JSON.parse(fs.readFileSync(filename, 'utf-8'))).toEqual({
      husky: {
        hooks: {
          'pre-commit': 'npm test'
        }
      }
    })
  })
})
