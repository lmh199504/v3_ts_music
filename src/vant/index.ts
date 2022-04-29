import { App } from 'vue'
import { Button, Tabbar, TabbarItem, SwipeCell, Cell, Overlay, Popup, CellGroup } from 'vant'
export default {
	install(app: App): void {
		app.use(Button)
		app.use(Tabbar)
		app.use(TabbarItem)
		app.use(SwipeCell)
		app.use(Cell)
		app.use(Overlay)
		app.use(Popup)
		app.use(Cell)
		app.use(CellGroup)
	}
}
