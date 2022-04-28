import { App } from 'vue'
import { Button } from 'vant'
export default{
	install(app: App): void {
		app.use(Button)
	}
}
