import { useState } from "react";
import "./Bill.css"
import { Popup, Radio, DatePicker, Keyboard } from 'zarm'
import moment from 'moment'
import { ADD_BILL, GET_BILL, GET_TYPELIST } from "../../api/bill";
import { useEffect } from "react";
import TypeList from "../../components/TypeList/TypeList";
import { typeMap } from "../../utils/config";
import s from './Bill.module.scss'
import { useNavigate } from "react-router-dom";
import BillPopup from "../../components/BillForm/BillPopup";
console.log(s)
function Empty () {
  return (
    <div className="empty">暂无账单</div>
  )
}

function BillItem ({item}) {
  const navigate = useNavigate()
  // 获取今天的支出和收入的总额
  const _expense = item.bills.filter(bill => bill.pay_type === 1).reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)
  const _income = item.bills.filter(bill => bill.pay_type === 2).reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)

  return (
    <div className="item">
      <div className="item-header">
        <div className="item-date">{item.date}</div>
        <div className="item-price">
          <div className="price-item">
            <div className="icon">支</div>
            <div className="num">￥{_expense}</div>
          </div>
          <div className="price-item">
            <div className="icon">收</div>
            <div className="num">￥{_income}</div>
          </div>
        </div>
      </div>
      <div className="item-body">
        {item.bills.map(bill => (
          <div onClick={() => {
            navigate('/detail/' + bill.id)
          }} className="bill" key={bill.id}>
            <div className="bill-item">
              <div className="bill-type"><span className={`iconfont ${typeMap[bill.type_id - 1]}`}></span>{bill.type_name}</div>
              <div className={bill.pay_type === 1 ? 'num green' : 'num red'}>{bill.pay_type === 1 ? '-' : '+'}{bill.amount.toFixed(2)}</div>
            </div>
            <div className="bill-date">{moment(new Date(+bill.date)).format('HH:mm')}</div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

// 对虚拟键盘封装，实现一个效果
/* 
  onClick事件，可以获取到对应的最新的值
*/

function PriceKeyboard ({onClick, onConfirm}) {
  const [value, setValue] = useState('0')

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


/* 
  moment(日期).format("YYYY/MM/DD") 2024/3/11
  moment(日期).format("YYYY-MM-DD") 2024-3-11
*/

function Bill() {
  const [ totalExpense, setTotalExpense] = useState(0)
  const [ totalIncome, setTotalIncome] = useState(0)

  const [ list, setList ] = useState([])

  const [ params, setParams ] = useState({
    date: moment(Date.now()).format('YYYY-MM'), // 月份
    page: 1, // 分页
    page_size: 5, // 分页大小默认 5
  })

  let [refresh, setRefresh] = useState(0)

  useEffect(() => {
    // 获取到相关参数
    GET_BILL(params).then(res => {
     
      setList(res.data.list)
      setTotalExpense(res.data.totalExpense)
      setTotalIncome(res.data.totalIncome)
    })

  }, [params, refresh])


  const [ data, setData ] = useState({
    amount: 0, // 订单金额
    type_id: 0, // 消费类型id
    type_name: '', // 消费类型名称
    date: Date.now(),// 消费时间
    pay_type: 1, // 账单类型 1:支出 2:收入
    remark: '', // 备注
  })


  const [ addVisible, setAddVisible ] = useState(false)
  const [ dateVisible, setDateVisible ] = useState(false)
  
  const [ currentDate, setCurrentDate ] = useState(moment().format('YYYY/MM/DD'))

  const confirmHandler = () => {
    ADD_BILL(data).then(res => {
      console.log(res)
      // 把弹出框关闭
      setAddVisible(false)
      setRefresh(refresh + 1)
    })
  }

  // 筛选日期的功能
  const [ filterDateVisible, setFilterDateVisible ] = useState(false)

  // TypeList数据
  const [typeList, setTypeList] = useState([])

  return (
    <>
      <div className="box">
        <div className="total">
          <div className="total-header">
            <div className="expense"><span>总支出：</span>￥{totalExpense.toFixed(2)}</div>
            <div className="income"><span>总收入：</span>￥{totalIncome.toFixed(2)}</div>
          </div>
          <div className="filter">
            <div className="date-filter" onClick={() => setFilterDateVisible(true)}>{params.date}</div>
          </div>

          {/* 筛选日期的日期选择器 */}
          <DatePicker 
            value={new Date(params.date)}
            columnType={['year', 'month']}
            visible={filterDateVisible}
            onConfirm={(date) => {
              // 把date设置给params.date
              setParams({
                ...params,
                date: moment(date).format("YYYY-MM")
              })

              setFilterDateVisible(false)
            }}

            onCancel={() => {
              setFilterDateVisible(false)
            }}
          ></DatePicker>
        </div>

        <div className="list">
          {list.length ? list.map(item => (
            <BillItem key={item.date } item={item}></BillItem>
          )) : <Empty></Empty>}
        </div>

        <div className="add" onClick={() => {
          setAddVisible(true)
          /* // 请求数据
          GET_TYPELIST().then(res => {
            console.log(res)
            setTypeList(res.data.list)
          }) */
        }}>
          <span className="iconfont icon-tianjia"></span>
        </div>
      </div>
      <BillPopup visible={addVisible} onMaskClick={() => setAddVisible(false)} onConfirm={(data) => {
        // 调用新增接口
        ADD_BILL(data).then(res => {
          // 成功关闭弹窗
          setAddVisible(false)
          setRefresh(refresh + 1)
        })
      }}></BillPopup>
    </>
    
  );
}

export default Bill;