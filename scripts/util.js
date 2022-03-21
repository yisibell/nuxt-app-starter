const fs = require('fs')
const path = require('path')

module.exports = {
  /**
   * 获取皮肤名列表
   * @param {string} targetDirName 目标文件夹名称
   * @returns {Array} 皮肤名称数组
   */
  getThemeDirNames(targetDirName = 'themes') {
    const basePath = path.join(process.cwd(), targetDirName)
    const arr = fs.readdirSync(basePath)
    const dirs = arr.filter((v) =>
      fs.statSync(`${basePath}/${v}`).isDirectory()
    )

    return dirs
  },
}
