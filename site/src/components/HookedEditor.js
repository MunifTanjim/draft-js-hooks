import { Editor } from '@draft-js-hooks/editor'
import { getHashtagHook } from '@draft-js-hooks/hashtag'
import { getStatsHook } from '@draft-js-hooks/stats'
import { EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

const EditorWrapper = styled(Box)`
  border: 1px solid #ddd;
  max-width: 520px;
  padding: 1em;
  min-height: 100px;
`

const Seperator = styled.hr`
  margin: 0.5em 0;
`

const Hashtag = styled.span`
  color: ${p => p.theme.colors.primary};
`

const StatsHook = getStatsHook()
const HashtagHook = getHashtagHook({
  Component: ({ decoratedText, offsetKey }) => (
    <Hashtag data-offset-key={offsetKey}>{decoratedText}</Hashtag>
  )
})

const hooks = [HashtagHook, StatsHook]

function HookedEditor() {
  const store = useRef(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onClick = useCallback(() => {
    store.current.getEditor().focus()
  }, [])

  const onChange = useCallback(editorState => {
    setEditorState(editorState)
  }, [])

  return (
    <EditorWrapper onClick={onClick} mx={'auto'}>
      {mounted ? (
        <Editor
          store={store}
          editorState={editorState}
          onChange={onChange}
          placeholder="Have something to write?"
          hooks={hooks}
        />
      ) : null}
      <Seperator />
      <StatsHook.Stats />
    </EditorWrapper>
  )
}

export default HookedEditor
