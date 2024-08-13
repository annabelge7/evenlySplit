import { useState } from 'react'
import { GroupContext } from './Context'

function ContextWrapper({ children }) {
  const [groupID, setGroupID] = useState(null)
  const [session, setSession] = useState(null)
  const [owner, setOwner] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [total, setTotal] = useState(null)
  const [numMembers, setNumMembers] = useState(null)

  return (
    <GroupContext.Provider
      value={{
        groupID,
        setGroupID,
        session,
        setSession,
        owner,
        setOwner,
        isOwner,
        setIsOwner,
        total,
        setTotal,
        numMembers,
        setNumMembers,
      }}
    >
      {children}
    </GroupContext.Provider>
  )
}

export default ContextWrapper
