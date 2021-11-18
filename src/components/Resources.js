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
        }]
}]
export default function Resources(props) {
    console.log(props.logged)
    //localStorage.clear()
    const [data, setData] = React.useState([]);
    const [houseStyle, setHouseStyle] = React.useState("primary")
    const [clothingStyle, setClothingStyle] = React.useState("default")
    const [foodStyle, setFoodStyle] = React.useState("default")
    const [houseLoading, setHouse] = React.useState(true)
    const [clothLoading, setCloth] = React.useState(true)
    const [foodLoading, setFood] = React.useState(true)
    const [tableCols, setTableCols] = React.useState(houseColumns)
    React.useEffect(() => {
            fetch('http://204.48.17.151:8000/resources/housing')
            .then(res => res.json())
            .then(json => {
                setData(json)
                houseData=json
                setHouse(false)
            }, error=>{
                console.log(error)
            });
            fetch('http://204.48.17.151:8000/resources/food')
            .then(res => res.json())
            .then(json => {
                setFood(false)
                foodData=json
            }, error=>{
                console.log(error)
            });
            fetch('http://204.48.17.151:8000/resources/clothing')
            .then(res => res.json())
            .then(json => {
                setCloth(false)
                clothingData=json
            }, error=>{
                console.log(error)
            });
        return () => console.log('unmounting...');
      }, [])
    return (
        <Container>
            <div style={{ display: "flex" }}>
        <Button onClick={() => { setTableCols(houseColumns); setData(houseData); setHouseStyle("primary"); setFoodStyle("default"); setClothingStyle("default");}} variant="contained" color={houseStyle}>
          Housing
        </Button>
        <Button onClick={() => { setTableCols(foodColumns); setData(foodData); setFoodStyle("primary"); setClothingStyle("default"); setHouseStyle("default");}} variant="contained" color={foodStyle}>
          Food
        </Button>
        <Button onClick={() => { setTableCols(clothingColumns); setData(clothingData); setClothingStyle("primary"); setFoodStyle("default"); setHouseStyle("default");}} variant="contained" color={clothingStyle}>
          Clothing
        </Button>
        </div>
        <br/><br/>
           {
                (houseLoading&&clothLoading&&foodLoading)?"Loading data...":<Table columns={tableCols} data={data} />
            }
        </Container>
    )
}