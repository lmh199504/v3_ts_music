import {
	emojiMap,
	emojiUrl
} from './emojiMap'
interface Payload{
	msg: string
}
interface RenderDom{
	name: string
	text?: string
	src?: string
}
export function decodeText(payload: Payload): RenderDom[] {
	const renderDom: RenderDom[] = []
	// 文本消息
	let temp = payload.msg
	let left = -1
	let right = -1
	while (temp !== '') {
		left = temp.indexOf('[')
		right = temp.indexOf(']')
		switch (left) {
			case 0:
				if (right === -1) {
					renderDom.push({
						name: 'text',
						text: temp
					})
					temp = ''
				} else {
					const _emoji = temp.slice(0, right + 1)
					if (emojiMap[_emoji]) {
						renderDom.push({
							name: 'img',
							src: emojiUrl + emojiMap[_emoji]
						})
						temp = temp.substring(right + 1)
					} else {
						renderDom.push({
							name: 'text',
							text: '['
						})
						temp = temp.slice(1)
					}
				}
				break
			case -1:
				renderDom.push({
					name: 'text',
					text: temp
				})
				temp = ''
				break
			default:
				renderDom.push({
					name: 'text',
					text: temp.slice(0, left)
				})
				temp = temp.substring(left)
				break
		}
	}
	return renderDom
}
