//React components in this File

//Class todo having all state values   
class Todo extends React.Component {
    constructor(props) {
        super(props)
   //state contains 'data' to store task info given by user ,'list' is a array of objects storing task info,date ,ischecked true or false,
   //'name' is for storing username entered at Landing page, 'enpos' helps in conditionl rendering of 'add position' button,
   //'posval' stores position value at which new task hs to be added,'en'helps in conditionl rendering between landing page and task page,
   //'choice' helps in conditionl rendering for voice button

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
             
 //All class methos here            
//----------------------------------------------------------------------LAnding page methods start---------------------------------    
//'name' store every value user enters and set state accordingly
    name=(e)=>{
        this.setState({
            name:e.target.value
        })
        }
//Handles landing page user submit button
//shows button whenever 'this.state.en' is false      
    en=(e)=>{
        e.preventDefault();
        this.setState({
            en:false
        })
    }
//---------------------------------------------------------------------LPM over-------------------------------------------

//-----------------------------------------------------------------Task PAge methods start---------------------------------
//'handleinput' store every value user enters at task box and set state accordingly
    handleinput=(e)=>{
      this.setState({
          data:e.target.value
      })
    }
//'Addatend' adds task at last position   
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

//'Addatfirst' adds task at first position 
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

   //stores position value
pos=(e)=>{
    this.setState({posval:e.target.value})
}

switchbtn=(e)=>{
    this.setState({
        enpos:false
    })
    e.preventDefault()
}

//set task at a particular position
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
  
//'remove' remove  task from a particular position
   remove=(e)=>{
       this.setState(prevstate=>({
           list:prevstate.list.slice(0,e).concat(prevstate.list.slice(e+1,prevstate.list.length))
        }),()=>{
        console.log(this.state.list)
       })
    }
  
    //provides check/uncheck feature on task  
    check=(e)=>{
        {this.state.list[e].ischecked?this.state.list[e].ischecked=false:this.state.list[e].ischecked=true}
        this.setState({
        })
    }
  
    //Web speech feature  
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
   //stop voice reccognition(contains bugs)         
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
  //---------------------------------------TAsk PAges methods over-----------------------------------------------------
  
  //Render part is below
    render() {
               return (
               //Landing page where user enters his name
                    this.state.en?(
                    <div className='Landingname text-center'>
                        
                        <form >
                            <input type='text'value={this.state.name} onChange={this.name} placeholder="Enter your Name"></input>
                     
                            {this.state.name.length>0?
                            <button onClick={this.en}><i class=" animated shake delay-300s fa fa-angle-double-right"></i></button>
                            :''}
                        </form>
                    </div>
               //Landing Page over
               ):
               //TAsk PAge starts
               (<div>

                <h1  className="animated  bounceInRight delay-300s Name">Hey {this.state.name}</h1>
            <div>
                    <form onSubmit={this.addlast}>
                        <div style={{margin:'auto',width:'350px'}}>
                        <input type='text' placeholder='Put Your task here..'  className='taskinput text-center' value={this.state.data}onChange={this.handleinput}>
                        </input>
                        <button type='button' className="ml-2" onClick={this.state.choice?this.start:this.stop}>{this.state.choice?
                        (<i style={{fontSize:'25px'}} class="fa fa-microphone" aria-hidden="true"></i>):
                        (<i style={{fontSize:'20px'}} class='fa fa-pause aria-hidden="true"'></i>)}
                        </button>
                     </div>
                {
                        <div className='btncls text-center' >
                        <button   className="btn btn-primary" type='submit' onClick={this.addatend}> Add At last</button>
                        <button    className="btn btn-primary" type='submit' onClick={this.addatfirst}> Add at first</button>
                        {this.state.enpos?<button   className="btn btn-primary" type='submit'
                         onClick={this.switchbtn}> Add at position</button>
                         :(<span><form onSubmit={this.addpos}><input className="addinput" type='number' value={this.state.posval} onChange={this.pos}></input>
                         <button type='button' className="btn btn-primary" onClick={this.addpos}>+</button>
                         </form></span>)}
                         
                        </div>
                }        
                    </form>
                    <div className='Taskscss'>  
                    {
                        this.state.list.map((list,index)=>
                        <div className='Listcss animated heartBeat delay-300s'>
                        <div className='taskfront'>    
                        <div className='indexnum'> {index+1}. </div>
                         <div className='indexdate'> {list.Date}</div>
                        </div>
                         
                        <div  className=' taskinfo' key={index} 
                        style={(list.ischecked)?{textDecorationLine:'line-through'}:{textDecorationLine:'none'}}>
                        {list.task}</div>
                        
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

               
    