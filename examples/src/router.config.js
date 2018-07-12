const registerRoute = (navConfig, isMobile) => {
  let route = []
  // 目前只有中文版的文档
  let navs = navConfig['zh-CN']
  // 遍历路由文件，逐一进行路由注册
  navs.forEach(nav => {
    if (isMobile && !nav.showInMobile) {
      return
    }

    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav)
        })
      })
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })
  // 进行路由注册
  function addRoute (page) {
    // 不同的设备环境引入对应的路由文件
    console.log(`../pages${page.path}.vue`)
    const component = isMobile ? require(`../pages${page.path}.vue`): require(`../docs${page.path}.md`)
    console.log(component)
    route.push({
      path: '/component' + page.path,
      component: component.default || component 
    })
  }

  return route
}

export default registerRoute

