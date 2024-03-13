export default function add({size=30,...props}){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 48 48" {...props}><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
    )
    }