/** 全站渐变色规范
 *
 * GRADIENT_TEXT  — 字号 >= clamp(2rem, 5vw, 3.2rem) 的大标题
 * GRADIENT_BTN   — 所有可点击按钮的背景
 *
 * 用法：
 *  import { GRADIENT_TEXT, GRADIENT_BTN } from '../constants/styles'
 *  <h2 style={{ ...GRADIENT_TEXT, fontSize: '...' }}>标题</h2>
 *  <button style={{ ...GRADIENT_BTN, color: '#fff' }}>按钮</button>
 */

const GRADIENT_TITLE = 'linear-gradient(135deg, #323360 0%, #2F307E 50%, #5556C4 100%)'
const GRADIENT_BUTTON = 'linear-gradient(135deg, #4A4BB4 0%, #6668CB 50%, #8979DA 100%)'

export const GRADIENT_TEXT = {
  background: GRADIENT_TITLE,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export const GRADIENT_BG = {
  background: GRADIENT_TITLE,
}

export const GRADIENT_BTN = {
  background: GRADIENT_BUTTON,
}
