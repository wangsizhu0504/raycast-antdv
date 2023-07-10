import { List, Toast, showToast } from '@raycast/api'
import { useEffect, useState } from 'react'
import { DocumentsList } from './components/DocumentsList'
import type { DocumentationSection } from './helpers/getDocumentation'
import { getDocumentation } from './helpers/getDocumentation'
import { uppercaseFirst } from './utils/uppercaseFirst'

export default function Command() {
  const [status, setStatus] = useState<'loading' | 'error' | 'initial' | 'ready'>('initial')
  const [documentation, setDocumentation] = useState<DocumentationSection[]>([])

  const getDocs = async () => {
    setStatus('loading')

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: 'Loading documentation',
    })

    try {
      const docs = await getDocumentation()
      setDocumentation(docs)

      toast.style = Toast.Style.Success
      toast.title = 'Documentation loaded'
      setStatus('ready')
    } catch (error) {
      console.error(error)

      toast.style = Toast.Style.Failure
      toast.title = 'Failed to upload image'

      // @ts-expect-error - TS complain about the typing
      toast.message = error.message
      setStatus('error')
    }
  }

  useEffect(() => {
    getDocs()
  }, [])
  return (
    <>
      <List isLoading={documentation === undefined || status === 'loading'}>
        {documentation && documentation?.length > 0
          ? (
          <>
            {documentation.map(({ category, components }) => (
              <List.Section key={category} title={uppercaseFirst(category)}>
                <DocumentsList components={components} />
              </List.Section>
            ))}
          </>
            )
          : (
          <List.EmptyView title="Loading Ant Design Vue " description="wait until documentation will load" icon="logo.png" />
            )}
      </List>
    </>
  )
}
