import React from 'react';
import Table from "./Table"
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
const fetch = require('node-fetch');
let houseData=[], foodData=[], clothingData=[]

const houseColumns=[{
        Header: 'Housing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "housing"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "Other Contact",
            accessor: "contact"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

const foodColumns=[{
        Header: 'Food',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes",
            width: 2000
        },{
            Header: "Site",
            accessor: "site",
            Cell: ({ row }) => {
                if(row.original.site!=='N/A')
                    return <a href={row.original.site}>Site</a>
                return <p>N/A</p>
            }
        },{
            Header: "Timing",
            accessor: "timing"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

const clothingColumns=[{
        Header: 'Clothing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Site",
            accessor: "site",
            Cell: ({ row }) => {
                if(row.original.site!=='N/A')
                    return <a href={row.original.site}>Site</a>
                return <p>N/A</p>
            }
        },{
            Header: "Timing",
            accessor: "timing"
        },{
            Header: "Notes",
            accessor: "other"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

export default function Resources() {
    //localStorage.clear()
    const [data, setData] = React.useState([]);
    const [houseLoading, setHouse] = React.useState(true)
    const [clothLoading, setCloth] = React.useState(true)
    const [foodLoading, setFood] = React.useState(true)
    const [tableCols, setTableCols] = React.useState(houseColumns)
    React.useEffect(() => {
        if(localStorage.getItem("houseData")==null){
            console.log("Housing was null")
            fetch('https://sortbydistance.herokuapp.com/housing')
            .then(res => res.json())
            .then(json => {
                setData(json)
                localStorage.setItem("houseData",JSON.stringify(json))
                houseData=json
                setHouse(false)
                console.log("had to scrape", JSON.parse(localStorage.getItem("houseData")))
            });
        } else{
            houseData=JSON.parse(localStorage.getItem("houseData"))
            console.log("saw it locally", houseData)
            setData(houseData)
            setHouse(false)
        }
        if(localStorage.getItem("clothingData")==null){
            fetch('https://sortbydistance.herokuapp.com/clothing')
            .then(res => res.json())
            .then(json => {
                localStorage.setItem("clothingData",JSON.stringify(json))
                clothingData=json
                setCloth(false)
            });
        } else{
            console.log("found cloth")
            clothingData=JSON.parse(localStorage.getItem("clothingData"))
            setCloth(false)
        }
        if(localStorage.getItem("foodData")==null){
            fetch('https://sortbydistance.herokuapp.com/food')
            .then(res => res.json())
            .then(json => {
                localStorage.setItem("foodData",JSON.stringify(json))
                foodData=json
                setFood(false)
            });
        }
        else{
            console.log("found food")
            foodData=JSON.parse(localStorage.getItem("foodData"))
            setFood(false)
        }
        return () => console.log('unmounting...');
      }, [])
    return (
        <Container>
        <Button onClick={() => { setTableCols(houseColumns); setData(houseData); }} variant="contained" color="primary">
          Housing
        </Button>
        <Button onClick={() => { setTableCols(foodColumns); setData(foodData);}} variant="contained" color="primary">
          Food
        </Button>
        <Button onClick={() => { setTableCols(clothingColumns); setData(clothingData);}} variant="contained" color="primary">
          Clothing
        </Button>
        <br/><br/>
           {
                //name housing phone contact address city zip county notes
                (houseLoading&&foodLoading&&clothLoading)?"Loading data...":<Table columns={tableCols} data={data} />
            }
        </Container>
    )
}