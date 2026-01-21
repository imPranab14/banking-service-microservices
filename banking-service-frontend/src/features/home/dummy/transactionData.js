const listOfTransaction={
  "success": true,
  "count": 5,
  "data": [
    {
      "transferId": "TRX-1001",
      "fromAccountId": "ACC-001",
      "toAccountId": "ACC-010",
      "amount": 1500,
      "status": "COMPLETED",
      "createdAt": "2026-01-21T10:15:30Z",
      "updatedAt": "2026-01-21T10:15:35Z"
    },
    {
      "transferId": "TRX-1002",
      "fromAccountId": "ACC-002",
      "toAccountId": "ACC-011",
      "amount": 500,
      "status": "FAILED",
      "failureReason": "INSUFFICIENT_FUNDS",
      "createdAt": "2026-01-21T10:20:10Z",
      "updatedAt": "2026-01-21T10:20:12Z"
    },
    {
      "transferId": "TRX-1003",
      "fromAccountId": "ACC-003",
      "toAccountId": "ACC-012",
      "amount": 2500,
      "status": "PENDING",
      "createdAt": "2026-01-21T10:25:45Z",
      "updatedAt": "2026-01-21T10:25:45Z"
    },
    {
      "transferId": "TRX-1004",
      "fromAccountId": "ACC-001",
      "toAccountId": "ACC-013",
      "amount": 800,
      "status": "COMPENSATED",
      "failureReason": "CREDIT_ACCOUNT_BLOCKED",
      "createdAt": "2026-01-21T10:30:05Z",
      "updatedAt": "2026-01-21T10:30:20Z"
    },
    {
      "transferId": "TRX-1005",
      "fromAccountId": "ACC-004",
      "toAccountId": "ACC-014",
      "amount": 1200,
      "status": "COMPLETED",
      "createdAt": "2026-01-21T10:35:00Z",
      "updatedAt": "2026-01-21T10:35:06Z"
    }
  ]
}
 export default listOfTransaction