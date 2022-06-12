export function shortAddress(address) {
    const startOffset = 4
    const endOffset = 8
    
    return `${address.substring(0, startOffset)}***${address.substring(address.length - endOffset)}`
}