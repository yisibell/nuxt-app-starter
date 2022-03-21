import { runModule } from './module'

const LubanPWAModule = function (moduleOptions) {
  const moduleObject = this
  runModule(moduleObject, moduleOptions)
}

export default LubanPWAModule
