import { createContext } from 'react'

export const GroupContext = createContext({
  groupID: null,
  setGroupID: () => {},

  session: null,
  setSession: () => {},

  owner: null,
  setOwner: () => {},

  isOwner: false,
  setIsOwner: () => {},

  total: null,
  setTotal: () => {},

  numMembers: null,
  setNumMembers: () => {},
})
