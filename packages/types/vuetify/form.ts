/**
 * v-form 组件实例
 */
export interface IVFormInstance {
  validate: () => boolean
  reset: () => void
  resetValidation: () => void
}
