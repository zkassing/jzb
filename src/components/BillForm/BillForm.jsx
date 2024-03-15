import { Radio } from 'zarm';
import s from './BillForm.module.scss'
import TypeList from '../TypeList/TypeList';
import PriceKeyboard from './PriceKeyboard';
import { useEffect } from 'react';
import { GET_TYPELIST } from '../../api/bill';
import { useState } from 'react';
import { DatePicker } from 'zarm';
import moment from 'moment';


function BillForm({initData, onConfirm}) {

  const [formData, setFormData] = useState(initData)
  // 声明一个state来控制datepicker的显示隐藏
  const [dateVisible, setDateVisible] = useState(false)

  // 声明一个state，然后设置对应的typeList数据
  const [typeList, setTypeList] = useState([])
  useEffect(() => {
    GET_TYPELIST().then(res => {
      setTypeList(res.data.list)
    })
  }, [])

  // 声明一个state, 显示当前选择的日期
  const [currentDate, setCurrentDate] = useState(moment(new Date(+initData.date)).format('YYYY-MM-DD'))

  return (
    <div className={s['bill-form-wrap']}>
      <div className={s['header']}>
        <Radio.Group 
          type='button'
          value={formData.pay_type}
          onChange={(value) => setFormData({...formData, pay_type: value})} // 这一步是当选择类型时，设置formData上pay_type数据
        >
          <Radio value={1}>支出</Radio>
          <Radio value={2}>收入</Radio>
        </Radio.Group>

        {/* 日期 */}
        <div className="date" onClick={() => setDateVisible(true)}>
          {currentDate}
        </div>

        <DatePicker 
          columnType={['year', 'month', 'day', 'hour', 'minute']}
          visible={dateVisible} 
          onCancel={() => setDateVisible(false)} 
          onConfirm={(date) => {
          // 搞点事情
          setDateVisible(false)
          setFormData({
            ...formData,
            date: date.getTime()
          })

          // 设置currentData，让对应的显示上改变
          setCurrentDate(moment(date).format("YYYY-MM-DD"))
        }}></DatePicker>
      </div>
      {/* 类型 */}
      <TypeList initData={formData.type_id} data={typeList} type={formData.pay_type} onChange={(type) => {
        console.log(type)
        setFormData({
          ...formData,
          ...type
        })
      }}></TypeList>
      {/* 金额 */}
      <div className="price">
        <div className="unit">￥</div>
        <div className="number">{formData.amount}</div>
      </div>

      <PriceKeyboard initData={formData.amount} onClick={(value) => setFormData({...formData, amount: value})} onConfirm={() => {
        // 调用props中的函数
        onConfirm && onConfirm(formData)
      }}></PriceKeyboard>
    </div>
  );
}

export default BillForm;