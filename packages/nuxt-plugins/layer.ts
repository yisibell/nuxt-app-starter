import { defineNuxtPlugin } from '@nuxtjs/composition-api'

import swal from 'sweetalert2'
// import '@sweetalert2/theme-material-ui/material-ui.css'

export type SweetAlertInstance = ReturnType<typeof swal.mixin>
export type SweetAlertConfiguration = Parameters<typeof swal.mixin>
export type SweetAlertResult = ReturnType<typeof swal.fire>

export interface LayerConstructor {
  swalInstance: SweetAlertInstance
  loadingInstance: SweetAlertInstance

  /**
   * 确认提示框
   */
  confirm(text: string, opts?: SweetAlertConfiguration): SweetAlertResult

  /**
   * 显示加载框
   */
  showLoading(): void

  /**
   * 关闭加载框
   */
  closeLoading(): void
}

export class Layer implements LayerConstructor {
  swalInstance
  loadingInstance

  constructor() {
    this.swalInstance = swal.mixin({
      title: '',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      width: '26rem',
      reverseButtons: true,
    })

    this.loadingInstance = swal.mixin({
      showCancelButton: false,
      showConfirmButton: false,
      iconColor: 'transparent',
      background: 'transparent',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      iconHtml: `
        <div  class="lu-loading--wave">
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
        </div>
      `,
    })
  }

  confirm(text: string, opts?: SweetAlertConfiguration) {
    return this.swalInstance.fire({
      icon: 'question',
      showCancelButton: true,
      text,
      ...opts,
    })
  }

  showLoading() {
    this.loadingInstance.fire()
  }

  closeLoading() {
    this.loadingInstance.close()
  }
}

export const layer = new Layer()

export default defineNuxtPlugin((_ctx, inject) => {
  inject('layer', layer)
})
