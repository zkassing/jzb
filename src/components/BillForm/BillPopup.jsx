import { Popup } from "zarm";
import BillForm from "./BillForm";

function BillPopup({visible, onMaskClick, onConfirm, initData = {
  amount: 0, // 订单金额
  type_id: 0, // 消费类型id
  type_name: '', // 消费类型名称
  date: Date.now(),// 消费时间
  pay_type: 1, // 账单类型 1:支出 2:收入
  remark: '', // 备注
}}) {
  return (
    <Popup visible={visible} onMaskClick={() => onMaskClick && onMaskClick()}>
      <BillForm 
        onConfirm={(data) => {
          onConfirm && onConfirm(data)
        }}
        initData={initData}
      ></BillForm>
    </Popup>
  );
}

export default BillPopup;