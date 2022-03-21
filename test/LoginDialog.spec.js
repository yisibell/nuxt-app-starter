import { mount } from '@vue/test-utils'
import LoginDialog from '~/components/dialogs/LoginDialog'

describe('LoginDialog', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(LoginDialog)
    expect(wrapper.vm).toBeTruthy()
  })
})
