export const deleteExpense = async (id:string) =>{
    try {
        const response = await fetch(`http://localhost:3001/api/expense/${id}`,{method: 'DELETE'})
        if(!response.ok){
            throw new Error(`error: ${response.status}`)
        }
        return true
    } catch(e){
        console.log(e)
        return null;
    }
}