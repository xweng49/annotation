import React from "react"
import MainLayout from "../MainLayout"



export const Annotator = ({
    taskDescription = "",
    images=[
        {
          "src": "https://images.unsplash.com/photo-1496905583330-eb54c7e5915a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
          "name": "hot-dogs-1"
        },
        {
          "src": "https://www.bianchi.com/wp-content/uploads/2019/07/YPB17I555K.jpg",
          "name": "bianchi-oltre-xr4"
        }
      ],
      name,
}) => {
    return (
        <MainLayout 
            image = {images}
            taskDescription={taskDescription}
            name={name}
        />

    )
}

export default Annotator