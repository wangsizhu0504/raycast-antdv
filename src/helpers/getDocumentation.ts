import type { Markdown } from '../utils/parseMD'
import directories from '../document.json'

// import { getDocsDirectories } from './getDocsDirectories'
import { getFileMarkdown } from './getFileMarkdown'
import { getDocCategoryFiles } from './getDocCategoryFiles'

export interface Component {
  title: string
  icon: string
  site: string
  data: Markdown[]
}
export interface DocumentationSection {
  components: Component[]
  category: string
}

export const getDocumentation = async (): Promise<DocumentationSection[]> => {
  const documentation = await Promise.all(
    directories
      .sort((a, b) => a.order - b.order)
      .map(async (category) => {
        const components = await Promise.all(category.children
          .sort((a, b) => a.order - b.order)
          .map(async (cmp) => {
            const files = await getDocCategoryFiles(cmp.folder)
            const markdownData = await files.reduce<Promise<Markdown[]>>(async (acc, file) => {
              try {
                const markdown = await getFileMarkdown(`./${cmp.folder}/${file}`)

                return [...(await acc), markdown]
              } catch (error) {
                console.error(error)

                return await acc
              }
            }, Promise.resolve([]))
            return {
              title: cmp.title,
              icon: cmp.cover,
              site: cmp.site,
              data: markdownData,
            }
          }))

        return {
          components,
          category: category.title,
        }
      }),
  )

  return documentation
}
