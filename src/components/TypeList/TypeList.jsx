import { useState } from 'react';
import './TypeList.css'
import classNames from 'classnames'
import { typeMap } from '../../utils/config';


function TypeList({data = [], type = 1, onChange, initData}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // 根据initData（id）获取到当前的列表中对应的id的下标

  return (
    <div className="type-list">
      {data.filter((item) => item.type === type).map((item, index) => (
        <div key={item.id} onClick={() => {
            setCurrentIndex(index)
            onChange && onChange({
              type_id: item.id,
              type_name: item.name
            })          
          }} className={classNames(['type-item', {active: index === currentIndex}])}>
          {/* iconfont ${typeMap[+item.id - 1]} */}
          <span className={classNames(['iconfont', typeMap[+item.id - 1]])}></span>
          <span>{item.name}</span>
        </div>
      ))}
      
    </div>
  );
}

export default TypeList;