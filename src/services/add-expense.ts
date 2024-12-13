export const addExpense = async (name:string,cost:number) => {
    try {
        const response = await fetch('http://localhost:3001/api/create-expense',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name,cost})
        });

        if(!response.ok){
            throw new Error(`error: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch(e){
        console.log(`failed to add expense:`,e)
        return null;
    }
  }
