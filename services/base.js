class Service {
  getBatchDatas({ datas, offset, size }) {
    offset = Number(offset)
    size = Number(size)

    if (isNaN(offset)) {
      offset = 0
    }

    if (isNaN(size) || size === 0) {
      size = 10
    }

    const total = datas.length
    if (offset > total) {
      offset = total
    }
    let len = offset + size
    len = len > total ? total : len
    const results = {
      total: total,
      offset: offset,
      size: len - offset,
      datas: datas.slice(offset, len),
    }
    return results
  }
}

module.exports = Service
