interface props{
    setUserSearch:React.Dispatch<React.SetStateAction<string>>
}

export const SearchUsers = ({setUserSearch}:props) =>{
    return(
        <input type="text" 
            className="border "
            onChange={(e) => {
                const value = e.target.value.trim()
                if (value.length > 2) {
                    setUserSearch(value)
                } else {
                    setUserSearch("")
                }
            }}/>
    )
}