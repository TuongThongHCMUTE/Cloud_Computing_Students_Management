import React from 'react'

import classes from './index.module.css';

const Page404NotFound = () => {
    return (
        <div className={classes["error-page"]}>
        <div className={classes.content}>
           <h2 className={classes["header"]} data-text="Data Not Found">
              Data Not Found
           </h2>
           <h4 data-text="Không có dữ liệu để hiển thị">
              Không có dữ liệu để hiển thị
           </h4>
           <div className={classes["btns"]}>
              <a href="/merits">Về trang tiêu chí</a>
           </div>
        </div>
     </div>
    )
}

export default Page404NotFound;
