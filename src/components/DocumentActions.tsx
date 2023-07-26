import { Action, ActionPanel, Detail, Icon, List } from '@raycast/api'
import { SITE_URL } from '../constants'
import { componentMap } from '../props'
import type { Component } from '../helpers/getDocumentation'
import type { Markdown } from '../utils/parseMD'

interface Props {
  cmp: Component
}

export const DocumentActions = ({ cmp }: Props) => {
  const elementLink = `${SITE_URL}/${cmp.site}`
  const bindDetailProps = (md: Markdown) => {
    const currentCmp = componentMap.get(cmp.title)
    if (currentCmp) {
      const attr = currentCmp[md.metadata.attr]
      let metadata = null
      if (attr) {
        metadata = (
          <List.Item.Detail.Metadata>
            {Object.keys(attr).map((item: string) => {
              return <List.Item.Detail.Metadata.Label title={item} text={attr[item].description} />
            })}
          </List.Item.Detail.Metadata>
        )
      }

      return { metadata }
    } else {
      return { markdown: md.content }
    }
  }
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
          <List
            isShowingDetail
            navigationTitle={cmp.title}
            actions={
              cmp.site
                ? (
                  <ActionPanel>
                    <Action.OpenInBrowser icon={Icon.Globe} url={`${SITE_URL}/${cmp.site}`} />
                  </ActionPanel>
                  )
                : null
            }
          >
            {cmp.data.map((md) => {
              return <List.Item
                icon={Icon.Dot}
                title={md.metadata?.title || 'Untitled'}
                detail={
                  <List.Item.Detail {...bindDetailProps(md)} />
                }
                actions={
                  <ActionPanel>
                    <Action.Push
                      title="Open"
                      icon={Icon.List}
                      target={<Detail navigationTitle={md.metadata.title} markdown={md.content} />}
                    />
                    <Action.OpenInBrowser icon={Icon.Globe} url={`${SITE_URL}/${md.metadata.url}`} />
                  </ActionPanel>
                }
              />
            })}

          </List>
          // <Detail markdown={content} />
        }
      />
      <Action.OpenInBrowser icon={Icon.Globe} url={elementLink} />
    </ActionPanel>
  )
}
