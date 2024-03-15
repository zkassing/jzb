import { useState } from "react"
import { Keyboard } from "zarm"
function PriceKeyboard ({initData, onClick, onConfirm}) {
  const [value, setValue] = useState(initData || '0')

  const keyClickHandler = (key) => {
    if (key === 'ok') {
      // 点击了确定
      onConfirm && onConfirm()
      return 
    }

    if (key === 'delete') {
      let _value = value.slice(0, -1)
      if (!_value.length) {
        _value = '0'
      }
      // 点击了删除
      setValue(_value)
      onClick && onClick(_value)
      return 

    }

    if (key === 'close') {
      // 点击了隐藏

      return 
    }
    let _value = ''

    if (value === '0' && key !== '.') {
      _value = key
    } else {
      _value = value + key
    }

    
    // 把字符拼接
    setValue(_value)
    onClick && onClick(_value)
  }

  return (
    <Keyboard type="price" onKeyClick={keyClickHandler} ></Keyboard>
  )
}

export default PriceKeyboard