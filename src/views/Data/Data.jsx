import { useEffect } from "react";
import { GET_BILLDATA } from "../../api/bill";
import { useState, useRef } from "react";
import { Progress } from "zarm";
import './Data.css'
import { Radio } from "zarm";
import { DatePicker } from "zarm";
import moment from "moment";

import Pie from "../../components/Pie/Pie";

function filterData(arr, type, total) {
  // return arr.filter(item => item.pay_type === type)
  /* const newArr = []
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].pay_type === type) {
      newArr.push({
        ...arr[i],
        percent: (arr[i].number / total * 100).toFixed(2)
      })
    }
  }
  return newArr   */

  // 先filter
  const filterArr = arr.filter(item => item.pay_type === type)
  filterArr.sort((a, b) => b.number - a.number )
  // 再map生成新的数组中，包含percent
  return filterArr.map(item => ({
    ...item,
    percent: (item.number / total * 100).toFixed(2)
  }))
}

function Data() {
  // 总支出
  const [totalExpense, setTotalExpense] = useState(0)
  // 总收入
  const [totalIncome, setTotalIncome] = useState(0)

  // 支出的分类列表
  const [expenseList, setExpenseList] = useState([])
  // 收入的分类列表
  const [incomeList, setIncomeList] = useState([])

  // 支出和收入的类型
  const [payType, setPaytype] = useState(1)
  const [date, setDate] = useState('2024-03')

  const [datePickerVisible, setDatePickerVisible] = useState(false)

  useEffect(() => {
    GET_BILLDATA(date).then(res => {
      const data = res.data
      // 把res.data.total_expense设置总支出
      setTotalExpense(data.total_expense)
      setTotalIncome(data.total_income)

      /* function filterData(arr, type) {
        return arr.filter(item => item.pay_type === type)
      } */
      // data.total_data.filter(item => item.pay_type === 1)
      const _expenseList = filterData(data.total_data, 1, data.total_expense)

      setExpenseList(_expenseList)
      setIncomeList(filterData(data.total_data, 2, data.total_income))
      /* setData(data.total_data)
      setList(filterData(data.total_data, payType)) */
      /* if (chartRef.current) {
        setTimeout(() => {setChartData(_expenseList)}, 0)
      } */
    })
  }, [date])


  return (


    <>
      <div className="data-box">
        <div className="data-header">
          {/* 日期选择器 年月 */}
          <div className="date" onClick={() => setDatePickerVisible(true)}>
            <span>{date}</span>
            <span className="iconfont icon-rili"></span>
          </div>
          {/* 总支出 */}
          <div className="total-expense">{totalExpense}元</div>
          {/* 总收入 */}
          <div className="total-income">{totalIncome}元</div>

        </div>
        {
          !incomeList.length && !expenseList.length ? <>暂无账单</> : (
            <>
              <div className="list-header">
                账单详情

                <Radio.Group type="button" value={payType} onChange={(value) => {
                  setPaytype(value)
                  
                }}>
                  <Radio value={1}>支出</Radio>
                  <Radio value={2}>收入</Radio>
                </Radio.Group>
              </div>
              <PayTypeList list={payType === 1 ? expenseList : incomeList}></PayTypeList>
              {/* 饼图 */}
              <div style={{ height: '300px' }}>
                <Pie data={(payType === 1 ? expenseList : incomeList).map(item => ({name: item.type_name, value: item.number}))} title="账单详情图"></Pie>
              </div>
            </>
          )

        }

      </div>

      <DatePicker value={new Date(date)} onCancel={() => setDatePickerVisible(false)} visible={datePickerVisible} columnType={['year', 'month']} onConfirm={(_date) => {
        setDate(moment(_date.getTime()).format('YYYY-MM'))
        setDatePickerVisible(false)
      }}></DatePicker>
    </>
  );
}

function PayTypeList({ list }) {
  if (!list.length) {
    return <div className="list">暂无账单数据</div>
  }

  return (
    <div className="list">
      {list.map((item, index) => (
        <div key={index} className="item">
          <div className="type-name">{item.type_name}</div>

          <Progress percent={item.percent}></Progress>
          <div className="price">{item.number}元</div>
        </div>
      ))}
    </div>
  )
}

export default Data;