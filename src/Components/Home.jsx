import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '../firebase';

export const Home = () => {
    const [date, setDate] = useState('');
    const [standings, setStandings] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = collection(db, "team");
            const standingsData = await getDocs(query(data, orderBy('winRate',"desc")));
            const sortedStandings = standingsData.docs.map((doc) => (doc.data()));
            setStandings(sortedStandings);
        }
        getData();

        const getDate = async () => {
            const dateData = await getDoc(doc(db,'data','updateTime'));
            setDate(dateData.data());
        }
        getDate();

        onSnapshot(query(collection(db, "team"), orderBy('winRate', 'desc')), (doc) => {
            setStandings(doc.docs.map((doc) => ({ ...doc.data() })));
        })
        
    },[])

  return (
    <SDiv>
        <h1>セ・リーグ順位表</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>チーム</TableCell>
                    <TableCell align="right">勝ち</TableCell>
                    <TableCell align="right">負け</TableCell>
                    <TableCell align="right">引き分け</TableCell>
                    <TableCell align="right">勝率</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {standings.map((standings) => (
                    <TableRow
                    key={standings.team}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {standings.team}
                        </TableCell>
                        <TableCell align="right">{standings.win}</TableCell>
                        <TableCell align="right">{standings.lose}</TableCell>
                        <TableCell align="right">{standings.draw}</TableCell>
                        <TableCell align="right">{standings.winRate}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <h2>{date.time}更新</h2>
    </SDiv>
  )
}

const SDiv = styled.div`
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`