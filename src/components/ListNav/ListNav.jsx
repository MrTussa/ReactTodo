// import s from "./ListNav.module.css";
// import { useState } from 'react';
// export default function ListNav({ data, onClickList, onClickListItem,  }) {
//   return (
//     <>
//       <div className={s.listNav}>
//       <div
//         className="ListNavigation-ellipsis"
//         onClick={handleListNav}
//       >
//         <div className="ListNavigation-ellipsis--default">
//           <img src="./Three\dots.svg"/>
//         </div>
//       </div>
//       <ul className="ListNavigation-items">
        
//       </ul>
//       </div>
//     </>
//   );
// }

import s from "./ListNav.module.css";
import clsx from "clsx"
export default function ListNav({
  array,
  open,
  onClick,
  onClickItem,
  dref,
  selected,
  filter
}) {
  return (
    <div className={s.listContainer}>
      <div ref={dref}>
        {/* <Button onClick={onClick}>{selected}</Button> */}
        <button onClick={onClick} className={clsx(s.button)}>
			{selected}
		</button>
        {open && (
          <ul className={s.items}>
            {array.map((item) => {
              return (
                <li
                  onClick={() => {
                    onClickItem(item.id);
                  }}
                  key={item.id}
                  className={clsx(s.item, {[s.itemChecked]: item.checked === true})}
                >
                  {item.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};