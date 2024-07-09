export function getAccountAccessibleName (account, omitEmojiInDisplayNames) {
  const emojis = account.emojis
  let displayName = account.display_name || account.username
  return displayName
}
