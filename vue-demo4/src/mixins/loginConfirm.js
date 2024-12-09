export  default {
    //此处编写的是vue组件实例的 配置项 通过导入 可以混入到组件内部 
    // data methods computed 生命周期函数 。。
    // 注意 如果此处和组件内 提供同名的data methods 组件内优先度更高
    // 编写生命周期函数时候 会把两个函数统一用数组管理起来 统一执行
    methods: {
        // 是否需要弹登录确认框
        // (1) 需要，返回 true，并直接弹出登录确认框
        // (2) 不需要，返回 false
        loginConfirm () {
          if (!this.$store.getters.token) {
            this.$dialog.confirm({
              title: '温馨提示',
              message: '此时需要先登录才能继续操作哦',
              confirmButtonText: '去登陆',
              cancelButtonText: '再逛逛'
            })
              .then(() => {
                // 如果希望，跳转到登录 => 登录后能回跳回来，需要在跳转去携带参数 (当前的路径地址)
                // this.$route.fullPath (会包含查询参数)
                this.$router.replace({
                  path: '/login',
                  query: {
                    backUrl: this.$route.fullPath
                  }
                })
              })
              .catch(() => {})
            return true
          }
          return false
        }
    }

}