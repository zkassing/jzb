import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DELETE_BILL, GET_BILLDETAIL, UPDATE_BILL } from "../../api/bill";
import s from './Detail.module.css'
import { typeMap } from "../../utils/config";
import { useState } from "react";
import moment from "moment";
import { Modal } from "zarm";
import { useNavigate } from "react-router-dom";
import BillPopup from "../../components/BillForm/BillPopup";
function Detail() {
  // 使用useParams获取到动态路由的参数
  const {id} = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({})
  const [ editVisible, setEditVisible ] = useState(false)
  useEffect(() => {
    GET_BILLDETAIL(id).then(res => {
      console.log(res)
      if (res.data) setData(res.data)
      
    })
  }, [id])
  return (
    <>
    {data.id ? (<div className={s.box}>
      <div className={s.card}>
        <div className={s.icon}>
          <div className={s['icon-wrap']}>
            <span className={`iconfont ${typeMap[data.type_id - 1]}` }></span>
          </div>
          <span className={s['icon-name']}>{data.type_name}</span>
          
        </div>

        <div className={s.price + ' ' + (data.pay_type === 1 ? s.green : s.red )}>
          ￥{data.pay_type === 1 ? '-' : '+'}{data.amount}
        </div>

        <div className={s.info}>
          <div className={s['info-item']}>
            类型：{data.pay_type === 1 ? '支出' : '收入'}
          </div>
          <div className={s['info-item']}>
            日期：{moment(new Date(+data.date)).format("YYYY-MM-DD HH:mm") }
          </div>
          <div className={s['info-item']}>
            备注：{data.remark || '无'}
          </div>
        </div>
        <div>
          <button onClick={() => {
            Modal.confirm({
              title: '警告',
              content: '删除账单后无法恢复，确认删除?',
              onCancel: () => {
                console.log('点击cancel');
              },
              onConfirm: () => {
                console.log('点击ok');
                DELETE_BILL(data.id).then(res => {
                  console.log(res)
                  // 跳转到 /bill页
                  navigate('/bill', {replace: true})
                })
              },
            });
          }}>删除</button>
          <button onClick={() => setEditVisible(true)}>编辑</button>


        </div>
      </div>
    </div>) : '该账单不存在'}
    <BillPopup visible={editVisible} initData={data} onMaskClick={() => setEditVisible(false)} onConfirm={(data) => {
      console.log(data)
      // 请求接口，进行编辑操作 编辑完成后，关闭弹窗
      UPDATE_BILL(data).then(res => {
        // setEditVisible(false)
        navigate('/bill')
      })
    }}></BillPopup>
    </> 
    
  );
}

export default Detail;