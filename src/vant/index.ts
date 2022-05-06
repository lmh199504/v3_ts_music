import { App } from 'vue'
import { Button, Tabbar, TabbarItem, SwipeCell, Cell, Overlay, Popup, CellGroup, Swipe, SwipeItem, Sticky, Divider } from 'vant'
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
		app.use(Swipe)
		app.use(SwipeItem)
		app.use(Sticky)
		app.use(Divider)
	}
}
