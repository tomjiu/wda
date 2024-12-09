import {getCartList} from '@/api/cart'
import {changeCount} from  '@/api/cart'
import {Toast} from 'vant'
import {delSelect} from '@/api/cart'

export default {
    namespaced: true,
    state () {
      return {
        cartList: []
      }
    },
    mutations: {
        //提供一个设置cartList的mutation
        setCartList (state, newList) {
            state.cartList = newList
          },
          ToggleCheck(state,goodsId){
            // 让对应的id的状态取反
            const goods=state.cartList.find(item=>item.goods_id ===goodsId)
            goods.isChecked=!goods.isChecked
          },
          toggleAllCheck (state, flag) {
            state.cartList.forEach(item => {
              item.isChecked = flag
            })
          },
          changeCount (state, { goodsId, value }) {
            const obj = state.cartList.find(item => item.goods_id === goodsId)
            obj.goods_num = value
          },
      
    },
    actions: {
        async getCartAction (context) {
            const { data } = await getCartList()
            //数据没有复选框的选中状态 为了实现 需要手动维护
            data.list.forEach(item => {
              item.isChecked = true
            })
            context.commit('setCartList', data.list)
          },
        async changeCountAction (context, obj) {
            const { goodsId, value, skuId } = obj
            //先本地修改
            context.commit('changeCount', {
              goodsId,
              value
            })
            //再同步到后台
            await changeCount(goodsId, value, skuId)
          },
           // 删除购物车数据
        async delSelect (context) {
        const selCartList = context.getters.selCartList
        const cartIds = selCartList.map(item => item.id)
        await delSelect(cartIds)
        Toast('删除成功')
  
        // 重新拉取最新的购物车数据 (重新渲染)
        context.dispatch('getCartAction')
      }
       },



    getters: {

        // 求所有的商品累加总数
        cartTotal (state) {
            return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
          },

          //选中的商品项
          selCartList (state) {
            return state.cartList.filter(item => item.isChecked)
          },

          //选中的总数
          selCount (state, getters) {
            return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
          },

          //选中的总价
          selPrice (state, getters) {
            return getters.selCartList.reduce((sum, item) => {
              return sum + item.goods_num * item.goods.goods_price_min
            }, 0).toFixed(2)
          },

          //是否全选
          isAllChecked (state)
          {
            return state.cartList.every(item => item.isChecked)
          }
    }
  }