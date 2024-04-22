import React, { useEffect, useState } from 'react'
import { AdminTable } from './AdminTable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const Admin = () => {
    const [auth, setAuth] = useState(false);
    const [pass, setPass] = useState('');
    const [correctPass, setCorrectPass] = useState('');

    useEffect(() => {
      const getAdmin = async () => {
        const docRef = doc(db,"data","user");
        const docSnap = await getDoc(docRef);
        const passData = docSnap.data();
        setCorrectPass(passData.pass);
      }
      getAdmin();
    },[])

    const checkPass = () => {
      if(pass === correctPass){
        setAuth(true);
        setPass('')
      }
    }
  return (
    <SDiv>
        {auth ? <AdminTable /> : <><TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={pass}
          onChange={(e) => {setPass(e.target.value)}}
        /> <Button variant="contained" onClick={checkPass}>Enter</Button></> }
    </SDiv>
  )
}

const SDiv = styled.div`
    width: 75%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`