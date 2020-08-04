import {timestamp} from '../../../../lib/datetime'
import fetch from '../../../../lib/fetch'

import React from 'react'
import ReactDOM from 'react-dom'


class Test extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      src:null
    }
  }

  render(){
    return(
      <div>
        <div>timestamp(): {timestamp()}</div>
        <div>{'timestamp({milliseconds:true})'}: {timestamp({milliseconds:true})}</div>
        <div>{'timestamp({rounding:5})'}: {timestamp({rounding:5})}</div>
        <div>{'timestamp({milliseconds:true, rounding:5})'}: {timestamp({milliseconds:true, rounding:5})}</div>
        <br />
        <h3>FETCH</h3>
        <div>
          <button onClick={ ()=>{
            fetch('/json', {
              responseType:'json',
              success:(res)=>{
                console.log(res)
              },
            }).then((response)=>{
              console.log(response)
              return response.response
            }).then((json)=>{
              alert(JSON.stringify(json))
            })
          }}>Get Json</button>

          <button onClick={ ()=>{
            fetch('/methods', {
              method:'GET',
              success:(res)=>{
                console.log(res)
              },
            }).then((response)=>{
              console.log(response)
              return response.response
            }).then((res)=>{
              alert(res)
            })
          }}>Get method GET</button>

          <button onClick={ ()=>{
            fetch('/methods', {
              method:'POST',
              success:(res)=>{
                console.log(res)
              },
            }).then((response)=>{
              console.log(response)
              return response.response
            }).then((res)=>{
              alert(res)
            })
          }}>Get method POST</button>

          <button onClick={ ()=>{
            fetch('/methods', {
              method:'POST',
              data:{
                data:null,
                r:'1',
                r2:undefined,
              },
              success:(res)=>{
                console.log(res)
              },
            }).then((response)=>{
              console.log(response)
              return response.response
            }).then((res)=>{
              alert(res)
            })
          }}>Get POST with null params</button>

          <button onClick={ ()=>{
            fetch('/methods', {
              method:'GET',
              data:{
                data:null,
                r:'1',
                r3:'2',
                r2:undefined,
              },
              success:(res)=>{
                console.log(res)
              },
            }).then((response)=>{
              console.log(response)
              return response.response
            }).then((res)=>{
              alert(res)
            })
          }}>Get GET with null params</button>

        </div>


        <div>
          <button onClick={ ()=>{
            fetch('/error404', {
              success:(res)=>{
                console.log(res)
              },
              error:(res)=>{
                console.log(res)
              }
            }).then((response)=>{
              console.log(response)
              return response.response
            })
          }}>Get 404</button>

          <button onClick={ ()=>{
            fetch('/error500', {
              retries: 3,
              timeoutOverall: 800,
              timeoutItem: 100,
              success:(res)=>{
                console.log(res)
              },
              error:(res)=>{
                console.log(res)
              }
            }).then((response)=>{
              console.log(response)
              return response.response
            })
          }}>Get 500</button>
          <br />
          <button onClick={ ()=>{
            fetch('/static/flowers.jpg',{
              responseType:'blob',
            }).then((response) => {
              console.log(response)
              return response.response
            }).then((myBlob) => {
              var objectURL = URL.createObjectURL(myBlob);
              this.setState({src:objectURL})
              //myImage.src = objectURL;
            });
          }}>Get Image (blob)</button>

        </div>
        <img src={this.state.src} />
      </div>
    )
  }
}









ReactDOM.render(
  <Test />,
  document.getElementById('content')
);
