import IntersectLoading from './src/components/intersectLoading'
import Loading from './src/components/loading'
import svgIcon from './src/components/svgIcon'
import drawer from './src/components/drawer'
import bottomSheet from './src/components/bottomSheet'
import pagination from './src/components/pagination'
import animate from './src/components/animate'
import tooltip from './src/components/tooltip'
import mapAreaImg from './src/components/mapAreaImg'

// tippy.js styles
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

// luban ui styles
import './src/styles/index.scss'

function install(Vue) {
  ;[
    mapAreaImg,
    tooltip,
    animate,
    pagination,
    bottomSheet,
    IntersectLoading,
    Loading,
    svgIcon,
    drawer,
  ].forEach((v) => {
    Vue.component(v.name, v)
  })
}

export default {
  install,
}
