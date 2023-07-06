import { Action, ActionPanel, Detail, Icon, List } from '@raycast/api'
import { MANTINE_URL } from '../constants'
import type { ComponentName } from '../types/ComponentName'
import type { Markdown } from '../utils/parseMD'
import { PropsDetail } from './details/PropsDetail'

interface Props {
  document: Markdown
}

export const DocumentActions = ({ document }: Props) => {
  const { content, metadata } = document

  const isCorePackage = metadata?.package === '@mantine/core'
  const elementLink = `${MANTINE_URL}/${metadata.slug}`

  return (
    <ActionPanel>
      <Action.Push
        title="Show Details"
        icon={{
          source: {
            light: 'icons/info-light.svg',
            dark: 'icons/info-dark.svg',
          },
        }}
        target={
          isCorePackage
            ? (
            <List
              isShowingDetail
              navigationTitle={metadata.title}
              actions={
                metadata.slug
                  ? (
                  <ActionPanel>
                    <Action.OpenInBrowser icon={Icon.Globe} url={`${MANTINE_URL}/${metadata.slug}`} />
                  </ActionPanel>
                    )
                  : null
              }
            >
              <List.Item
                icon={Icon.Dot}
                title="Docs"
                detail={<List.Item.Detail markdown={content} />}
                actions={
                  <ActionPanel>
                    <Action.Push
                      title="Open"
                      icon={Icon.List}
                      target={<Detail navigationTitle={metadata.title} markdown={content} />}
                    />
                    <Action.OpenInBrowser icon={Icon.Globe} url={elementLink} />
                  </ActionPanel>
                }
              />
              <List.Item
                icon={Icon.Dot}
                title="Props"
                detail={<PropsDetail component={metadata.title as ComponentName} />}
              />
            </List>
              )
            : (
            <Detail markdown={content} />
              )
        }
      />

    </ActionPanel>
  )
}
