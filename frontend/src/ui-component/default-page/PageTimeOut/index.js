import React from 'react'

import classes from './index.module.css';

const Page404NotFound = () => {
    return (
        <div className={classes["error-page"]}>
        <div className={classes.content}>
           <h2 className={classes["header"]} data-text="Time Out!">
              Time Out!
           </h2>
           <h4 data-text="Hiện tại không nằm trong thời gian nộp hồ sơ">
              Hiện tại không nằm trong thời gian nộp hồ sơ
           </h4>
           <div className={classes["btns"]}>
              <a href="/merits">Về trang tiêu chí</a>
           </div>
        </div>
     </div>
    )
}

export default Page404NotFound;
