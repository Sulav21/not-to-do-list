const taskList = []
const badList=[]
const hrPerWeek = 168 

const total = taskList.reduce((subttl,item)=>{
   return subttl + item.hr
   },0)

const handleOnSubmit = (e) => {
   
const frmData = new FormData(e) 
const task= frmData.get("task")
const hr= +frmData.get("hr")
if(hr<1) return alert("Enter a positive value")
const ttlBadHrs =totalTimeSaved()
const total = taskList.reduce((subttl,item)=>{
   return subttl + item.hr
   },0) + hr 
   if((ttlBadHrs+total) >hrPerWeek){
      return alert("You have exceeded maximum number of hours per week")
   }
const obj = {
   task,
   hr, 
}

taskList.push(obj)
display()
totalTaskHours()

}

const display=()=>{
let str = ""
taskList.map((item,i)=>{
str += `
<tr>
<td scope="row"><input type="checkbox" name="" id="" /></td>
<td>${item.task}</td>
<td>${item.hr}hr</td>
<td class="text-end"><button class="bg-transparent" onclick="deleteItem(${i})"><i class="fa-solid fa-trash" title="Delete"></i></button>

<button class="btn btn-success" onclick="markAsNotToDo(${i})"><i class="fa-solid fa-arrow-right" title="Mark as bad list"></i>
</button>
</td>
</tr>

`

})

document.getElementById("task-list").innerHTML = str

}

const displayBadList=()=>{
   let str = ""
  badList.map((item,i)=>{
   str += `
   <tr>
   <td scope="row"><input type="checkbox" name="" id="" /></td>
   <td>${item.task}</td>
   <td>${item.hr}hr</td>
   <td class="text-end">
   <button class="btn btn-success" onclick="markAsGoodList(${i})"><i class="fa-solid fa-arrow-left" title="Mark as good list"></i>
   </button>
   <button class="bg-transparent" onclick="deleteItem1(${i})"><i class="fa-solid fa-trash" title="Delete"></i></button>
   
   
   </button>
   </td>
   </tr>
   
   `
   
   })
   
   document.getElementById("bad-list").innerHTML = str
   
   }



const deleteItem = (i)=>{
   if(!confirm("Are you sure you want to delete the item ?")){
     return
   }
  taskList.splice(i,1)
  display()
  totalTaskHours()
}

const deleteItem1 = (i)=>{
   if(!confirm("Are you sure you want to delete the item ?")){
     return
   }
  badList.splice(i,1)
  displayBadList()
  totalTimeSaved()
  totalTaskHours()
}

const totalTaskHours=()=>{
    const total = taskList.reduce((subttl,item)=>{
    return subttl + item.hr
    },0)
    const ttlBadHrs =totalTimeSaved()

    const totalHours = total + ttlBadHrs
  

   document.getElementById("totalHours").innerHTML = totalHours

}

const totalTimeSaved=()=>{
   const ttlBadHrs =badList.reduce((subttl,item)=>subttl+item.hr,0)


  document.getElementById("totalhourssaved").innerHTML = ttlBadHrs
  return ttlBadHrs

}


const markAsNotToDo = i =>{
   const itm = taskList.splice(i,1)
   display()
   badList.push(itm[0])
   displayBadList()
   totalTimeSaved()

}

const markAsGoodList = i =>{
const itm1 = badList.splice(i,1)
displayBadList()
taskList.push(itm1[0])
display()
totalTimeSaved()
}
