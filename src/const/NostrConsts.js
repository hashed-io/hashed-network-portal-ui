const EventKind = {
  METADATA: 0,
  NOTE: 1,
  RELAY: 2,
  CONTACT: 3,
  DM: 4,
  DELETE: 5,
  SHARE: 6,
  REACTION: 7,
  CHATROOM: 42
}

const TagType = {
  PUBKEY: 'p',
  EVENT: 'e'
}

export { EventKind, TagType }
