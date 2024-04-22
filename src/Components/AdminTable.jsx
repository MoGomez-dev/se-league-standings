import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Button } from '@mui/material';

export const AdminTable = () => {
  const [standings, setStandings] = useState([]);
  useEffect(() => {
    const getData = async () => {
        const data = collection(db, "team");
        const standingsData = await getDocs(query(data, orderBy('winRate',"desc")));
        const sortedStandings = standingsData.docs.map((doc) => (doc.data()));
        setStandings(sortedStandings);
    }
    getData();

    onSnapshot(query(collection(db, "team"), orderBy('winRate', 'desc')), (doc) => {
        setStandings(doc.docs.map((doc) => ({ ...doc.data() })));
    })
},[])

  const sortStandings = (arr) => {
    arr.sort((a,b) => {
      if(a.winRate > b.winRate) return -1
      if(a.winRate < b.winRate) return 1
      if(a.winRate == b.winRate){
        if(a.win > b.win) return -1
        if(a.win < b.win) return 1
      }
      return 0
    })
  }

  const updateDatabase = async (team) => {
    await updateDoc(doc(db,"team",team.team),{
      win: team.win,
      lose: team.lose,
      draw: team.draw,
      winRate: team.winRate,
    })
  }

  const enterStandings = async () => {
    standings.map((team)=> {
      updateDatabase(team);
    })
    const now = new Date();
    const time = `${now.getMonth()}月${now.getDate()}日${now.getHours()}時${now.getMinutes()}分`;
    await setDoc(doc(db,"data",'updateTime'),{
      time: time,
    });
    alert('completed');
  }

  const onChangeWin = (e,index) => {
    let newArr = [...standings];
    newArr[index].win = e.target.value;
    newArr[index].winRate =  Math.round((Number(e.target.value) / (Number(e.target.value) + Number(newArr[index].lose))) * 1000) / 1000;
    sortStandings(newArr);
    setStandings(newArr);
  } 

  const onChangeLose = (e,index) => {
    let newArr = [...standings];
    newArr[index].lose = e.target.value;
    newArr[index].winRate =  Math.round((Number(newArr[index].win) / (Number(newArr[index].win) + Number(e.target.value))) * 1000) / 1000;
    sortStandings(newArr);
    setStandings(newArr);
  } 

  const onChangeDraw = (e,index) => {
    let newArr = [...standings];
    newArr[index].draw = e.target.value;
    setStandings(newArr);
  } 

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>順位</TableCell>
              <TableCell>チーム</TableCell>
              <TableCell align="right">勝ち</TableCell>
              <TableCell align="right">負け</TableCell>
              <TableCell align="right">引き分け</TableCell>
              <TableCell align="right">勝率</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map((standings, index) => (
              <TableRow
                key={standings.team}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {standings.team}
              </TableCell>
              <TableCell align="right"><input type='number' value={standings.win} onChange={(e) => onChangeWin(e,index)}></input></TableCell>
              <TableCell align="right"><input type='number' value={standings.lose} onChange={(e) => onChangeLose(e,index)}></input></TableCell>
              <TableCell align="right"><input type='number' value={standings.draw} onChange={(e) => onChangeDraw(e,index)}></input></TableCell>
               <TableCell align="right">{standings.winRate}</TableCell>
              <TableCell align="right">{standings.difference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={enterStandings}>Enter</Button>
    </div>
  )
}
