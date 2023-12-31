import fs from 'node:fs'
import path from 'node:path'

export const readFile = async (file: string) =>
  await new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, file), 'utf-8', (err: any, data: any) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
