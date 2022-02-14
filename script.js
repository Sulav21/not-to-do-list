const taskList = []
const badList=[]
const hrPerWeek = 168 

const handleOnSubmit = (e) => {
const frmData = new FormData(e) 
const task= frmData.get("task")
const hr= +frmData.get("hr")

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

<button class="btn btn-success"><i class="fa-solid fa-arrow-right" title="Mark as bad list"></i>
</button>
</td>
</tr>

`
})

document.getElementById("task-list").innerHTML = str

}

const deleteItem = (i)=>{
  taskList.splice(i,1)
  
  display()
  totalTaskHours()
}

const totalTaskHours=()=>{
    const total = taskList.reduce((subttl,item)=>{
    return subttl + item.hr
    },0)
    console.log(total)

   document.getElementById("totalHours").innerHTML = total 

}

