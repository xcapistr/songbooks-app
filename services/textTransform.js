export default textTransform = text => {
  if (text.length) {
    const formatedText = text
      .split('\\n\\n')
      .join('[--]')
      .split('\\n')
      .join('[-]')
      .split('[')
      .join('|[')
      .split(']')
      .join(']|')
      .split(' ')
      .join(' |')
      .split('|')
    return formatedText.filter(s => s !== '')
  } else return []
}
