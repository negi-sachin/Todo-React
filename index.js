class Todo extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:'',
             list:['going home','goinf to work','play football','play vdo game','have lunch'],
             name:'User',
             en:true,
             ischecked:false
        }
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
   handlesubmit=(e)=>{
      
      this.setState(prevstate=>({
          data:'',
          list:[...this.state.list,prevstate.data]
      }))
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
    render() {
        const prime={
            color:'red'
        }
        const form={
            marginLeft:'30%'
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
        
        (<div>Hey {this.state.name}
        <div>
                <form>
                    <input value={this.state.data}onChange={this.handleinput}>

                    </input>
                    <button type='submit' onClick={this.handlesubmit}> submit</button>

                </form>
                {
                    this.state.list.map((list,index)=>
                    <div style={{border:'2px green solid',margin:'10'}}>
                    <span>{index+1}. </span>
                    <span key={index} 
                    //style={(this.state.ischecked)?{textDecorationLine:'line-through'}:{textDecorationLine:'none'}}
                    >{list}</span>
                    
                    {/* <button onClick={()=>this.check(index)} >Check</button> */}
                    <button onClick={()=>this.remove(index)} >Remove</button>
                    </div>
                    )
                }
            </div>
        </div>)

        )
    }
}


ReactDOM.render(<Todo/>,document.getElementById('root'))
