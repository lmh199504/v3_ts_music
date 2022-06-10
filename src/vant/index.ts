import { App } from 'vue'
import {
	Button, 
	Tabbar, 
	TabbarItem, 
	SwipeCell, 
	Cell, 
	Overlay, 
	Popup, 
	CellGroup, 
	Swipe, 
	SwipeItem, 
	Sticky, 
	Divider, 
	NavBar, 
	Form, 
	Field, 
	Tab,
	Tabs,
	PullRefresh,
	Icon,
	Switch,
	Slider,
	Lazyload,
	NoticeBar,
	Col,
	Row,
	List,
	DropdownMenu,
	DropdownItem,
	ShareSheet,
	Checkbox,
	CheckboxGroup,
	RadioGroup,
	Radio,
	Uploader
} from 'vant'
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
		app.use(NavBar)
		app.use(Form)
		app.use(Field)
		app.use(Tab)
		app.use(Tabs)
		app.use(PullRefresh)
		app.use(Icon)
		app.use(Switch)
		app.use(Slider)
		app.use(Lazyload)
		app.use(NoticeBar)
		app.use(Col)
		app.use(Row)
		app.use(List)
		app.use(DropdownMenu)
		app.use(DropdownItem)
		app.use(ShareSheet)
		app.use(Checkbox)
		app.use(CheckboxGroup)
		app.use(RadioGroup)
		app.use(Radio)
		app.use(Uploader)
	}
}
