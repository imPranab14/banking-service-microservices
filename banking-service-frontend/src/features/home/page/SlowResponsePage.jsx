import React from 'react'
import {
  useQuery,
} from '@tanstack/react-query'
import { slowListOfTransaction } from '../api/home.page.api';

function SlowResponsePage() {

// Queries
const query = useQuery({ queryKey: ['allTransactionList'], queryFn: slowListOfTransaction  })

console.log("Slow_Api_Repose_Transaction",query.data);

  return (
   <>
   <h1>sdgfhsd</h1>
   </>
  )
}

export default SlowResponsePage