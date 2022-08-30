import React from 'react';
import {Container} from 'react-bootstrap';
import Table from "./Table"
const axios=require('axios')
//name field time link address phone exp education major
const columns=[{
    Header: 'Employment',
    columns:[{
        Header: "Name",
        accessor: "name"
    },{
        Header: "Field",
        accessor: "field"
    },{
        Header: "Phone",
        accessor: "phone"
    },{
        Header: "Time",
        accessor: "time"
    },{
        Header: "Address",
        accessor: "address"
    },{
        Header: "Website",
        accessor: "link",
        Cell: ({ row }) => {
            if(row.original.link!=='N/A')
                return <a href={row.original.link}>Site</a>
            return <p>N/A</p>
        }
    },{
        Header: "Experience",
        accessor: "exp"
    },{
        Header: "Education",
        accessor: "education"
    },{
        Header: "Major",
        accessor: "major"
    }]
}]
export default function Employment() {
    const [data, setData] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false)
    React.useEffect(() => {
        //  fetch('https://sortbydistance.herokuapp.com/employment')
        //  .then(res => res.json())
        //  .then(json => {
        //       setData(json)
        //       localStorage.setItem("employerData",JSON.stringify(json))
        //       setLoaded(true)
        //  });
        axios.get('https://us-central1-newbeginnings-7fed9.cloudfunctions.net/widgets/resources/employment').then(function(res){
            setData(res.data)
            setLoaded(true)
        })
    


        return () => console.log('unmounting...');
      }, [])
    return (
        <Container>
        <br/><br/>
           {
                //name housing phone contact address city zip county notes
                (!loaded)?"Loading data...":<Table columns={columns} data={data} />
            }
        </Container>
    )
}