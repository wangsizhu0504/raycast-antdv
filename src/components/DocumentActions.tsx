import { Action, ActionPanel, Detail, Icon, List } from '@raycast/api'
import { SITE_URL } from '../constants'

import type { Component } from '../helpers/getDocumentation'

interface Props {
  cmp: Component
}

export const DocumentActions = ({ cmp }: Props) => {
  const elementLink = `${SITE_URL}/${cmp.url}`
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
              cmp.url
                ? (
                  <ActionPanel>
                    <Action.OpenInBrowser icon={Icon.Globe} url={`${SITE_URL}/${cmp.url}`} />
                  </ActionPanel>
                  )
                : null
            }
          >
            {cmp.data.map((md) => {
              return <List.Item
                icon={Icon.Dot}
                title={md.metadata?.title || 'Untitled'}
                detail={<List.Item.Detail markdown={md.content} />}
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
