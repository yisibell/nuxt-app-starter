import { runModule } from './module'

const moduleInitialization = function (moduleOptions) {
  const moduleObject = this
  runModule(moduleObject, moduleOptions)
}

export default moduleInitialization
