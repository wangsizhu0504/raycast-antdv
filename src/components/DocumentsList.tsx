import { Icon, List } from '@raycast/api'
import type { Component } from '../helpers/getDocumentation'
import { DocumentActions } from './DocumentActions'

interface Props {
  components: Component[]
}

export const DocumentsList = ({ components }: Props) => (
  <>
    {components.map(cmp => (
      <List.Item
        icon={`icons/${cmp.icon}` || Icon.CircleProgress100}
        key={cmp?.title || 'Untitled'}
        title={cmp?.title || 'Untitled'}
        actions={<DocumentActions cmp={cmp} />}
      />
    ))}
  </>
)
