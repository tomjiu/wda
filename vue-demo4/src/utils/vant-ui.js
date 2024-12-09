import Vue from 'vue'

import { Button, Rate } from 'vant' // 引入Button组件

import { Tabbar, TabbarItem,NavBar,Toast} from 'vant';
import { ActionSheet,Icon,Search, Swipe, SwipeItem, Grid, GridItem } from 'vant'
import {Dialog} from 'vant'
import {Checkbox} from 'vant'

import { Tab, Tabs } from 'vant'

Vue.use(Rate)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Icon)
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(Tabbar);
Vue.use(NavBar);
Vue.use(TabbarItem);
Vue.use(Toast);

Vue.use(Button) // 全局注册
