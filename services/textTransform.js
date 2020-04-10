export default textTransform = text => {
  if (text.length) {
    const formatedText = text
      .split('[-][-]')
      .join('[--]')
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
