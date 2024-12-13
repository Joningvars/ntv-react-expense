export const fetchExpenses = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/expenses')
        if(!response.ok){
            throw new Error(`error: ${response.status}`)
        }
        const data = await response.json();
        return data;

    } catch(e){
        console.log(e)
        return [];
    }
  }
