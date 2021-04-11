import React from "react";
import ReactDOM from "react-dom";
import { Tooltips } from './shared/components'

ReactDOM.render(
  <div>
    LA tooltips in brod:
    <Tooltips text={'tooltiped title'} align={'bottom'}>
      <div>tooltips top</div>
    </Tooltips>
  </div>
  ,document.getElementById("root"));
