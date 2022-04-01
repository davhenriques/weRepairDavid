import React, {useState} from 'react'

export default function ListRequests({requests}) {

  const fillTable = requests.map((data, index)=>{
        // if(index < this.props.dataFromParent ||this.props.dataFromParent == undefined)
          return(
              <div className="data-row requestrow requestli" key={index}>

              <div className="requestli-col requestli-col-1 text-center">{data.name}</div>
              <div className="requestli-col requestli-col-2 text-center">{data.laptop}</div>
              <div className="requestli-col requestli-col-3 text-center">{data.issue}</div>
              <div className="requestli-col requestli-col-4 text-center">{data.serialnumber}</div>
              <div className="requestli-col requestli-col-5 text-center">{data.date}</div>
              <div className="requestli-col requestli-col-6 text-center">{data.notes}</div>
              <div className="requestli-col requestli-col-7 text-center"><a href={data.picture} download={data.serialnumber+".png"} target="_blank">{data.laptop}_{data.serialnumber}</a></div>
            </div>
            )
    });

  return (
  <div class="requestsTable">
    <div className="requestrow requestli requestli-head">
      <div className="requestli-col requestli-col-1 text-center">Name</div>
      <div className="requestli-col requestli-col-2 text-center">Laptop</div>
      <div className="requestli-col requestli-col-3 text-center">Issue</div>
      <div className="requestli-col requestli-col-4 text-center">Serial Numbver</div>
      <div className="requestli-col requestli-col-5 text-center">Date</div>
      <div className="requestli-col requestli-col-6 text-center">Notes</div>
      <div className="requestli-col requestli-col-7 text-center">picture</div>
    </div>
    {fillTable}

  </div>
  )

}
