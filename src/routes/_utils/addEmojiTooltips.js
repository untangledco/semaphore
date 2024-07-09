// TODO(otl): this a noop until we fix up callers of addEmojiTooltips
export async function addEmojiTooltips (domNode) {
  if (!domNode) {
    return
  }
  const emojis = domNode.querySelectorAll('.inline-emoji')
  if (emojis.length) {}
}
