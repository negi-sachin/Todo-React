
class Todo extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:'',
             list:['going home','goinf to work','play football','play vdo game','have lunch'],
             name:'User',
             en:true,
             ischecked:false,
            
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
          list:[...this.state.list,prevstate.data]
      }))
      else alert("Can't be Blank")
      e.preventDefault();

   }

   addatfirst=(e)=>{
    if(this.state.data!='')
this.setState(prevstate=>({
    data:'',
    list:[prevstate.data].concat(prevstate.list)
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
this.setState({
    ischecked:true
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
    render() {
        const bordercheck={
            border:'1px red solid'
        }
        const prime={
            color:'red'
        }
        const form={
            marginLeft:'30%'
        }
        const inputcss={
            
            borderRadius:'20px',
            border:'1px green solid',
            padding:'20px',
            height:'80px',
            minWidth:'300px',
            margin:'auto',
            marginTop:'20px',
            marginBottom:'20px',
           

         
        }
        const Taskscss={
            border:'1px blue solid',
            margin:'50px'
        }
        const removecss={

        }
        const Listcss={
            border:'2px green solid',
            margin:'20px',
            padding:'15px',
            fontSize:'20px'
        }
        const addbtncss={
            margin:'10px'
        }

        return (
            this.state.en?(
            <div className='jumbotron text-center'>
                
                <form >
                    <input  onChange={this.name}></input>
                    <button style={prime} onClick={this.en}>Submit</button>
                </form>
            </div>
        ):
        
        (<div>
            {/* <h1  className="animated infinite rubberBand delay-300s ">Hey {this.state.name}</h1> */}
        <div>
                <form>
                    <div style={{margin:'auto',width:'350px'}}>
                    <input placeholder='Put Your task here..' style={inputcss} className='text-center' value={this.state.data}onChange={this.handleinput}>
                    </input>
                    <button className="ml-3" onClick={this.state.choice?this.start:this.stop}>{this.state.choice?
                    (<i style={{fontSize:'25px'}} class="fa fa-microphone" aria-hidden="true"></i>):
                    (<i style={{fontSize:'20px'}} class='fas fa-pause aria-hidden="true"'></i>)}
              
                </button>
                </div>
                    <div>
                <p>{this.state.noteContents}</p>
            </div>
                    <div style={bordercheck} className='text-center'>
                    <button style={addbtncss} className="btn btn-primary" type='submit' onClick={this.addatend}> Add At last</button>
                    <button  style={addbtncss} className="btn btn-primary" type='submit' onClick={this.addatfirst}> Add at first</button>
                    <button  style={addbtncss}  className="btn btn-primary" type='submit' onClick={this.handlesubmit}> Add at position</button> 
                    </div>
                </form>
                <div style={Taskscss}>  
                {
                    this.state.list.map((list,index)=>
                    <div style={Listcss}>
                    <span>{index+1}. </span>
                    <span key={index} 
                    //style={(this.state.ischecked)?{textDecorationLine:'line-through'}:{textDecorationLine:'none'}}
                    >{list}</span>
                    
                    {/* <button onClick={()=>this.check(index)} >Check</button> */}
                    <button  className="btn btn-danger float-right" onClick={()=>this.remove(index)} >Remove</button>
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
