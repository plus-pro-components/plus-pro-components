import path from 'path'
import fs from 'fs'
import { exec } from 'child_process'
import qs from 'qs'
import days from 'dayjs'
import { cloneDeep } from 'lodash'

type Tag = {
  tag: string
  id: string
  author: string
  date: string
  sha: string
  pre: Tag
}

type Log = {
  id: string
  author: string
  date: string
  sha: string
  desc: string
  reg: string
  content: string
  type: string
  scoped: string
}

const execPromise = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (!stdout || err) {
        reject()
        return
      } else {
        resolve(stdout)
      }
    })
  })
}

const handleLogData = async (): Promise<Log[]> => {
  const log = await execPromise(
    'git log --pretty=format:"id=%H&author=%an&date=%ad&sha=%h&desc=%s"     --date=format:"%Y/%m/%d %H:%M:%S" \n'
  )
  const reg = /^(\w+)(\(?([a-z-_]*)\)?):/
  const temp = log.split('\n')
  const logData = temp
    .filter(item => item)
    .map(item => {
      const info = qs.parse(item) as {
        desc: string
      }
      const regInfo = reg.exec(info.desc)
      const content = regInfo ? info.desc.replace(regInfo[0], '') : info.desc
      const type = regInfo ? regInfo[1] : ''
      const scoped = regInfo ? regInfo[3] : ''
      const newItem = { ...info, reg: regInfo, content: content, type, scoped }
      return newItem
    })

  return logData as unknown as Log[]
}
const handleTagData = async (): Promise<Tag[]> => {
  const tagStr = await execPromise('git tag')
  const tags = [...tagStr.split('\n')].filter(item => item).map(item => ({ tag: item }))
  let tagData: Tag[] = []
  for (const item of tags) {
    const data = await execPromise(
      `git show ${item.tag} -q --pretty=format:"$id=%H&author=%an&date=%ad&sha=%h$"     --date=format:"%Y/%m/%d %H:%M:%S"`
    )
    const temp = data.slice(data.indexOf('$') + 1, data.lastIndexOf('$'))
    const tag = qs.parse(temp)
    tagData.push({ ...item, ...tag } as any)
  }
  tagData = tagData
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((item, index, array) => ({
      ...item,
      pre: array[index + 1]
    }))
  return tagData
}

const main = async () => {
  const target = (await execPromise('git remote get-url --all origin'))
    .replace('.git', '/')
    .replace('\n', '')

  const replacePull = (content: string) => {
    return content.replace(
      /pull request (#(\d+))/,
      (_, data, number) => `pull request [${data}](${target}pull/${number})`
    )
  }

  const logs = await handleLogData()
  const tags = await handleTagData()
  const res = tags.map(item => {
    const start = logs.findIndex(i => i.id === item.id)
    const end = logs.findIndex(i => i.id === item.pre?.id)
    const data = cloneDeep(logs).slice(start, end === -1 ? logs.length : end)
    return {
      ...item,
      content: data
    }
  })

  const mdContent = res.map(item => {
    let md = ''
    if (!item.pre?.tag) {
      md = `## [${item.tag}](${target}commit/${item.sha}) (${days(item.date).format('YYYY-MM-DD')})`
    } else {
      md = `## [${item.tag}](${target}compare/${item.pre?.tag}...${item.tag}) (${days(
        item.date
      ).format('YYYY-MM-DD')})`
    }

    const featData = item.content
      .filter(item => item.type === 'feat' || item.content.includes('Merge'))
      .map(
        item =>
          `* **${item.scoped || 'all'}:**${
            item.content.includes('Merge') ? ' ' + replacePull(item.content) : item.content
          }([${item.sha}](${target}commit/${item.sha})) by@${item.author}\n`
      )

    const fixData = item.content
      .filter(item => item.type === 'fix')
      .map(
        item =>
          `* **${item.scoped || 'all'}:**${item.content}([${item.sha}](${target}commit/${
            item.sha
          })) by@${item.author}\n`
      )
    const refactorData = item.content
      .filter(item => item.type === 'refactor')
      .map(
        item =>
          `* **${item.scoped || 'all'}:**${item.content}([${item.sha}](${target}commit/${
            item.sha
          })) by@${item.author}\n`
      )

    const content =
      md +
      '\n\n\n' +
      (featData.length ? `### ✨ Features\n\n${featData.join('')}` : '') +
      '\n\n' +
      (fixData.length ? `### 🐛 Bug Fixes\n\n${fixData.join('')}` : '') +
      '\n\n' +
      (refactorData.length ? `### ♻️ Code Refactoring\n\n${refactorData.join('')}` : '') +
      '\n\n'

    return content
  })
  fs.writeFileSync(path.resolve(__dirname, '../../CHANGELOG.md'), mdContent.join(''))
}

main().catch(err => {
  console.log(err)
})
