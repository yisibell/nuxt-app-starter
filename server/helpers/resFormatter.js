module.exports = (data = {}, options = {}) => {
  const { code = 200, msg = 'ok' } = options

  return {
    code,
    data,
    msg,
  }
}
