
class Todo extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:'',
             list:[
                 {
                 task:'Remove this Task And add yours',
             Date:new Date().toString().slice(15,25),
             ischecked:false
             },
             ],
             name:'',
           
             enpos:true,
             posval:'',
            en:true,
             choice:true,
             
        }
        this.addatfirst=this.addatfirst.bind(this)
    }

    name=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
     
    en=(e)=>{
        e.preventDefault();
        this.setState({
            en:false
        })
    }


handleinput=(e)=>{
      this.setState({
          data:e.target.value
      })
    }
   addatend=(e)=>{
      if(this.state.data!='')
      this.setState(prevstate=>({
          data:'',
          enpos:true,
          list:[...this.state.list,{task:prevstate.data,Date:new Date().toString().slice(15,25),ischecked:false}]
      }))
      else alert("Can't be Blank")
      e.preventDefault();

   }

   addatfirst=(e)=>{
    if(this.state.data!='')
this.setState(prevstate=>({
    data:'',
    enpos:true,
    list:[{task:prevstate.data,Date:new Date().toString().slice(15,25),ischecked:false}].concat(prevstate.list)
}))
else alert("Can't be Blank")
e.preventDefault();
   }

   remove=(e)=>{
       this.setState(prevstate=>({
           list:prevstate.list.slice(0,e).concat(prevstate.list.slice(e+1,prevstate.list.length))
       }),()=>{
        console.log(this.state.list)
       })
   
       
   }

   check=(e)=>{
      
      {this.state.list[e].ischecked?this.state.list[e].ischecked=false:this.state.list[e].ischecked=true}
    // this.state.list[e].ischecked=true
    this.setState({
      
    })


   }

   start=(e)=>{
    e.preventDefault();
  this.setState({
      choice:false
  })

    try {
       var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
       var recognition = new SpeechRecognition();
       recognition.continuous = true;
       var noteContent=''
    
     }
     catch(e) {
       console.error(e);
       
     }
     
recognition.onresult = function(event) {

 var current = event.resultIndex;

 var transcript = event.results[current][0].transcript;



noteContent =noteContent.concat(' ',transcript);
console.log(noteContent);
this.setState({
  
   data:noteContent

})
}.bind(this)

recognition.onstart = function() { 
 console.log('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
 console.log('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
 if(event.error == 'no-speech') {
   console.log('No speech was detected. Try again.');  
 };

}

recognition.start();


   }
stop=(e)=>{
   e.preventDefault();
   console.log('stopped called')
   this.setState({
       choice:true
   })

     try {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
       recognition.stop();
     
      }
      catch(e) {
        console.error(e);
        
      }
}
pos=(e)=>{
    this.setState({posval:e.target.value})
}
switchbtn=(e)=>{
    this.setState({
        enpos:false
    })
    e.preventDefault()
}
addpos=(e)=>{
    e.preventDefault();
    let posval=this.state.posval
  if(posval!=''&&posval<=this.state.list.length+1&&posval>0&&this.state.data!='')
this.setState(prevstate=>({
    data:'',
    posval:'',
    enpos:true,
    list:(prevstate.list.slice(0,prevstate.posval-1)||{}).concat({task:prevstate.data,Date:new Date().toString().slice(15,25),ischecked:false},prevstate.list.slice(prevstate.posval-1,prevstate.list.length+1))
}))
else {posval==''?(this.state.data==''?alert("Task box can't be empty"):alert("Position value can't be empty")):
(this.state.data==''?alert("Task box can't be empty"):alert(`Number should be between 1 and ${this.state.list.length+1}`))}
}
    render() {
      
        
        const form={
            marginLeft:'30%'
        }
        
       
       
        const addbtncss={
            margin:'3px',
            
        }

        return (
            this.state.en?(
            <div className='Landingname text-center'>
                
                <form >
                    <input type='text'value={this.state.name} onChange={this.name} placeholder="Enter your Name"></input>
             
                    {this.state.name.length>0?
                    <button onClick={this.en}><i class=" animated shake delay-300s fa fa-angle-double-right"></i></button>
                    :''}
                </form>
            </div>
        ):
        
        (<div>
            <h1  className="animated  bounceInRight delay-300s Name">Hey {this.state.name}</h1>
        <div>
                <form onSubmit={this.addlast}>
                    <div style={{margin:'auto',width:'350px'}}>
                    <input type='text' placeholder='Put Your task here..'  className='taskinput text-center' value={this.state.data}onChange={this.handleinput}>
                    </input>
                    <button type='button' className="ml-3" onClick={this.state.choice?this.start:this.stop}>{this.state.choice?
                    (<i style={{fontSize:'25px'}} class="fa fa-microphone" aria-hidden="true"></i>):
                    (<i style={{fontSize:'20px'}} class='fa fa-pause aria-hidden="true"'></i>)}
              
                </button>
                </div>
                    <div>
                
            </div>
            {
                this.state.data.length>0
                ?
                    <div className='text-center' >
                    <button  style={addbtncss} className="btn btn-primary" type='submit' onClick={this.addatend}> Add At last</button>
                    <button   style={addbtncss} className="btn btn-primary" type='submit' onClick={this.addatfirst}> Add at first</button>
                    {this.state.enpos?<button  style={addbtncss}  className="btn btn-primary" type='submit'
                     onClick={this.switchbtn}> Add at position</button>
                     :(<span><form onSubmit={this.addpos}><input className="addinput" type='number' value={this.state.posval} onChange={this.pos}></input>
                     <button type='button' className="btn btn-primary" onClick={this.addpos}>+</button>
                     </form></span>)}
                     
                    </div>
                :''
            }        
                </form>
                <div className='Taskscss'>  
                {
                    this.state.list.map((list,index)=>
                    <div className='Listcss'>
                    <div className='taskfront'>    
                    <div className='indexnum'> {index+1}. </div>
                     <div className='indexdate'> {list.Date}</div>
                    </div>
                    <div className='taskinfo' key={index} 
                    style={(list.ischecked)?{textDecorationLine:'line-through'}:{textDecorationLine:'none'}}
                    >{list.task}</div>
                    
                    <div className="rembtn">
                    <button className="btn btn-warning " onClick={()=>this.check(index)} >{list.ischecked?<i style={{fontSize:'20px'}} 
                    class="fa fa-times-circle" aria-hidden="true"></i>:<i style={{fontSize:'20px'}} 
                    class="fa fa-check" aria-hidden="true"></i>}</button>

                    <button  className="btn btn-danger " onClick={()=>this.remove(index)} ><i style={{fontSize:'20px'}} class="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                    </div>
                    )
                }
                 </div>
            </div>
        </div>)

        )
    }
}


ReactDOM.render(<Todo/>,document.getElementById('root'))
