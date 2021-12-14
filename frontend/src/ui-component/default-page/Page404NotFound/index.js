import React from 'react'

import classes from './index.module.css';

const Page404NotFound = () => {
    return (
        <div className={classes["error-page"]}>
        <div className={classes.content}>
           <h2 className={classes["header"]} data-text="404">
              404
           </h2>
           <h4 data-text="Không tìm thấy trang">
              Không tìm thấy trang
           </h4>
           <p>
              Thành thật xin lỗi! Tính năng này đang trong thời gian phát triển. Bạn vui lòng trở lại sau nhé!
           </p>
           <div className={classes["btns"]}>
              <a href="/merits">Về trang tiêu chí</a>
           </div>
        </div>
     </div>
    )
}

export default Page404NotFound;
