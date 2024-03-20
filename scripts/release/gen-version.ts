import { writeFile } from 'fs/promises'

import path from 'path'
import consola from 'consola'
import { pcRoot } from '../utils/paths'

export async function genVersion(version?: string) {
  if (version) {
    consola.info(`Version: ${version}`)
    await writeFile(path.resolve(pcRoot, 'version.ts'), `export const version = '${version}'\n`)
  }
}
